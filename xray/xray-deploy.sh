#!/bin/bash

set -e  # Exit on any error


SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DOCKER_COMPOSE_DIR="/home/ubuntu/docker-compose"

# Ensure directory exists on server
echo "📁 Ensuring docker-compose directory exists on server..."
ssh ubuntu@51.250.80.209 "mkdir -p $DOCKER_COMPOSE_DIR"

echo "📤 Uploading xray-config.json to server..."
scp $SCRIPT_DIR/xray-config.json ubuntu@51.250.80.209:$DOCKER_COMPOSE_DIR/

echo "✅ Config is on the server"
echo "⚠️ {USER_UUID} and {REALITY_PRIVATE_KEY} should be updated in the config"
