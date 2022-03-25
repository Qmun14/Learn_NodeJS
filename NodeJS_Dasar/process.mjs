import proses, { exit } from 'process';

proses.addListener("exit", (exitCode) => {
    console.log(`Node Exit with exit code ${exitCode}`);
})

console.log(proses.version);
console.table(proses.argv);
console.table(proses.report);
console.table(proses.env);

console.log(exit(1));

console.log("Say Good bye .. gak kebaca karena udh exit process");