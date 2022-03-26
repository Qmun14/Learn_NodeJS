import util from 'util';    

const firstName = "Ma'mun";
const lastName = "Ramdhan";

console.log(`Hello ${firstName} ${lastName}`);
console.log(util.format("Hello %s %s", firstName, lastName));

const person = {
    firstName : "Ma'mun",
    lastName : "Ramdhan"
}

console.log(JSON.stringify(person));
console.log(util.format("%j", person));
