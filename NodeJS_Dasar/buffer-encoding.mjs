const buffer = Buffer.from("Ma'mun Ramdhan Van Der Werff", "utf-8");

console.log(buffer.toString());
console.log(buffer.toString("hex"));
console.log(buffer.toString("base64"));
console.log(buffer.toString("base64url"));
console.log(buffer.toString("binary"));

const bufferBase64 = Buffer.from("TWEnbXVuIFJhbWRoYW4gVmFuIERlciBXZXJmZg==", "base64");
console.log(bufferBase64.toString("utf-8"));
