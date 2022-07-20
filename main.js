let port = process.env.PORT || process.argv[2] || 8081;

let http = require("http");

let server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type' : 'text/plain'});

    response.end('Hello world!\n');
});

server.listen(port, function() {
    console.log('app up on port: ' + port);
})