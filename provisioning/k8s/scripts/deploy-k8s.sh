#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
K3S_CLUSTER_DIR="/home/ubuntu/k3s-cluster"
HELM_RELEASE_NAME="default"

set -a
source "$REPO_ROOT/.env"
set +a

cd $K3S_CLUSTER_DIR

if kubectl get namespace "$NS" &>/dev/null; then
    echo "🤷 Namespace $NS already exists."
else
    echo "👉 Creating namespace [$NS]..."
    kubectl create namespace "$NS"
    echo "✅ Namespace=[$NS] created."
fi

echo "👉 Helm upgrade --install namespace=[$NS] release=[$HELM_RELEASE_NAME]..."
helm upgrade --install $HELM_RELEASE_NAME ./provisioning/k8s/helm/default \
  -n $NS \
  -f ./provisioning/k8s/helm/default/values.yaml \
  --take-ownership
echo "✅ Helm deploy done."
