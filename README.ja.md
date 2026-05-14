# HubSignature

GitHub WebHook用の共通シークレットによるセキュアなリクエスト検証。

## 使い方

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

## 依存関係

- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Base16](https://github.com/code4fukui/Base16)

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
