#!/bin/bash

set -e  # Exit on any error


SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
K3S_CLUSTER_DIR="/home/ubuntu/k3s-cluster"
XRAY_VOLUME_DIR="$K3S_CLUSTER_DIR/volumes/xray"

# Ensure directory exists on server
echo "📁 Ensuring k3s-cluster directory exists on server..."
ssh ubuntu@51.250.80.209 "mkdir -p $XRAY_VOLUME_DIR"

echo "📤 Uploading xray-config.json to server..."
scp $SCRIPT_DIR/xray-config.json ubuntu@51.250.80.209:$XRAY_VOLUME_DIR/

echo "✅ Config is on the server"
echo "⚠️ {USER_UUID} and {REALITY_PRIVATE_KEY} should be updated in the config"
