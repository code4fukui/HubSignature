# HubSignature

- secure request with a common secret
- for GitHub WebHook

## Usage

```js
import { HubSignature } from "./HubSignature.js";

const secret = "It's a Secret to Everybody";
const payload = "Hello, World!";

const hubs = await HubSignature.create(secret);

const header = await hubs.sign(payload);
console.log(header);

const verify = await hubs.verify(header, payload);
console.log(verify);
```

## Lib

- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Base16](https://github.com/code4fukui/Base16)
