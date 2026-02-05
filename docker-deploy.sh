#!/bin/bash

# Deploy senaev.com to production server
# This script uploads docker-compose file, pulls latest image, and runs docker compose

set -e  # Exit on any error

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DOCKER_COMPOSE_DIR="/home/ubuntu/docker-compose"

echo "🚀 Starting deployment to production server..."

# Ensure directory exists on server
echo "📁 Ensuring docker-compose directory exists on server..."
ssh ubuntu@51.250.80.209 "mkdir -p $DOCKER_COMPOSE_DIR"

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