Open-api is really cool and swagger-ui is awesome, but hosting it is a bit tricky as most npm packages don't support all the swagger-ui features such as authentication.

This repo uploads the static files to Cloudflare KV-Storage so that they can be served directly through cloudflare using the [Cloudworker Proxy](https://www.npmjs.com/package/cloudworker-proxy)
