const http = require('http');
const {log} = require('./log');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
    log.emit('request', req);
    res.statusCode = 200;
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

