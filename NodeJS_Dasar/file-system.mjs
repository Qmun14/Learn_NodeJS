import fs from "fs/promises";

const buffer = await fs.readFile("file-system.mjs");

console.log(buffer.toString());

await fs.writeFile("temp.txt", "Hello NodeJS");

// edit 

await fs.writeFile("temp.txt", "Hello ini File create From dari Libray file-system");