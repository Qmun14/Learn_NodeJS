function samplePromise(){
    return Promise.resolve("Ma'mun");
}

async function run() {
    const name = await samplePromise();
    console.log(name);
}

run();


