import { Game } from "./modules/tictactoe.js";

const http = require("http")
const express = require("express");
const socketIo = require("socket.io");
const app = express();
//const path = require('path'); //mine

const fs = require("fs");

const port = process.env.PORT || 8081;
const server = http.Server(app);

server.listen(port, () => {
    console.log("Example app listening at port: %s", port);
});

const io = socketIo(server);
const clients = {};

//app.use('/static', express.static(path.join(__dirname, "/../client/")))
app.use(express.static(__dirname + "/../client/"));
app.use(express.static(__dirname + "/../node_modules/"));

//app.set('view engine', 'jade'); // old?

app.get("/", (req, res) => {
    console.log("Sent to %s", req.headers["user-agent"]);
    //res.sendFile(path.join(__dirname + "/../client/index.html"));
    const stream = fs.createReadStream(__dirname + "/../client/index.html");
    stream.pipe(res);
});

let players = {}; // opponent: scoket.id of the opponent, symbol = "X" | "O", socket: player's socket
let games = {};
let unmatched;

io.on("connection", function(socket) {
    let id = socket.id;

    console.log("New client connected. ID: ", socket.id);
    clients[socket.id] = socket;

    socket.on("disconnect", () => {// Bind event for that socket (player)
        console.log("Client disconnected. ID: ", socket.id);
        delete clients[socket.id];
        socket.broadcast.emit("clientdisconnect", id);
    });

    join(socket); // Fill 'players' data structure

    if (opponentOf(socket)) { // If the current player has an opponent the game can begin
        socket.emit("game.begin", { // Send the game.begin event to the player
            symbol: players[socket.id].symbol
        });

        opponentOf(socket).emit("game.begin", { // Send the game.begin event to the opponent
            symbol: players[opponentOf(socket).id].symbol 
        });

        newGame(socket, opponentOf(socket));
        
    }


    // Event for when any player makes a move
    socket.on("make.move", function(data) {
        if (!opponentOf(socket)) {
            // This shouldn't be possible since if a player doens't have an opponent the game board is disabled
            return;
        }

        //validation
        let gameID = getGameID(socket, opponentOf(socket));
        let game = games[gameID];
        game.gameMove(data.position);
        console.log("Move attempted by player %s at pos %s", socket.id, data.position);


        socket.emit("move.made", data); // Emit for the player who made the move
        opponentOf(socket).emit("move.made", data); // Emit for the opponent
    });

    // Event to inform player that the opponent left
    socket.on("disconnect", function() {
        if (opponentOf(socket)) {
        opponentOf(socket).emit("opponent.left");
        }
    });
});


function join(socket) {
    players[socket.id] = {
        opponent: unmatched,
        symbol: "X",
        socket: socket
    };

    // If 'unmatched' is defined it contains the socket.id of the player who was waiting for an opponent
    // then, the current socket is player #2
    if (unmatched) { 
        players[socket.id].symbol = "O";
        players[unmatched].opponent = socket.id;
        
        console.log("%s was matched", socket.id);

        unmatched = null;
    } else { //If 'unmatched' is not define it means the player (current socket) is waiting for an opponent (player #1)
        unmatched = socket.id;
        console.log("%s in queue", socket.id);
    }
}

function opponentOf(socket) {
    if (!players[socket.id].opponent) {
        return;
    }
    return players[players[socket.id].opponent].socket;
}

function newGame(socket, opponent) {
    gameID = getGameID(socket, opponent);
    games[gameID] = new Game(socket.id, opponent.id);
}

function getGameID(socket, opponent) {
    return [socket.id, opponent.id].sort().join("");
}