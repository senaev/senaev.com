#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
K3S_CLUSTER_DIR="/home/ubuntu/k3s-cluster"
DEPLOY_HOST="ubuntu@51.250.80.209"

echo "👉 Starting deployment to production server"

# Ensure directory exists on server
echo "👉 Ensuring k3s-cluster directory exists on server"
ssh $DEPLOY_HOST "mkdir -p $K3S_CLUSTER_DIR"

echo "👉 Syncing provisioning files to server"
rsync -avz --delete -e ssh "$SCRIPT_DIR/provisioning/" "$DEPLOY_HOST:$K3S_CLUSTER_DIR/provisioning/"
echo "✅ Provisioning files synced"

echo "👉 Deploying k8s cluster to server"
ssh "$DEPLOY_HOST" "$K3S_CLUSTER_DIR/provisioning/k8s/scripts/deploy-k8s.sh"
echo "✅ k8s cluster deployed to server"

echo "✅ Deployment completed successfully!"