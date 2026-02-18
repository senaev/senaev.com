#!/bin/bash
# Create app secrets in namespace. Run once or when secrets change.
# Loads .env from repo root if present; you can also set env vars manually.
# Do NOT commit real values to git.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
if [ ! -f "$REPO_ROOT/.env" ]; then
  echo "Error: $REPO_ROOT/.env not found. Create it with WEBDAV_PASSWORD, GRAFANA_* etc." >&2
  exit 1
fi
set -a
# shellcheck source=/dev/null
source "$REPO_ROOT/.env"
set +a

NAMESPACE="senaev-com"

kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic app-secrets -n "$NAMESPACE" \
  --from-literal=WEBDAV_PASSWORD="${WEBDAV_PASSWORD}" \
  --from-literal=GRAFANA_ADMIN_USER="${GRAFANA_ADMIN_USER}" \
  --from-literal=GRAFANA_ADMIN_PASSWORD="${GRAFANA_ADMIN_PASSWORD}" \
  --from-literal=GRAFANA_ROOT_URL="${GRAFANA_ROOT_URL}" \
  --dry-run=client -o yaml | kubectl apply -f -

# Optional: Yandex Container Registry pull secret (if nextjs-app image is private)
# kubectl create secret docker-registry yandex-cr -n "$NAMESPACE" \
#   --docker-server=cr.yandex \
#   --docker-username=<OCI_TOKEN_USER> \
#   --docker-password=<OCI_TOKEN> \
#   --dry-run=client -o yaml | kubectl apply -f -

echo "Secret app-secrets applied in namespace $NAMESPACE."
