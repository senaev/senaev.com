# Plex

Все пароли в TG канале "My plex"

## Plex Server

https://github.com/plexinc/pms-docker

```bash
sudo docker run \
    -d \
    --name plex \
    --network=host \
    -e TZ="Europe/Moscow" \
    -e PLEX_CLAIM=<claim-token-from-here https://www.plex.tv/claim/> \
    -v /mnt/content-storage/plex/config:/config \
    -v /mnt/content-storage/plex/transcode:/transcode \
    -v /mnt/content-storage/media:/data \
    --mount type=bind,source=/mnt/content-storage,target=/mnt/content-storage \
    plexinc/pms-docker
```

## Qbittorrent

https://docs.linuxserver.io/images/docker-qbittorrent/

```bash
sudo docker run -d \
    --name=qbittorrent \
    -e PUID=1000 \
    -e PGID=1000 \
    -e TZ=Etc/UTC \
    -e WEBUI_PORT=8080 \
    -e TORRENTING_PORT=6881 \
    -p 8080:8080 \
    -p 6881:6881 \
    -p 6881:6881/udp \
    -v /mnt/content-storage/qbittorrent/config:/config \
    -v /mnt/content-storage/qbittorrent/downloads:/downloads \
    --restart unless-stopped \
    lscr.io/linuxserver/qbittorrent:latest
```

Если пароль не подходит, чтобы узнать пароль, смотрим логи контейнера
Сначала выясняем идентивикатор контейнера `sudo docker ps`
А потом смотрим логи этого контейнера `sudo docker container logs 7f4981250bd6`

## Filebrowser

https://hub.docker.com/r/hurlenko/filebrowser

```bash
sudo docker run -d \
    --name filebrowser \
    -p 9000:8080 \
    -v /mnt/content-storage:/data \
    -v /mnt/content-storage/filebrowser/config:/config \
    --mount type=bind,source=/mnt/content-storage,target=/mnt/content-storage \
    hurlenko/filebrowser
```
