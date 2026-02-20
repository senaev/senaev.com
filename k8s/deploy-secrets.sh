#!/bin/bash
# Create app secrets in namespace. Run once or when secrets change.
# ⚠️ Do NOT commit real values to git!

set -e


NAMESPACE="senaev-com"
DEPLOY_HOST="ubuntu@51.250.80.209"
K3S_CLUSTER_DIR="/home/ubuntu/k3s-cluster"

echo "🔄 Applying secrets to namespace=[$NAMESPACE]..."
ssh -t "$DEPLOY_HOST" "
  set -e

  cd $K3S_CLUSTER_DIR

  echo "🔄 Creating secret docker-registry ycr-pull..."

  kubectl create secret docker-registry ycr-pull \
    --docker-server=cr.yandex \
    --docker-username=json_key \
    --docker-password=\"\$(cat ../key.json | tr -d '\n')\" \
    --docker-email=unused@example.com \
    --dry-run=client -o yaml | kubectl apply -f -

  echo "✅ Secret docker-registry ycr-pull created."

  source "$K3S_CLUSTER_DIR/.env"

  echo "🔄 Creating secrets in namespace=[\$NAMESPACE] from folder=[\$PWD] on server..."

  # ❗️ TODO: simplify the logic or use Vault for secrets management
  kubectl create secret generic app-secrets -n "\$NAMESPACE" \
    --from-literal=WEBDAV_PASSWORD="\$WEBDAV_PASSWORD" \
    --from-literal=GRAFANA_ADMIN_USER="\$GRAFANA_ADMIN_USER" \
    --from-literal=GRAFANA_ADMIN_PASSWORD="\$GRAFANA_ADMIN_PASSWORD" \
    --from-literal=GRAFANA_ROOT_URL="\$GRAFANA_ROOT_URL" \
    --dry-run=client -o yaml | kubectl apply -f -

    echo '✅ Secrets applied in namespace=[$NAMESPACE]'
"

echo "✅ Secrets app-secrets applied in namespace=[$NAMESPACE]"
