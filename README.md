# Andrei Senaev

<img
  src="https://senaev.com/img/avatar-head.webp"
  width="150"
  height="auto"
  style="border-radius:50%"
/>

## Contacts

- Site: [senaev.com](https://senaev.com)
- Telegram: [@senaev](https://senaev.t.me)
- Email: [andrei.senaev@gmail.com](mailto:andrei.senaev@gmail.com)
- Phone: [+7 (982) 699-04-00](tel:+79826990400)

## Resume

- [Short](https://senaev.com/cv/1min)
- [Detailed](https://senaev.com/cv/5min)

## VPN diagnostic response

`GET /api/vpn-test?bytes=16384` returns exactly the requested number of binary bytes
with HTTP 200. `bytes` defaults to 16384 and accepts integers from 1 to 524288
(512 KiB). HEAD returns the same metadata without a body. Invalid, duplicate or
unknown parameters and Range requests return 400. Other methods are unsupported.

The payload is a fixed pseudorandom prefix, independent of website build hashes.
Caching and compression are disabled for this response (`no-store, no-transform`,
`Content-Encoding: identity`). The endpoint does not fetch URLs, read files or
accept delays or unbounded work. The cap limits each response, not aggregate load;
there is no new rate limiter. Keep automated requests infrequent and bounded.

Example manual check (verified TLS, no redirect/retry):

```sh
curl --http1.1 --fail --max-time 8 --max-filesize 524288 \
  --output /tmp/vpn-test.bin --write-out 'status=%{http_code} bytes=%{size_download}\n' \
  'https://senaev.com/api/vpn-test?bytes=65536'
```
