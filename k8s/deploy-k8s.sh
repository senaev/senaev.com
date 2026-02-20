#!/bin/bash
# Deploy senaev.com stack to k3s.
# Run locally: uploads k8s manifests and grafana provisioning to the server, then applies on the server via SSH.
# Prerequisites: SSH access to server, kubectl + kubeconfig on the server (e.g. k3s).

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Same pattern as docker-deploy.sh: adjust host and path for your server
DEPLOY_HOST="ubuntu@51.250.80.209"
K3S_CLUSTER_DIR="/home/ubuntu/k3s-cluster"

set -a
source "$REPO_ROOT/.env"
set +a

echo "🚀 Deploying k8s stack to server (namespace: $NAMESPACE)..."

echo "📁 Ensuring remote base directory k8s exists..."
ssh "$DEPLOY_HOST" "mkdir -p $K3S_CLUSTER_DIR/k8s"
echo "✅ Remote base directory k8s created."

echo "🧹 Cleaning remote deploy directory..."
ssh "$DEPLOY_HOST" "rm -rf $K3S_CLUSTER_DIR/k8s/*"
echo "✅ Remote deploy directory cleaned."

echo "📤 Uploading k8s/ files to server..."
scp -r "$REPO_ROOT/k8s" "$DEPLOY_HOST:$K3S_CLUSTER_DIR/"
echo "✅ k8s/ files uploaded to server."


echo "📁 Ensuring remote base directory grafana exists..."
ssh "$DEPLOY_HOST" "mkdir -p $K3S_CLUSTER_DIR/grafana"
echo "✅ Remote base directory grafana created."

echo "📤 Uploading grafana/provisioning/ files to server..."
scp -r "$REPO_ROOT/grafana/provisioning" "$DEPLOY_HOST:$K3S_CLUSTER_DIR/grafana/"
echo "✅ grafana/provisioning/ files uploaded to server."

echo "🔄 Applying..."
ssh -t "$DEPLOY_HOST" "
    echo "🔄 Applying on server..."
    set -e
    cd $K3S_CLUSTER_DIR

    if kubectl get namespace "$NAMESPACE" &>/dev/null; then
        echo "🤷‍♂️ Namespace $NAMESPACE already exists."
    else
        echo "🚀 Creating namespace $NAMESPACE..."
        kubectl create namespace "$NAMESPACE"
        echo "✅ Namespace $NAMESPACE created."
    fi

    echo "📋 Applying k8s manifests..."
    kubectl apply -f k8s/ --prune -l app \
      --prune-allowlist=apps/v1/Deployment \
      --prune-allowlist=apps/v1/DaemonSet \
      --prune-allowlist=core/v1/Service \
      --prune-allowlist=networking.k8s.io/v1/Ingress \
      --prune-allowlist=core/v1/ConfigMap
    echo '✅ Apply on server done.'
"

echo "✅ Deployment completed successfully!"
