import fs from "fs";

const writter = fs.createWriteStream("target.log");

writter.write("Ma'mun\n");
writter.write("Ramdhan\n");
writter.write("Van der Werff\n");

const reader = fs.createReadStream("target.log");
reader.addListener("data", (data) => {
    console.log(data.toString());
});