#!/usr/bin/env sh
set -e

IMAGE_NAME="senaev.com"
REGISTRY_IMAGE="cr.yandex/crpnkh51pjbnliqhuqml/senaev.com:latest"

echo "[1/3] 👉 Building Docker image (linux/amd64)"
docker build --platform linux/amd64 -t "$IMAGE_NAME" .
echo "[1/3] ✅ Build done."

echo "[2/3] 👉 Tagging image for registry"
docker tag "$IMAGE_NAME" "$REGISTRY_IMAGE"
echo "[2/3] ✅ Tag done."

echo "[3/3] 👉 Pushing to registry"
docker push "$REGISTRY_IMAGE"
echo "[3/3] ✅ Push done."

echo "✅ All steps completed successfully."
