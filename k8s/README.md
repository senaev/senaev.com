Install k3s without built-in Traefik (so the Traefik from k8s/ can bind 80/443):

```shell
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik" sh -
```

Copy k8s config from `rancher` folder to local one
(to provide access to the k8s context)

```shell
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown ubuntu:ubuntu ~/.kube/config
```

Install kubectl https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

Set `kubectl` default namespace

```
kubectl config set-context --current --namespace=senaev-com
```

Install `helm`

https://helm.sh/docs/intro/install/#from-apt-debianubuntu

- Add secrets to access docker registry

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

# create file with secret key
yc iam key create \
  --service-account-id "$SA_ID" \
  --output key.json


# add this secret to service account
kubectl patch serviceaccount default \
  -n senaev-com \
  -p '{"imagePullSecrets":[{"name":"ycr-pull"}]}'
```
