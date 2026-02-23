#!/bin/bash
set -euo pipefail

# ❗️ TODO: move to Makefile

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
set -a; source "$SCRIPT_DIR/provisioning/k8s/scripts/.env"; set +a
set -a; source "$SCRIPT_DIR/.env"; set +a

echo "👉 Starting deployment to production server"

echo "👉 Syncing provisioning files to server"
rsync -avz --delete -e ssh "$SCRIPT_DIR/provisioning/" "$DEPLOY_HOST:$K3S_CLUSTER_DIR/provisioning/"
echo "✅ Provisioning files synced"

echo "👉 Deploying k8s cluster to server"
ssh "$DEPLOY_HOST" "$K3S_CLUSTER_DIR/provisioning/k8s/scripts/deploy-k8s.sh"
echo "✅ k8s cluster deployed to server"

echo "🏁 Deployment completed successfully!"