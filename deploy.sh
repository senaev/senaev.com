#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
K3S_CLUSTER_DIR="/home/ubuntu/k3s-cluster"
PROVISIONING_DIR="$K3S_CLUSTER_DIR/provisioning"
SECRETS_DIR="$K3S_CLUSTER_DIR/secrets"
VOLUMES_DIR="$K3S_CLUSTER_DIR/volumes"

DEPLOY_HOST="ubuntu@51.250.80.209"

echo "👉 Starting deployment to production server"

# Ensure directory exists on server and create folder structure (mkdir -p keeps existing content)
echo "👉 Ensuring k3s-cluster directory and structure exist on server"
ssh $DEPLOY_HOST "mkdir -p \
  $PROVISIONING_DIR \
  $SECRETS_DIR \
  $VOLUMES_DIR \
"

echo "👉 Syncing provisioning files to server"
rsync -avz --delete -e ssh "$SCRIPT_DIR/provisioning/" "$DEPLOY_HOST:$K3S_CLUSTER_DIR/provisioning/"
echo "✅ Provisioning files synced"

echo "👉 Deploying k8s cluster to server"
ssh "$DEPLOY_HOST" "$K3S_CLUSTER_DIR/provisioning/k8s/scripts/deploy-k8s.sh"
echo "✅ k8s cluster deployed to server"

echo "✅ Deployment completed successfully!"