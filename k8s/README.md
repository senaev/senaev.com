## Install tools

Install kubectl https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

Install `helm`

```shell
wget https://get.helm.sh/helm-v4.1.1-linux-amd64.tar.gz
tar -zxvf helm-v4.1.1-linux-amd64.tar.gz
sudo mv linux-amd64/helm /usr/local/bin/helm
sudo chmod +x /usr/local/bin/helm
```

Make symlink to `rancher` folder from a default `kubectl` config folder (for `k9s`)

```shell
mkdir -p ~/.kube
ln -sf /etc/rancher/k3s/k3s.yaml ~/.kube/config
```

Install `k9s`

```shell
curl -LO https://github.com/derailed/k9s/releases/latest/download/k9s_Linux_amd64.tar.gz
tar -xzf k9s_Linux_amd64.tar.gz
sudo mv k9s /usr/local/bin/
sudo chmod +x /usr/local/bin/k9s
```

## Install k3s

Install k3s without built-in Traefik (so the Traefik from k8s/ can bind 80/443):

```shell
curl -sfL https://get.k3s.io | \
  INSTALL_K3S_EXEC="server --disable traefik --write-kubeconfig-mode 644" \
  sh -
```
