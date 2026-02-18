#!/bin/bash
# Deploy senaev.com stack to k3s.
# Run locally: uploads k8s manifests and grafana provisioning to the server, then applies on the server via SSH.
# Prerequisites: SSH access to server, kubectl + kubeconfig on the server (e.g. k3s).

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
NAMESPACE="senaev-com"

# Same pattern as docker-deploy.sh: adjust host and path for your server
DEPLOY_HOST="ubuntu@51.250.80.209"
K8S_REMOTE_DIR="/home/ubuntu/k8s"

echo "🚀 Deploying k8s stack to server (namespace: $NAMESPACE)..."

echo "📁 Ensuring remote base directory exists..."
ssh "$DEPLOY_HOST" "mkdir -p $K8S_REMOTE_DIR"

echo "🧹 Cleaning remote deploy directory..."
ssh "$DEPLOY_HOST" "rm -rf $K8S_REMOTE_DIR/*"

echo "📤 Uploading k8s/ to server..."
scp -r "$REPO_ROOT/k8s" "$DEPLOY_HOST:$K8S_REMOTE_DIR/"

echo "📤 Uploading grafana/provisioning/ to server..."
scp -r "$REPO_ROOT/grafana/provisioning" "$DEPLOY_HOST:$K8S_REMOTE_DIR/grafana/"

echo "🔄 Applying on server..."
ssh -t "$DEPLOY_HOST" "
    set -e
    cd $K8S_REMOTE_DIR
    echo '📋 Creating/updating Grafana dashboards ConfigMap...'
    kubectl create configmap grafana-dashboards \
      --from-file=grafana/provisioning/dashboards/default \
      -n $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -
    echo '📋 Applying k8s manifests...'
    kubectl apply -f k8s/
    echo '✅ Apply done.'
"

echo "✅ Deployment completed successfully!"
