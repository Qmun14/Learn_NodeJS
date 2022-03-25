import os from "os";

console.log(os.platform());
console.log(os.arch());
console.log(os.freemem());
console.log(os.totalmem());
console.log(os.uptime());
console.log(os.userInfo());
console.log(os.homedir());
console.log(os.hostname());

console.table(os.cpus());
console.table(os.networkInterfaces());