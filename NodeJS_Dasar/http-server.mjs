import http from 'http';

const server = http.createServer((request, response) => {
    console.log(request.method);
    console.log(request.url);

    if (request.method === "POST") {
        request.addListener("data", (data) =>{
            response.setHeader("Content-Type", "application.json");
            response.write(data);
            response.end()
        });
    } else {
        if (request.url === "/mamun") {
            response.write("Hello Ma'mun");
        } else {
            response.write("Hello Http Server");
        }
        response.end();
    }
        
});

server.listen(3000);