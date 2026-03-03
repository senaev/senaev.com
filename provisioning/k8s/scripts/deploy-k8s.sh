#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
set -a; source "$SCRIPT_DIR/.env"; set +a

if ! command -v k3s &>/dev/null; then
  echo "👉 k3s not found, installing..."
  curl -sfL https://get.k3s.io | \
    INSTALL_K3S_EXEC=" \
    server \
    --disable traefik \
    --write-kubeconfig-mode 644 \
    --node-label node=control-plane \
    --node-label location=de \
    " \
    sh -
  echo "✅ k3s installed"
else
  echo "✅ k3s already installed"
fi

mkdir -p ~/.kube
if [ ! -e ~/.kube/config ]; then
  echo "👉 Making symlink to 'rancher' from a default 'kubectl' config (for 'k9s')"
  ln -sf /etc/rancher/k3s/k3s.yaml ~/.kube/config
  echo "✅ Symlink made"
else
  echo "✅ Symlink to 'rancher' already exists"
fi

upgrade_namespace() {
  local NS="$1"
  local CHART_PATH="$PROVISIONING_PATH/k8s/helm/$NS"

  echo "👉 Checking namespace=[$NS]"
  kubectl create namespace "$NS" --dry-run=client -o yaml | kubectl apply -f -
  echo "✅ Namespace=[$NS] exists"

  echo "👉 Updating Helm dependencies for namespace=[$NS]"
  helm dependency update "$CHART_PATH" || true
  echo "✅ Helm dependencies updated for namespace=[$NS]"

  echo "👉 Helm upgrade namespace=[$NS]"
  helm upgrade --install "$NS" $CHART_PATH \
    -n "$NS" \
    -f $CHART_PATH/values.yaml \
    --take-ownership
  echo "✅ Helm upgrade namespace=[$NS]"
}

upgrade_namespace $TRAEFIK_NS

upgrade_namespace $EXTERNAL_SECRETS_NS

echo "👉 Waiting for ESO webhook to be ready (required for ClusterSecretStore validation by Vault)"
kubectl rollout status deployment/external-secrets-webhook -n "$EXTERNAL_SECRETS_NS" --timeout=120s
echo "✅ ESO webhook ready"

upgrade_namespace $VAULT_NS

echo "👉 Deploying vault"
$SCRIPT_DIR/deploy-vault.sh
echo "✅ Vault deployed"

upgrade_namespace $VICTORIA_METRICS_OPERATOR_NS

echo "👉 Waiting for Victoria Metrics Operator webhook to be ready (required for vm-stack CRs)"
kubectl rollout status deployment/vm-operator-victoria-metrics-operator -n "$VICTORIA_METRICS_OPERATOR_NS" --timeout=120s
echo "✅ Victoria Metrics Operator webhook ready"

upgrade_namespace $VICTORIA_METRICS_K8S_STACK_NS

upgrade_namespace $SENAEV_COM_NS
