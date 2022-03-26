import net from 'net';

const server = net.createServer((client)=> {
    console.log("Client Connected!");

    client.addListener("data", (data) => {
        console.log(`Received data ${data.toString()}`);
        client.write(`Hello ${data.toString()}\r\n`);
    })
    
});

server.listen(3000, "localhost");