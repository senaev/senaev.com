#!/bin/bash

# Deploy senaev.com to production server
# This script uploads docker-compose file, pulls latest image, and runs docker compose

set -e  # Exit on any error

echo "🚀 Starting deployment to production server..."

# Upload docker-compose file to server
echo "📤 Uploading docker-compose.prod.yaml to server..."
scp docker-compose.prod.yaml ubuntu@51.250.80.209:/home/ubuntu/docker-compose/

# Execute deployment commands on server
echo "🔄 Deploying on server..."
ssh -t ubuntu@51.250.80.209 '
    cd /home/ubuntu/docker-compose
    echo "🛑 Stopping containers..."
    sudo docker compose -f docker-compose.prod.yaml down || true
    echo "🗑️  Removing old image..."
    sudo docker image rm cr.yandex/crpnkh51pjbnliqhuqml/senaev.com:latest || true
    echo "📥 Pulling latest image..."
    sudo docker pull cr.yandex/crpnkh51pjbnliqhuqml/senaev.com:latest
    echo "🚀 Starting services..."
    sudo docker compose -f docker-compose.prod.yaml up -d
'

echo "✅ Deployment completed successfully!"