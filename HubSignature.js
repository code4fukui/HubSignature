import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";

// base https://docs.github.com/ja/webhooks/using-webhooks/validating-webhook-deliveries

const encoder = new TextEncoder();
const algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };

export class HubSignature {
  constructor(key) {
    this.key = key;
  }
  static async create(secret) {
    const keyBytes = encoder.encode(secret);
    const extractable = false;
    const key = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      algorithm,
      extractable,
      ["sign", "verify"],
    );
    return new HubSignature(key);
  }

  async sign(payload) {
    if (typeof payload == "string") {
      payload = encoder.encode(payload);
    }
    const sign = await crypto.subtle.sign(
      algorithm.name,
      this.key,
      payload,
    );
    return "sha256=" + Base16.encode(new Uint8Array(sign));
  }
  async verify(header, payload) {
    if (typeof payload == "string") {
      payload = encoder.encode(payload);
    }

    const parts = header.split("="); // sha256=
    const sigHex = parts[1];

    const sigBytes = Base16.decode(sigHex);
    const equal = await crypto.subtle.verify(
      algorithm.name,
      this.key,
      sigBytes,
      payload,
    );
    return equal;
  }
}
