#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
K3S_CLUSTER_DIR="/home/ubuntu/k3s-cluster"
HELM_RELEASE_NAME="rev-$(date +%Y-%m-%d-%H-%M-%S)"

set -a
source "$REPO_ROOT/.env"
set +a

cd $K3S_CLUSTER_DIR

POD="$VAULT_NS-0"
INIT_FILE="$K3S_CLUSTER_DIR/vault-unseal-keys.json"

vault_exec() {
  kubectl exec -n "$VAULT_NS" "$POD" -- vault "$@"
}

status_json() {
  vault_exec status -format=json 2>/dev/null || true
}

echo "👉 Checking vault status..."
STATUS_JSON="$(status_json)"
if [[ -z "$STATUS_JSON" ]]; then
  echo "❌ Vault is not responding yet (or CLI can't reach it). Check pod logs/status."
  exit 1
fi

INITIALIZED="$(echo "$STATUS_JSON" | jq -r '.initialized')"
SEALED="$(echo "$STATUS_JSON" | jq -r '.sealed')"

echo "✅ INITIALIZED=[$INITIALIZED], SEALED=[$SEALED]"

if [[ "$INITIALIZED" != "true" ]]; then
  echo "👉 Vault is NOT initialised. Initialising with Shamir config..."
  INIT_JSON="$(vault_exec operator init -key-shares=1 -key-threshold=1 -format=json)"

  echo "$INIT_JSON" > "$INIT_FILE"

  echo "✅ Saved unseal keys to: $INIT_FILE"
  echo "⚠️ IMPORTANT: Back it up securely (password manager / encrypted storage)."
else
  echo "✅ Vault is already initialised."
fi

echo "👉 Refreshing vault status..."
STATUS_JSON="$(status_json)"
SEALED="$(echo "$STATUS_JSON" | jq -r '.sealed')"

echo "✅ SEALED=[$SEALED]"

if [[ "$SEALED" == "true" ]]; then
  if [[ ! -f "$INIT_FILE" ]]; then
    echo "❌ Vault is sealed but $INIT_FILE not found. Can't unseal automatically."
    exit 1
  fi

  echo "👉 Vault is sealed. Unsealing..."

  KEY="$(jq -r ".unseal_keys_b64[0]" "$INIT_FILE")"
  vault_exec operator unseal "$KEY" >/dev/null
  echo "Unseal done."
else
  echo "Vault is already unsealed."
fi

echo "👉 Checking final vault status..."
FINAL_STATUS="$(vault_exec status)"
echo "✅ Final vault status:"
echo "--------------------------------"
echo "$FINAL_STATUS"
echo "--------------------------------"
