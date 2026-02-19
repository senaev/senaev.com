Install k3s without kubectl

Copy k8s config from `rancher` folder to local one

```shell
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown ubuntu:ubuntu ~/.kube/config
```

- Install kubectl

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

# add secret to k8s
kubectl -n senaev-com create secret docker-registry ycr-pull \
  --docker-server=cr.yandex \
  --docker-username=json_key \
  --docker-password="$(cat key.json | tr -d '\n')" \
  --docker-email=unused@example.com
```
