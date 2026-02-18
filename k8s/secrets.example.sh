#!/bin/bash
# Create app secrets in namespace. Run once or when secrets change.
# ⚠️ Do NOT commit real values to git!

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

set -a
source "$REPO_ROOT/.env"
set +a

kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic app-secrets -n "$NAMESPACE" \
  --from-literal=WEBDAV_PASSWORD="${WEBDAV_PASSWORD}" \
  --from-literal=GRAFANA_ADMIN_USER="${GRAFANA_ADMIN_USER}" \
  --from-literal=GRAFANA_ADMIN_PASSWORD="${GRAFANA_ADMIN_PASSWORD}" \
  --from-literal=GRAFANA_ROOT_URL="${GRAFANA_ROOT_URL}" \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl -n senaev-com create secret docker-registry ycr-pull \
  --docker-server=cr.yandex \
  --docker-username=oauth \
  --docker-password="$(yc iam create-token)" \
  --docker-email=unused@example.com

echo "✅ Secrets app-secrets applied in namespace $NAMESPACE."
