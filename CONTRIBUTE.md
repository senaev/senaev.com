## Docker

You cat only run `npm run docker` do build the container and update it on the remote server

Start docker (or alternative)

```bash
colima start
```

Login with OAuth (on localhost and on the server)
https://cloud.yandex.ru/docs/container-registry/operations/authentication#user-oauth

```bash
docker login --username oauth --password <token> cr.yandex
```

Build image

```bash
docker build --platform linux/arm64 -t senaev.com .
docker tag senaev.com cr.yandex/crpnkh51pjbnliqhuqml/senaev.com:latest
docker push cr.yandex/crpnkh51pjbnliqhuqml/senaev.com:latest
```

## Remote server

```bash
ssh senaev@51.250.86.35
```
