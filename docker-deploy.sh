#!/bin/bash

# Deploy senaev.com to production server
# This script uploads docker-compose file, pulls latest image, and runs docker compose

set -e  # Exit on any error

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DOCKER_COMPOSE_DIR="/home/ubuntu/docker-compose"

echo "🚀 Starting deployment to production server..."

# Ensure directory exists on server
echo "📁 Ensuring docker-compose directory exists on server..."
# ❗️ TODO: move hostname to variable
ssh ubuntu@51.250.80.209 "mkdir -p $DOCKER_COMPOSE_DIR"

# One-time Datadog host agent install: if script is not on server, upload, make executable, run
DATADOG_SCRIPT_PATH="$DOCKER_COMPOSE_DIR/scripts/datadog-install.sh"
if ! ssh ubuntu@51.250.80.209 "test -f $DATADOG_SCRIPT_PATH"; then
  echo "📤 Uploading Datadog install script (one-time setup)..."
  ssh ubuntu@51.250.80.209 "mkdir -p $DOCKER_COMPOSE_DIR/scripts"
  scp $SCRIPT_DIR/scripts/datadog-install.sh ubuntu@51.250.80.209:$DATADOG_SCRIPT_PATH
  echo "🔧 Making script executable..."
  ssh ubuntu@51.250.80.209 "chmod +x $DATADOG_SCRIPT_PATH"
  echo "🚀 Running Datadog install..."
  ssh -t ubuntu@51.250.80.209 "$DATADOG_SCRIPT_PATH"
  echo "✅ Datadog install completed successfully!"
else
  echo "🙈 Datadog install script already on server, skipping."
fi

# Upload config files to server
echo "📤 Uploading docker-compose.yaml to server..."
scp $SCRIPT_DIR/docker-compose.yaml ubuntu@51.250.80.209:$DOCKER_COMPOSE_DIR/
echo "📤 Uploading Caddyfile to server..."
scp $SCRIPT_DIR/Caddyfile ubuntu@51.250.80.209:$DOCKER_COMPOSE_DIR/
echo "📤 Uploading scrape.yml to server..."
scp $SCRIPT_DIR/scrape.yml ubuntu@51.250.80.209:$DOCKER_COMPOSE_DIR/
echo "📤 Uploading grafana/ to server..."
scp -r $SCRIPT_DIR/grafana ubuntu@51.250.80.209:$DOCKER_COMPOSE_DIR/

# Execute deployment commands on server
echo "🔄 Deploying on server..."
ssh -t ubuntu@51.250.80.209 '
    echo "🏃 Navigating to folder=[/home/ubuntu/docker-compose]..."
    cd /home/ubuntu/docker-compose
    echo "🛑 Stopping containers in folder=[$PWD]..."
    sudo docker compose down --remove-orphans || true
    echo "🗑️  Removing old image..."
    sudo docker image rm cr.yandex/crpnkh51pjbnliqhuqml/senaev.com:latest || true
    echo "📥 Pulling latest image..."
    sudo docker pull cr.yandex/crpnkh51pjbnliqhuqml/senaev.com:latest
    echo "🚀 Starting services..."
    sudo docker compose up -d
'

echo "✅ Deployment completed successfully!"