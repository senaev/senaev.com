#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
set -a; source "$SCRIPT_DIR/.env"; set +a

if ! command -v k3s &>/dev/null; then
  echo "👉 k3s not found, installing..."
  curl -sfL https://get.k3s.io | \
    INSTALL_K3S_EXEC="server --disable traefik --write-kubeconfig-mode 644" \
    sh -
  echo "✅ k3s installed"
else
  echo "✅ k3s already installed"
fi

upgrade_namespace() {
  local NS="$1"

  echo "👉 Checking namespace=[$NS]"
  kubectl create namespace "$NS" --dry-run=client -o yaml | kubectl apply -f -
  echo "✅ Namespace=[$NS] exists"

  echo "👉 Helm upgrade namespace=[$NS]"
  helm upgrade --install "$NS" $PROVISIONING_PATH/k8s/helm/$NS \
    -n "$NS" \
    -f $PROVISIONING_PATH/k8s/helm/$NS/values.yaml \
    --take-ownership
  echo "✅ Helm upgrade namespace=[$NS]"
}

upgrade_namespace $EXTERNAL_SECRETS_NS

echo "👉 Waiting for ESO webhook to be ready (required for ClusterSecretStore validation by Vault)"
kubectl rollout status deployment/external-secrets-webhook -n "$EXTERNAL_SECRETS_NS" --timeout=120s
echo "✅ ESO webhook ready"

upgrade_namespace $VAULT_NS

echo "👉 Deploying vault"
$SCRIPT_DIR/deploy-vault.sh
echo "✅ Vault deployed"

upgrade_namespace $SENAEV_COM_NS

