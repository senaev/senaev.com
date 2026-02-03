#!/bin/bash

# Deploy senaev.com to production server
# This script uploads docker-compose file, pulls latest image, and runs docker compose

set -e  # Exit on any error

echo "🚀 Starting deployment to production server..."

# Ensure directory exists on server
echo "📁 Ensuring directory exists on server..."
ssh ubuntu@51.250.80.209 'mkdir -p /home/ubuntu/docker-compose'

# Upload config files to server
echo "📤 Uploading docker-compose.yaml to server..."
scp docker-compose.yaml ubuntu@51.250.80.209:/home/ubuntu/docker-compose/
echo "📤 Uploading Caddyfile to server..."
scp Caddyfile ubuntu@51.250.80.209:/home/ubuntu/docker-compose/
echo "📤 Uploading scrape.yml to server..."
scp scrape.yml ubuntu@51.250.80.209:/home/ubuntu/docker-compose/

# Execute deployment commands on server
echo "🔄 Deploying on server..."
ssh -t ubuntu@51.250.80.209 '
    cd /home/ubuntu/docker-compose
    echo "🛑 Stopping containers..."
    sudo docker compose down || true
    echo "🗑️  Removing old image..."
    sudo docker image rm cr.yandex/crpnkh51pjbnliqhuqml/senaev.com:latest || true
    echo "📥 Pulling latest image..."
    sudo docker pull cr.yandex/crpnkh51pjbnliqhuqml/senaev.com:latest
    echo "🚀 Starting services..."
    sudo docker compose up -d
'

echo "✅ Deployment completed successfully!"