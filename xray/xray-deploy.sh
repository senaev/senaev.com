#!/bin/bash

set -e  # Exit on any error

# ❗️ TODO: move to secrets
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
K3S_CLUSTER_PATH="/root/k3s-cluster"
XRAY_SECRET_DIR="$K3S_CLUSTER_PATH/secrets/xray"

# Ensure directory exists on server
echo "👉 Ensuring k3s-cluster directory exists on server"
ssh "$REMOTE_SERVER_ADDRESS" "mkdir -p $XRAY_SECRET_DIR"

echo "👉 Uploading xray-config.json to server"
scp $SCRIPT_DIR/xray-config.json "$REMOTE_SERVER_ADDRESS":$XRAY_SECRET_DIR/

echo "✅ Config is on the server"
echo "⚠️ {USER_UUID} and {REALITY_PRIVATE_KEY} should be updated in the config"
