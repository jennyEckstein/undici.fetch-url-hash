# undici.fetch-url-hash

## This repository is used to demonstrate an issue in undici.fetch.

### At the moment undici.fetch does not handle requests where url constains fragment:
> URI = scheme ":" ["//" authority] path ["?" query] ["#" fragment]

### Reproduce
- `npm ci`
- `node index.js`
- Result before the fix:
![Error Screenshot](/ss1.png)

### Fix
- Append `url.hash` [here](https://github.com/nodejs/undici/blob/main/lib/fetch/index.js#L1811)
- Result after the fix:
![Fixed Screenshot](/ss2.png)
