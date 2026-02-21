#!/usr/bin/env bash
# Vault bootstrap: init, unseal, enable KV v2, enable Kubernetes auth, create policy and role.
# Run AFTER Vault pod is Running. Use: kubectl exec -n vault vault-0 -- vault status
# Prerequisites: kubectl, jq (for init output). Run from repo root or set VAULT_NS.

set -e

VAULT_NS="vault"
VAULT_POD="vault-0"

echo "🔐 Vault bootstrap (namespace: $VAULT_NS) ..."

# 1) Init (only if not already initialized)
init_out=$(kubectl exec -n "$VAULT_NS" "$VAULT_POD" -- vault operator init -format=json -key-shares=1 -key-threshold=1 2>/dev/null || true)
if echo "$init_out" | jq -e .unseal_keys_b64 >/dev/null 2>&1; then
  echo "🔐 Vault initialized. SAVE THE UNSEAL KEY AND ROOT TOKEN BELOW."
  echo "$init_out" | jq .
  UNSEAL_KEY=$(echo "$init_out" | jq -r .unseal_keys_b64[0])
  ROOT_TOKEN=$(echo "$init_out" | jq -r .root_token)
  echo "Unseal key: $UNSEAL_KEY"
  echo "Root token: $ROOT_TOKEN"
else
  echo "🤷 Vault already initialized or init failed. If already initialized, unseal and login manually."
  read -r -p "Paste unseal key: " UNSEAL_KEY
  read -r -p "Paste root token: " ROOT_TOKEN
fi

# 2) Unseal
kubectl exec -n "$VAULT_NS" "$VAULT_POD" -- vault operator unseal "$UNSEAL_KEY"
echo "Unsealed."

# 3) Login (for subsequent commands)
kubectl exec -n "$VAULT_NS" "$VAULT_POD" -- vault login "$ROOT_TOKEN"

# 4) Enable KV v2 at path 'secret'
kubectl exec -n "$VAULT_NS" "$VAULT_POD" -- vault secrets enable -path=secret kv-v2 || true

# 5) Enable Kubernetes auth at path 'kubernetes'
kubectl exec -n "$VAULT_NS" "$VAULT_POD" -- vault auth enable kubernetes || true

# 6) Configure Kubernetes auth: Vault uses a reviewer JWT to call K8s TokenReview API and validate ESO's SA tokens.
# Run the vault write inside the pod so it can read the CA cert from the volume.
kubectl exec -n "$VAULT_NS" "$VAULT_POD" -- sh -c '
  vault write auth/kubernetes/config \
    token_reviewer_jwt="$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
    kubernetes_host="https://kubernetes.default.svc" \
    kubernetes_ca_cert="$(cat /var/run/secrets/kubernetes.io/serviceaccount/ca.crt)"
'
echo "Kubernetes auth configured."

# 7) Policy: allow read for path secret/data/*
kubectl exec -n "$VAULT_NS" "$VAULT_POD" -- vault policy write external-secrets - <<'POLICY'
path "secret/data/*" {
  capabilities = ["read", "list"]
}
path "secret/metadata/*" {
  capabilities = ["read", "list"]
}
POLICY

# 8) Role: bind K8s SA (vault namespace, SA name external-secrets) to the policy
kubectl exec -n "$VAULT_NS" "$VAULT_POD" -- vault write auth/kubernetes/role/external-secrets \
  bound_service_account_names=external-secrets \
  bound_service_account_namespaces=vault \
  policies=external-secrets \
  ttl=1h

echo "=== Bootstrap done. Create secrets under secret/ (e.g. secret/data/default/app-secrets, secret/data/default/registry). ==="
