function samplePromise(){
    return Promise.resolve("Ma'mun");
}


const name = await samplePromise();
console.log(name);

// By Default javaScript Module di level paling atas nya atau global nya sudah merupakan Async Function jadi gak perlu membuat async function lagi di dalam body nya kecuali
// kalo mau buat static function di dalam function itu sendiri yang ada di dalam body modules nya 





