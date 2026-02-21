#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
K3S_CLUSTER_DIR="/home/ubuntu/k3s-cluster"
HELM_RELEASE_NAME="default"

set -a
source "$REPO_ROOT/.env"
set +a

echo "👉 Creating secret docker-registry ycr-pull"
kubectl create secret docker-registry ycr-pull \
  --docker-server=cr.yandex \
  --docker-username=json_key \
  --docker-password="$(cat $K3S_CLUSTER_DIR/yandex-cloud-key.json | tr -d '\n')" \
  --docker-email=unused@example.com \
  --dry-run=client -o yaml | kubectl apply -f -
echo "✅ Secret docker-registry ycr-pull created"

# ❗️ TODO: simplify the logic or use Vault for secrets management
echo "👉 Creating secrets in namespace=[$NS] from folder=[$PWD] on server"
kubectl create secret generic app-secrets -n "$NS" \
  --from-literal=WEBDAV_PASSWORD="$WEBDAV_PASSWORD" \
  --from-literal=GRAFANA_ADMIN_USER="$GRAFANA_ADMIN_USER" \
  --from-literal=GRAFANA_ADMIN_PASSWORD="$GRAFANA_ADMIN_PASSWORD" \
  --from-literal=GRAFANA_ROOT_URL="$GRAFANA_ROOT_URL" \
  --dry-run=client -o yaml | kubectl apply -f -

echo "✅ Secrets applied in namespace=[$NS]"
