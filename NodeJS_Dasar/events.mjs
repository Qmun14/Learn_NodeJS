import {EventEmitter} from 'events';

const emmiter = new EventEmitter();

emmiter.addListener("hello", (name) => {
    console.log(`Hello ${name}`);
})
emmiter.addListener("hello", (name) => {
    console.log(`Halo ${name}`);
})

emmiter.emit("hello", ("Ma'mun"));