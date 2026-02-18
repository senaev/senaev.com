#!/bin/bash

# Deploy senaev.com to production server
# This script uploads required files, pulls latest image, and runs docker compose

set -e  # Exit on any error


SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
K3S_CLUSTER_DIR="/home/ubuntu/k3s-cluster"
DEPLOY_HOST="ubuntu@51.250.80.209"

echo "🚀 Starting deployment to production server..."

# Ensure directory exists on server
echo "📁 Ensuring k3s-cluster directory exists on server..."
# ❗️ TODO: move hostname to variable
ssh $DEPLOY_HOST "mkdir -p $K3S_CLUSTER_DIR"

# One-time Datadog host agent install: if script is not on server, upload, make executable, run
DATADOG_SCRIPT_PATH="$K3S_CLUSTER_DIR/scripts/datadog-install.sh"
if ! ssh $DEPLOY_HOST "test -f $DATADOG_SCRIPT_PATH"; then
  echo "📤 Uploading Datadog install script (one-time setup)..."
  ssh $DEPLOY_HOST "mkdir -p $K3S_CLUSTER_DIR/scripts"
  scp $SCRIPT_DIR/scripts/datadog-install.sh $DEPLOY_HOST:$DATADOG_SCRIPT_PATH
  echo "🔧 Making script executable..."
  ssh $DEPLOY_HOST "chmod +x $DATADOG_SCRIPT_PATH"
  echo "🚀 Running Datadog install..."
  ssh -t $DEPLOY_HOST "$DATADOG_SCRIPT_PATH"
  echo "✅ Datadog install completed successfully!"
else
  echo "🙈 Datadog install script already on server, skipping."
fi

# Upload config files to server
echo "🔄 Deploying k8s stack to server..."
./k8s/deploy.sh
echo "✅ k8s stack deployed to server."

echo "✅ Deployment completed successfully!"