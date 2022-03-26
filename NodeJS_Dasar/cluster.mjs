import cluster from 'cluster';
import os from 'os';
import process from 'process';
import http from 'http';

if (cluster.isPrimary) {
    console.log(`Primary : ${process.pid}`);
    // Jalankan Worker
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
    cluster.addListener("exit", (worker) => {
        console.log(`Worker-${worker.id} is exit`);
        cluster.fork();
    });
}

if (cluster.isWorker) {
    console.log(`Worker : ${process.pid}`);

    const server = http.createServer((request, response) => {
        response.write(`Response from process ${process.pid}`);
        response.end();
        process.exit();
    });

    server.listen(3000);

}