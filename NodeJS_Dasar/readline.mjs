import readline from 'readline';
import process from 'process';

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

input.question("SIapa nama anda? : ", (name) => {
    console.log(`Halo ${name}`);
    input.close();
});
