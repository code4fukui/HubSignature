import * as t from "https://deno.land/std/testing/asserts.ts";
import { HubSignature } from "./HubSignature.js";

Deno.test("sample en", async () => {
  // X-Hub-Signature-256: sha256=757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17
  const header = "sha256=757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17";
  const secret = "It's a Secret to Everybody";
  const payload = "Hello, World!";
  const hubs = await HubSignature.create(secret);
  t.assertEquals(await hubs.sign(payload), header);
  t.assert(await hubs.verify(header, payload));
});

Deno.test("sample ja", async () => {
  const header = "sha256=88460a533311fd0e1feb0fcfd0a98c6c543499b7b57676ab76ba725fb3bb2ccc";
  const secret = "誰にも秘密";
  const payload = "Hello, World!";
  //const s = await makeSignature(secret, payload);
  //console.log(s);
  const hubs = await HubSignature.create(secret);
  t.assert(await hubs.verify(header, payload));
});
