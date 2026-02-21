## Install tools

Install kubectl https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

Make symlink to `rancher` folder from a default `kubectl` config folder

```shell
mkdir -p ~/.kube
ln -sf /etc/rancher/k3s/k3s.yaml ~/.kube/config
```

Install `helm`

```shell
wget https://get.helm.sh/helm-v4.1.1-linux-amd64.tar.gz
tar -zxvf helm-v4.1.1-linux-amd64.tar.gz
sudo mv linux-amd64/helm /usr/local/bin/helm
sudo chmod +x /usr/local/bin/helm
```

## Install k3s

Install k3s without built-in Traefik (so the Traefik from k8s/ can bind 80/443):

```shell
curl -sfL https://get.k3s.io | \
  INSTALL_K3S_EXEC="server --disable traefik --write-kubeconfig-mode 644" \
  sh -
```

## Add secrets to access docker registry

```shell
# create service ccount, if not exists
yc iam service-account create --name k3s-service-account

# get service account id
SA_ID="$(yc iam service-account get --name k3s-service-account --format json | jq -r .id)"
echo $SA_ID


# add role to service account
FOLDER_ID="$(yc config get folder-id)"

yc resource-manager folder add-access-binding "$FOLDER_ID" \
  --role container-registry.images.pusher \
  --subject serviceAccount:"$SA_ID"

# create file with secret key in k3s-cluster folder
yc iam key create \
  --service-account-id "$SA_ID" \
  --output yandex-cloud-key.json

# # add this secret to service account
# kubectl patch serviceaccount default \
#   -n default \
#   -p '{"imagePullSecrets":[{"name":"ycr-pull"}]}'
```
