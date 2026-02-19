#!/bin/bash
# Create app secrets in namespace. Run once or when secrets change.
# ⚠️ Do NOT commit real values to git!

set -e

echo "🔄 Applying secrets to namespace=[$NAMESPACE] on server..."
ssh -t "$DEPLOY_HOST" "
  set -e
  kubectl create secret generic app-secrets -n "$NAMESPACE" \
    --from-literal=WEBDAV_PASSWORD="${WEBDAV_PASSWORD}" \
    --from-literal=GRAFANA_ADMIN_USER="${GRAFANA_ADMIN_USER}" \
    --from-literal=GRAFANA_ADMIN_PASSWORD="${GRAFANA_ADMIN_PASSWORD}" \
    --from-literal=GRAFANA_ROOT_URL="${GRAFANA_ROOT_URL}" \
    --dry-run=client -o yaml | kubectl apply -f -

    echo '✅ Secrets applied in namespace=[$NAMESPACE]'
"

echo "✅ Secrets app-secrets applied in namespace=[$NAMESPACE]"
