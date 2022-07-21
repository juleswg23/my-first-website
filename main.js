const express = require("express");
const app = express();
const port = process.env.PORT || 8081;

app.get('/', (req, res) => {
    res.send("Hello from Express");
})

const server = app.listen(p, function () {
    let host = server.address().address
    let p = server.address().port

    console.log("Example app listening at http://%s:%s", host, p);
})



// let http = require("http");

// let server = http.createServer(function (request, response) {
//     response.writeHead(200, {'Content-Type' : 'text/plain'});

//     response.end('Hello world! with push\n');
// });

// server.listen(port, function() {
//     console.log('app up on port: ' + port);
// })