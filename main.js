let express = require("express");
let app = express();

let port = process.env.PORT || 8081;

app.get('/', function(req, res) {
    res.send("Hello from Express");
})

var server = app.listen(port, function () {
    let host = server.address().address
    let port = server.address().port

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