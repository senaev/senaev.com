#!/usr/bin/env bash
set -euo pipefail

if ! command -v jq &>/dev/null; then
  echo "👉 Installing jq"
  sudo apt-get update && sudo apt-get install -y jq
  echo "✅ jq installed"
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
set -a; source "$SCRIPT_DIR/.env"; set +a

cd $K3S_CLUSTER_PATH

POD="$VAULT_NS-0"

vault_exec() {
  kubectl exec -n "$VAULT_NS" "$POD" -- vault "$@"
}

status_json() {
  vault_exec status -format=json 2>/dev/null || true
}

echo "👉 Checking vault status"
MAX_ATTEMPTS=100
STATUS_JSON=""
for i in $(seq 1 "$MAX_ATTEMPTS"); do
  STATUS_JSON="$(status_json)"
  if [[ -n "$STATUS_JSON" ]]; then
    echo "✅ Vault is responding."
    break
  fi
  echo "   ⏳ Pending: waiting for Vault to start ($i/$MAX_ATTEMPTS)"
  if [[ "$i" -eq "$MAX_ATTEMPTS" ]]; then
    echo "❌ Vault did not respond in time. Check pod logs/status."
    exit 1
  fi
  sleep 1
done

INITIALIZED="$(echo "$STATUS_JSON" | jq -r '.initialized')"
SEALED="$(echo "$STATUS_JSON" | jq -r '.sealed')"

echo "✅ INITIALIZED=[$INITIALIZED], SEALED=[$SEALED]"

INIT_FILE="$K3S_CLUSTER_PATH/vault-unseal-keys.json"
if [[ "$INITIALIZED" != "true" ]]; then
  echo "👉 Vault is NOT initialised. Initialising with Shamir config"
  INIT_JSON="$(vault_exec operator init -key-shares=1 -key-threshold=1 -format=json)"

  echo "$INIT_JSON" > "$INIT_FILE"

  echo "✅ Saved unseal keys to: $INIT_FILE"
  echo "⚠️ IMPORTANT: Back it up securely (password manager / encrypted storage)."
else
  echo "✅ Vault is already initialised."
fi

echo "👉 Refreshing vault status"
STATUS_JSON="$(status_json)"
SEALED="$(echo "$STATUS_JSON" | jq -r '.sealed')"

echo "✅ SEALED=[$SEALED]"

if [[ "$SEALED" == "true" ]]; then
  if [[ ! -f "$INIT_FILE" ]]; then
    echo "❌ Vault is sealed but $INIT_FILE not found. Can't unseal automatically."
    exit 1
  fi

  echo "👉 Vault is sealed. Unsealing"

  KEY="$(jq -r ".unseal_keys_b64[0]" "$INIT_FILE")"
  vault_exec operator unseal "$KEY" >/dev/null
  echo "Unseal done."
else
  echo "Vault is already unsealed."
fi

echo "👉 Checking final vault status"
FINAL_STATUS="$(vault_exec status)"
echo "✅ Final vault status:"
echo "--------------------------------"
echo "$FINAL_STATUS"
echo "--------------------------------"

echo ""
echo ""
echo "⬇️ Setup Vault Secrets Management for External Secrets Operator and Kubernetes auth"
echo ""

echo "👉 Getting root token from INIT_FILE=[$INIT_FILE]"
if [[ ! -f "$INIT_FILE" ]]; then
  echo "❌ INIT_FILE not found"
  exit 1
fi
ROOT_TOKEN="$(jq -r '.root_token' "$INIT_FILE")"
if [[ -z "$ROOT_TOKEN" || "$ROOT_TOKEN" == "null" ]]; then
  echo "❌ Root token not found in INIT_FILE"
  exit 1
fi
vault_exec_with_token() {
  kubectl exec -n "$VAULT_NS" "$POD" -- env VAULT_TOKEN="$ROOT_TOKEN" vault "$@"
}
echo "✅ Root token is ready"


echo "👉 Setting up Vault Kubernetes auth for External Secrets Operator (auth method + KV store + ACL policy)"
K8S_HOST="https://$(kubectl exec -n "$VAULT_NS" "$POD" -- sh -c 'echo "${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}"')"
if ! vault_exec_with_token auth list -format=json 2>/dev/null | jq -e '.["kubernetes/"]' &>/dev/null; then
  vault_exec_with_token auth enable kubernetes
  echo "✅ Kubernetes auth enabled."
else
  echo "✅ Kubernetes auth already enabled."
fi

echo "👉 Configuring Kubernetes auth (in-pod token for TokenReview)"
vault_exec_with_token write auth/kubernetes/config kubernetes_host="$K8S_HOST"
echo "✅ Kubernetes auth configured."

echo "👉 Enabling KV v2 secrets engine"
KV_SECRETS_ENGINE_PATH="kv"
if ! vault_exec_with_token secrets list -format=json 2>/dev/null | jq -e ".[\"${KV_SECRETS_ENGINE_PATH}/\"]" &>/dev/null; then
  vault_exec_with_token secrets enable -path="$KV_SECRETS_ENGINE_PATH" kv-v2
  echo "✅ KV v2 enabled at $KV_SECRETS_ENGINE_PATH."
else
  echo "✅ KV v2 at $KV_SECRETS_ENGINE_PATH already enabled."
fi

echo "👉 Writing ACL policy"
EXTERNAL_SECRETS_POLICY_NAME="external-secrets-reader-acl-policy"
EXTERNAL_SECRETS_POLICY="
path \"${KV_SECRETS_ENGINE_PATH}/data/*\" {
  capabilities = [\"read\", \"list\"]
}
path \"${KV_SECRETS_ENGINE_PATH}/metadata/*\" {
  capabilities = [\"read\", \"list\"]
}
"
echo "$EXTERNAL_SECRETS_POLICY" | kubectl exec -i -n "$VAULT_NS" "$POD" -- env VAULT_TOKEN="$ROOT_TOKEN" vault policy write "$EXTERNAL_SECRETS_POLICY_NAME" -
echo "✅ Policy $EXTERNAL_SECRETS_POLICY_NAME written."

EXTERNAL_SECRETS_ROLE_NAME="external-secrets-role"

vault_exec_with_token write auth/kubernetes/role/$EXTERNAL_SECRETS_ROLE_NAME \
  bound_service_account_names="$EXTERNAL_SECRETS_NS" \
  bound_service_account_namespaces="$EXTERNAL_SECRETS_NS" \
  policies="$EXTERNAL_SECRETS_POLICY_NAME" \
  ttl=1h
echo "✅ Vault External Secrets Operator setup done role=[$EXTERNAL_SECRETS_ROLE_NAME] policy=[$EXTERNAL_SECRETS_POLICY_NAME] SA=[$EXTERNAL_SECRETS_NS]"

KV_SECRET="$KV_SECRETS_ENGINE_PATH/senaev-com-kv"
echo "👉 Ensuring secret $KV_SECRET exists"
if ! vault_exec_with_token kv get "$KV_SECRET" &>/dev/null; then
  vault_exec_with_token kv put "$KV_SECRET" _placeholder=""
  echo "✅ Secret $KV_SECRET created."
else
  echo "✅ Secret $KV_SECRET already exists."
fi

