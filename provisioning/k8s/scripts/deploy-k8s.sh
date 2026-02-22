#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
K3S_CLUSTER_DIR="/home/ubuntu/k3s-cluster"
HELM_RELEASE_NAME="rev-$(date +%Y-%m-%d-%H-%M-%S)"

set -a
source "$REPO_ROOT/.env"
set +a

cd $K3S_CLUSTER_DIR

# ❗️ TODO: remove this step after integrating secrets into a Vault
echo "👉 Creating namespace=[$NS] if not exists"
kubectl create namespace "$NS" --dry-run=client -o yaml | kubectl apply -f -
echo "✅ Namespace=[$NS] created"

echo "👉 Deploying k8s secrets to server"
$SCRIPT_DIR/deploy-secrets.sh
echo "✅ Secrets deployed to server"

echo "👉 Helm upgrade namespace=[$NS] release=[$HELM_RELEASE_NAME]"
helm upgrade --install $HELM_RELEASE_NAME ./provisioning/k8s/helm/$NS \
  -n $NS \
  --create-namespace \
  -f ./provisioning/k8s/helm/$NS/values.yaml \
  --take-ownership
echo "✅ Helm deploy done"

echo "👉 Helm upgrade namespace=[$VAULT_NS]"
helm upgrade --install vault ./provisioning/k8s/helm/$VAULT_NS \
  -n "$VAULT_NS" \
  --create-namespace \
  -f ./provisioning/k8s/helm/$VAULT_NS/values.yaml \
  --take-ownership
echo "✅ Vault deploy done"
