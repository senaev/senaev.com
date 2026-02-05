# Xray — VLESS + Reality

Сервер настроен на протокол **VLESS** с **Reality**: трафик выглядит как обычный TLS до google.com, что помогает обходить блокировки.

## Секреты в конфиге

В `xray-config.json` нужно подставить свои значения (⚠️ делать это на сервере, не коммить их в репозиторий):

- `{USER_UUID}` — идентификатор пользователя, по которому авторизуется клиентское приложение
- `{REALITY_PRIVATE_KEY}` — приватный ключ пары для Reality (для сервера)
- `{REALITY_PUBLIC_KEY}` - публичный ключ пары для Reality (для приложения)

## Настройка сервера

Выполнить команду `./xray/xray-deploy.sh`, чтобы залить шаблон конфига на сервер

Запустить докер контейнер с Xray

Зайти на сервер в папку `/home/ubuntu/docker-compose`

Сгенерировать `{USER_UUID}` командой `uuidgen`, вывод будет типа такого:
`ec4249b8-12aa-4ca3-a4cb-693dc48147be`

Сгенерировать `{REALITY_PRIVATE_KEY}` и `{REALITY_PUBLIC_KEY}` ключ командой `docker-compose run --rm xray xray x25519`, вывод будет типа такого:

```
PrivateKey: SP0lzPHP7KjtLxbm5M4tnV7Ml1PYIkqQIjp1Vjt_b34
Password: pccxOUh_Xo4smRMsRKrg3pXcRmM5U8ozGzaeKGAkN3A
Hash32: OsNIAHa3wxgtWyroFpq6W0SoCSDYT1Z--UrNox6I2SA
```

Редактируем конфиг командой `nano xray-config.json`:

- На место `{USER_UUID}` вставляем UUID из выхлопа первой команды (`uuidgen`)
- На место `{REALITY_PRIVATE_KEY}` вставляем `PrivateKey` из выхлопа второй команды
- Запомнить `Password` (`{REALITY_PUBLIC_KEY}`), он потребуется на клиенте
- Сохраняем файл и перезапускаем контейнер `docker-compose restart xray`

## Настройск клиента

Установить Happ https://www.happ.su/main

Заполнить макросы и скопировать ссылку:

```
vless://{USER_UUID}:8443?type=tcp&security=reality&encryption=none&flow=xtls-rprx-vision&sni=www.google.com&fp=chrome&pbk={REALITY_PUBLIC_KEY}&sid=0123456789abcdef#senaev.com
```

В приложении `Add new` → `Import from clipboard`
