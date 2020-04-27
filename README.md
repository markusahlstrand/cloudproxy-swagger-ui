Open-api is really cool and swagger-ui is awesome, but hosting it is a bit tricky as most npm packages don't support all the swagger-ui features such as authentication.

This repo uploads the static files to Cloudflare KV-Storage so that they can be served directly through cloudflare using the [Cloudworker Proxy](https://www.npmjs.com/package/cloudworker-proxy)

## Usage

The easiest way to use this repo is probably to fork it and modify the index.html doc in the src folder. Add a .env file in the root with the following values:

- CLOUDFLARE_ACCOUNT_ID
- CLOUDFLARE_ZONE_ID
- CLOUDFLARE_AUTH_KEY
- CLOUDFLARE_AUTH_EMAIL
- KV_NAMESPACE

Run ´npm run upload´ to upload the files to KV-Storage

Add the following rule to the cloudworker proxy:

´´´
const rules = [{
host: "docs.example.:host",
handlerName: "kvStorage",
options: {
kvAccountId: <kvAccountId>,
kvNamespace: <kvNamespace>,
kvAuthEmail: <authEmail>,
kvAuthKey: <authKey>,
kvBasePath: "docs/",
defaultIndexDocument: "index.html",
}];
´´´
