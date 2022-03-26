import fs from "fs";
import { Console } from "console";

const file = fs.createWriteStream("application.log");

const log = new Console({
    stdout: file,
    stderr: file,
});


log.info("Hello World!");
log.error("Ma'mun Ramdhan");
const person = {
    firstName: "Ma'mun",
    lastName: "Ramdhan"
}

log.table(person);
log.info("Ini adalah log info dari aplikasi file console.mjs");