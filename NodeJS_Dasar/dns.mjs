import dns from "dns/promises";

const address = await dns.lookup("qmun14.github.io");

console.log(address.address);
console.log(address.family);