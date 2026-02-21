#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
K3S_CLUSTER_DIR="/home/ubuntu/k3s-cluster"
HELM_RELEASE_NAME="default"

set -a
source "$REPO_ROOT/.env"
set +a

cd $K3S_CLUSTER_DIR

if kubectl get namespace "$NAMESPACE" &>/dev/null; then
    echo "🤷 Namespace $NAMESPACE already exists."
else
    echo "👉 Creating namespace [$NAMESPACE]..."
    kubectl create namespace "$NAMESPACE"
    echo "✅ Namespace=[$NAMESPACE] created."
fi

echo "👉 Helm upgrade --install namespace=[$NAMESPACE] release=[$HELM_RELEASE_NAME]..."
helm upgrade --install $HELM_RELEASE_NAME ./provisioning/k8s/helm/default \
  -n $NAMESPACE \
  -f ./provisioning/k8s/helm/default/values.yaml \
  --take-ownership
echo "✅ Helm deploy done."




#!/bin/bash
# Declarative Helm deploy: Vault (upstream) → vault-eso (ESO + ClusterSecretStore) → default (app chart).
# Run from repo root with KUBECONFIG pointing at the cluster (e.g. k3s). For remote clusters, run
# this on the server after git pull, or use a kubeconfig that targets the cluster.
# One-time: after first Vault install, run ./k8s/vault-bootstrap.sh to init/unseal and configure auth.
# Note: If grafana.provisioningHostPath is set, copy grafana/provisioning to that path on the host.
# set -e

# SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
# cd "$REPO_ROOT"

# # Optional: load NAMESPACE from .env
# [[ -f "$REPO_ROOT/.env" ]] && set -a && source "$REPO_ROOT/.env" && set +a
# NAMESPACE="${NAMESPACE:-default}"
# HELM_RELEASE_DEFAULT="default"
# HELM_RELEASE_VAULT="vault"
# HELM_RELEASE_VAULT_ESO="vault-eso"

# # Optional values override for the app chart (e.g. externalSecrets.enabled: true)
# VALUES_DEFAULT="$REPO_ROOT/helm/default/values.yaml"
# VALUES_PROD="$REPO_ROOT/helm/default/values-production.yaml"
# EXTRA_VALUES=()
# EXTRA_VALUES+=(-f "$VALUES_DEFAULT")
# if [[ -f "$VALUES_PROD" ]]; then
#   EXTRA_VALUES+=(-f "$VALUES_PROD")
# fi

# echo "📦 Ensuring Helm repos..."
# helm repo add hashicorp https://helm.releases.hashicorp.com 2>/dev/null || true
# helm repo add external-secrets https://charts.external-secrets.io 2>/dev/null || true
# helm repo update

# echo "🔐 Installing Vault (hashicorp/vault) in namespace vault..."
# helm upgrade --install "$HELM_RELEASE_VAULT" hashicorp/vault -n vault --create-namespace \
#   -f "$REPO_ROOT/helm/vault/vault-values.yaml"

# echo "⏳ Waiting for Vault pod to be ready..."
# kubectl -n vault wait --for=condition=ready pod -l app.kubernetes.io/name=vault --timeout=120s || true

# echo "📋 Installing External Secrets Operator + ClusterSecretStore (vault-eso chart) in namespace vault..."
# helm dependency update "$REPO_ROOT/helm/vault"
# helm upgrade --install "$HELM_RELEASE_VAULT_ESO" "$REPO_ROOT/helm/vault" -n vault \
#   -f "$REPO_ROOT/helm/vault/values.yaml"

# echo "🚀 Installing app chart ($HELM_RELEASE_DEFAULT) in namespace $NAMESPACE..."
# helm dependency update "$REPO_ROOT/helm/default" 2>/dev/null || true
# helm upgrade --install "$HELM_RELEASE_DEFAULT" "$REPO_ROOT/helm/default" -n "$NAMESPACE" --create-namespace \
#   "${EXTRA_VALUES[@]}" \
#   --take-ownership

# echo "✅ Deploy completed."
# echo ""
# echo "If this is the first time, run once: ./k8s/vault-bootstrap.sh"
# echo "Then store secrets in Vault (e.g. secret/default/app-secrets, secret/default/registry) and ESO will sync them."
