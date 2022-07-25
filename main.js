const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 8081;

//app.set('view engine', 'jade');

app.get('/', (req, res) => {
    res.send("Hello from Express");
})

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

const server = app.listen(port, function () {
    let host = server.address().address;

    console.log("Example app listening at http://%s:%s", host, port);
})



// let http = require("http");

// let server = http.createServer(function (request, response) {
//     response.writeHead(200, {'Content-Type' : 'text/plain'});

//     response.end('Hello world! with push\n');
// });

// server.listen(port, function() {
//     console.log('app up on port: ' + port);
// })