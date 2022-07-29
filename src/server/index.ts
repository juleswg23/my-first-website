import { Game } from "./modules/tictactoe.js";

// const http = require("http")
// const Express = require("express");
// const socketIo = require("socket.io");
// const path = require('path'); //mine
// const fs = require("fs");

import Express from "express";
import http from 'http';
import fs from "fs";
import { Socket } from "socket.io";

const app: Express.Application = Express();

const port = process.env.PORT || 8081;
const server = new http.Server(app);

server.listen(port, () => {
    console.log("Example app listening at port: %s", port);
});

//app.use('/static', Express.static(path.join(__dirname, "/../client/")))
app.use(Express.static(__dirname + "/../client/"));
app.use(Express.static(__dirname + "/../node_modules/"));


app.get("/", (req: Express.Request, res: Express.Response) => {
    console.log("Sent to %s", req.headers["user-agent"]);
    //res.sendFile(path.join(__dirname + "/../client/index.html"));
    const stream = fs.createReadStream(__dirname + "/../client/html/index.html");
    stream.pipe(res);
});

type PlayerInfo = {
    opponent: string | null;
    symbol: "X" | "O";
    socket: Socket
}

const io = require("socket.io")(server);
let clients: {[socketID: string]: Socket} = {};
let players: {[socketID: string] : PlayerInfo } = {}; // opponent: socket.id of the opponent, symbol = "X" | "O", socket: player's socket
let games: {[gameID: string]: Game }  = {};
let unmatched: string | null;

io.on("connection", function(socket: Socket) {
    let id: string = socket.id;

    console.log("New client connected. ID: ", socket.id);
    clients[socket.id] = socket;

    socket.on("disconnect", () => {// Bind event for that socket (player)
        console.log("Client disconnected. ID: ", socket.id);
        delete clients[socket.id];
        socket.broadcast.emit("clientdisconnect", id);
    });

    join(socket); // Fill 'players' data structure

    const oppSocket : Socket | null = opponentOf(socket);

    if (oppSocket) { // If the current player has an opponent the game can begin
        socket.emit("game.begin", { // Send the game.begin event to the player
            symbol: players[socket.id].symbol
        });

        oppSocket.emit("game.begin", { // Send the game.begin event to the opponent
            symbol: players[oppSocket.id].symbol 
        });

        newGame(socket, oppSocket);
        
    }


    // Event for when any player makes a move
    socket.on("make.move", function(data): void {
        const opp : Socket | null = opponentOf(socket);

        if (!opp) {
            // This shouldn't be possible since if a player doens't have an opponent the game board is disabled
            return;
        }


        //validation
        let gameID = getGameID(socket, opp);
        let game = games[gameID];
        game.gameMove(data.position);
        console.log("Move attempted by player %s at pos %s", socket.id, data.position);


        socket.emit("move.made", data); // Emit for the player who made the move
        opp.emit("move.made", data); // Emit for the opponent
    });

    // Event to inform player that the opponent left
    socket.on("disconnect", function() {
        const opp : Socket | null = opponentOf(socket)
        if (opp) {
            opp.emit("opponent.left");
        }
    });
});


function join(socket: Socket) {
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

function opponentOf(socket: Socket): Socket | null {
    const opp : string | null = players[socket.id].opponent;
    if (opp) {
        return players[opp].socket;
    }
    return null;
}

function newGame(socket: Socket, opponent: Socket): void {
    let gameID = getGameID(socket, opponent);
    games[gameID] = new Game(socket.id, opponent.id);
}

function getGameID(socket: Socket, opponent: Socket): string {
    return [socket.id, opponent.id].sort().join("");
}