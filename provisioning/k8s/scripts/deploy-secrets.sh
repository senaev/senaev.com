#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
set -a; source "$SCRIPT_DIR/.env"; set +a
set -a; source "$SECRETS_PATH/.env"; set +a

# ❗️ TODO: simplify the logic or use Vault for secrets management
echo "👉 Creating secrets in namespace=[$NS] from folder=[$PWD] on server"
kubectl create secret generic app-secrets \
  -n "$NS" \
  --from-literal=GRAFANA_ADMIN_USER="$GRAFANA_ADMIN_USER" \
  --from-literal=GRAFANA_ADMIN_PASSWORD="$GRAFANA_ADMIN_PASSWORD" \
  --from-literal=GRAFANA_ROOT_URL="$GRAFANA_ROOT_URL" \
  --dry-run=client -o yaml | kubectl apply -f -

echo "✅ Secrets applied in namespace=[$NS]"
