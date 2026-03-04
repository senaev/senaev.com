#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="senaev.com"
REGISTRY_IMAGE="ghcr.io/senaev/senaev.com:latest"

echo "👉 Checking if logged in to ghcr.io"
if ! grep -q '"ghcr.io"' "${DOCKER_CONFIG:-$HOME/.docker}/config.json" 2>/dev/null; then
  echo "❌ Not logged in to ghcr.io. Run:"
  echo "   - Go to https://github.com/settings/tokens/new"
  echo "   - Select 'read:packages' and 'write:packages' scopes"
  echo "   - Copy the token"
  echo "   - Run: echo <token> | docker login ghcr.io -u senaev --password-stdin"
  exit 1
fi
echo "✅ Logged in to ghcr.io"

echo "[1/3] 👉 Building Docker image (linux/amd64) (run 'colima start --memory 8' if this step fails)"
docker build --platform linux/amd64 -t "$IMAGE_NAME" .
echo "[1/3] ✅ Build done."

echo "[2/3] 👉 Tagging image for registry"
docker tag "$IMAGE_NAME" "$REGISTRY_IMAGE"
echo "[2/3] ✅ Tag done."

echo "[3/3] 👉 Pushing to registry"
docker push "$REGISTRY_IMAGE"
echo "[3/3] ✅ Push done."

echo "✅ All steps completed successfully."
