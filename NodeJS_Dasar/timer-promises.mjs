import timers from 'timers/promises';

// console.log(new Date());
// const name = await timers.setTimeout(5000, "Hello Ma'mun");
// console.log(new Date());
// console.log(name);


for await (const startTime of timers.setInterval(1000, "ignored")) {
    console.log(`Start time at ${new Date()}`);
}

