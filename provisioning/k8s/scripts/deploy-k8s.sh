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

echo "👉 Creating namespace=[$NS] if not exists"
kubectl create namespace "$NS" --dry-run=client -o yaml | kubectl apply -f -
echo "✅ Namespace=[$NS] created"

echo "👉 Helm upgrade namespace=[$NS] release=[$HELM_RELEASE_NAME]"
helm upgrade --install $HELM_RELEASE_NAME ./provisioning/k8s/helm/$NS \
  -n $NS \
  -f ./provisioning/k8s/helm/$NS/values.yaml \
  --take-ownership
echo "✅ Helm deploy done"

# echo "👉 Creating namespace=[$VAULT_NS] if not exists"
# kubectl create namespace "$VAULT_NS" --dry-run=client -o yaml | kubectl apply -f -
# echo "✅ Namespace=[$VAULT_NS] created"

# echo "👉 Helm upgrade namespace=[$VAULT_NS]"
# helm upgrade --install vault ./provisioning/k8s/helm/$VAULT_NS \
#   -n "$VAULT_NS" \
#   -f ./provisioning/k8s/helm/$VAULT_NS/values.yaml \
#   --take-ownership
# echo "✅ Vault helm chart deployed"

# echo "👉 Deploying vault"
# $SCRIPT_DIR/deploy-vault.sh
# echo "✅ Vault deployed"

