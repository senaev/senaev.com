#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Same pattern as docker-deploy.sh: adjust host and path for your server
DEPLOY_HOST="ubuntu@51.250.80.209"
K3S_CLUSTER_DIR="/home/ubuntu/k3s-cluster"
HELM_RELEASE_NAME="default"

set -a
source "$REPO_ROOT/.env"
set +a

echo "📁 Ensuring remote grafana directory..."
ssh "$DEPLOY_HOST" "mkdir -p $K3S_CLUSTER_DIR/grafana"
echo "✅ Remote grafana directory ready."

echo "📤 Uploading grafana/provisioning/..."
scp -r "$REPO_ROOT/grafana/provisioning" "$DEPLOY_HOST:$K3S_CLUSTER_DIR/grafana/"
echo "✅ grafana/provisioning/ uploaded."

echo "🚀 Deploying Helm chart to server (namespace: $NAMESPACE)..."

echo "📁 Ensuring remote helm directory..."
ssh "$DEPLOY_HOST" "mkdir -p $K3S_CLUSTER_DIR/helm"
echo "✅ Remote helm directory ready."

echo "🧹 Cleaning remote chart directory..."
ssh "$DEPLOY_HOST" "rm -rf $K3S_CLUSTER_DIR/helm/default"
echo "✅ Remote chart directory cleaned."

echo "📤 Uploading Helm chart..."
scp -r "$REPO_ROOT/helm/default" "$DEPLOY_HOST:$K3S_CLUSTER_DIR/helm/"
echo "✅ Helm chart uploaded."

echo "🔄 Helm upgrade --install..."
ssh -t "$DEPLOY_HOST" "
    set -e
    cd $K3S_CLUSTER_DIR

    if [ \"$NAMESPACE\" = \"default\" ] || kubectl get namespace \"$NAMESPACE\" &>/dev/null; then
        echo "🤷 Namespace $NAMESPACE already exists."
    else
        echo "🚀 Creating namespace $NAMESPACE..."
        kubectl create namespace "$NAMESPACE"
        echo "✅ Namespace $NAMESPACE created."
    fi

    echo \"📋 Helm upgrade --install $HELM_RELEASE_NAME ...\"
    helm upgrade --install $HELM_RELEASE_NAME ./helm/default \
      -n $NAMESPACE \
      -f ./helm/default/values.yaml \
      --take-ownership
    echo \"✅ Helm deploy done.\"
"

echo "✅ Deployment completed successfully!"
