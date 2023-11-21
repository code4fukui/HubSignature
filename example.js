import { HubSignature } from "./HubSignature.js";

const secret = "It's a Secret to Everybody";
const payload = "Hello, World!";

const hubs = await HubSignature.create(secret);

const header = await hubs.sign(payload);
console.log(header);

const verify = await hubs.verify(header, payload);
console.log(verify);
