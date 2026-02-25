#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
set -a; source "$SCRIPT_DIR/.env"; set +a
set -a; source "$SECRETS_PATH/.env"; set +a

HELM_RELEASE_NAME="rev-$(date +%Y%m%d%H%M%S)"

cd $K3S_CLUSTER_PATH

echo "👉 Ensuring k3s-cluster directory and structure exist on server"
mkdir -p \
  $PROVISIONING_PATH \
  $SECRETS_PATH \
  $VOLUMES_PATH
echo "✅ k3s-cluster directory and structure exist on server"

# ❗️ TODO: remove this step after integrating secrets into a Vault
echo "👉 Creating namespace=[$NS] if not exists"
kubectl create namespace "$NS" --dry-run=client -o yaml | kubectl apply -f -
echo "✅ Namespace=[$NS] created"

echo "👉 Deploying k8s secrets to server"
$SCRIPT_DIR/deploy-secrets.sh
echo "✅ Secrets deployed to server"

# Vault setup (ESO first in its own namespace, then vault)
echo "👉 Creating namespace=[$ESO_NS] if not exists (External Secrets Operator)"
kubectl create namespace "$ESO_NS" --dry-run=client -o yaml | kubectl apply -f -
echo "✅ Namespace=[$ESO_NS] created"

echo "👉 Creating namespace=[$VAULT_NS] if not exists"
kubectl create namespace "$VAULT_NS" --dry-run=client -o yaml | kubectl apply -f -
echo "✅ Namespace=[$VAULT_NS] created"

echo "👉 Helm upgrade external-secrets (namespace=[$ESO_NS]) — install ESO first for CRDs"
helm upgrade --install external-secrets ./provisioning/k8s/helm/external-secrets \
  -n "$ESO_NS" \
  -f ./provisioning/k8s/helm/external-secrets/values.yaml \
  --take-ownership
echo "✅ External Secrets Operator deployed (namespace=$ESO_NS)"

echo "👉 Helm upgrade namespace=[$VAULT_NS] vault"
helm upgrade --install vault ./provisioning/k8s/helm/$VAULT_NS \
  -n "$VAULT_NS" \
  -f ./provisioning/k8s/helm/$VAULT_NS/values.yaml \
  --take-ownership
echo "✅ Vault helm chart deployed"

echo "👉 Deploying vault"
$SCRIPT_DIR/deploy-vault.sh
echo "✅ Vault deployed"

# App setup

echo "👉 Creating namespace=[$NS] if not exists"
kubectl create namespace "$NS" --dry-run=client -o yaml | kubectl apply -f -
echo "✅ Namespace=[$NS] created"

echo "👉 Helm upgrade namespace=[$NS] release=[$HELM_RELEASE_NAME]"
helm upgrade --install senaev-com ./provisioning/k8s/helm/$NS \
  -n $NS \
  -f ./provisioning/k8s/helm/$NS/values.yaml \
  --take-ownership
echo "✅ Helm deploy done"
