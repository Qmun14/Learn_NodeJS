import https from 'https';

const endpoint = "https://hookb.in/BYPmQaKNZ0UkN6yyPbXq";
const request = https.request(endpoint, {
    method: "POST",
    headers: {
        "Content-Type" : "application.json",
        "Accept" : "application.json"
    }
}, (response) =>{
    response.addListener("data", (data) => {
        console.log(`Receive data : ${data.toString()}`)
    });
});

const body = JSON.stringify({
    FirstName : "Ma'mun",
    lastName : "Ramdhan"
});

request.write(body);
request.end();