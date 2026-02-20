# senaev-com Helm chart

Umbrella chart for the senaev.com k3s stack: Traefik, Next.js, Grafana, WebDAV, Xray, VictoriaMetrics, node-exporter.

## Install / upgrade

From the repo root, deploy via the script (uploads chart and runs Helm on the server):

```bash
./k8s/deploy-k8s.sh
```

Or on a host that has `kubectl` and `helm` and the chart available:

```bash
kubectl create namespace senaev-com  # if not exists
helm upgrade --install senaev-com ./helm/senaev-com -n senaev-com -f ./helm/senaev-com/values.yaml
```

## Secrets

Create the `app-secrets` secret in the same namespace before or after install (e.g. with `deploy-secrets.sh`). Required keys: `WEBDAV_PASSWORD`, `GRAFANA_ADMIN_USER`, `GRAFANA_ADMIN_PASSWORD`, `GRAFANA_ROOT_URL`.

## Customization

- **values.yaml** – default values (namespace, images, ingress hosts, paths).
- Override with `-f values-prod.yaml` or `--set key=val` when running `helm upgrade --install`.

## Disabling components

Set `*.enabled: false` in values for any component (e.g. `traefik.enabled: false`, `testEcho.enabled: false`). Disabled components are not rendered.
