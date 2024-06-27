
//const url = window.location.origin;

import io from "socket.io-client";
const socket = io();

let myTurn: boolean = true;
let symbol: "X" | "O";

function buildPage() {
    for (let row = 5; row >= 0; row--) {
        for (let col = 0; col < 7; col++) {
            let elem = '<button id= "' + (row + col*6) + '"></button>';
            $(elem).appendTo(".board");
        }
    }
    const container = $(".board");

    const containerWidth = Number(container.width());
    const marginSize = 3;
    const cellWidth = containerWidth / 7 - marginSize*3;

    $(".board button").css({
        width: cellWidth,
        height: cellWidth,
        margin: marginSize,
        border: "1px solid black",        
        boxSizing: "border-box",
        float: "left"
    });
}

function renderTurnMessage() {
    if (!myTurn) { // If not player's turn disable the board
        $("#message").text("Your opponent's turn");
        $(".board button").prop("disabled", true);
    } else { // Enable it otherwise
        $("#message").text("Your turn.");
        $(".board button").removeAttr("disabled");
    }
}

function makeMove(e: JQuery.TriggeredEvent) {
    if (!myTurn) {
        return; // Shouldn't happen since the board is disabled
    }

    if ($(e.target).text().length) {
        return; // If cell is already checked
    }

    socket.emit("make.move", { // Valid move (on client side) -> emit to server
        symbol: symbol,
        position: $(e.target).attr("id")
    });
}

// Bind event on players move
socket.on("move.made", function(data: {[key: string] : "X" | "O" | string}) {
    $("#" + data.position).text(data.symbol); // Render move

    // If the symbol of the last move was the same as the current player
    // means that now is opponent's turn
    myTurn = data.symbol !== symbol;

    if (data.result === "no-result") { // If game isn't over show who's turn is this
        renderTurnMessage();
    } else { // Else show win/lose message
        console.log("This player's symbol: " + symbol + " winning result: " + data.result);
        if (data.result === "TIE") {
            $("#message").text("Nobody won.");
        } else if (data.result === symbol) {
            $("#message").text("You won!");
        } else {
            $("#message").text("You lost.");
        }

        $(".board button").prop("disabled", true); // Disable board
    }
});


// Bind event for game begin
socket.on("game.begin", function(data: {[key: string] : "X" | "O"}) {
    symbol = data.symbol; // The server is assigning the symbol
    myTurn = symbol === "X"; // 'X' starts first
    renderTurnMessage();
});

// Bind on event for opponent leaving the game
socket.on("opponent.left", function() {
    $("#message").text("Your opponent left the game.");
    $(".board button").attr("disabled", ""); //OPTION 1
});

// Binding buttons on the board
$(function() {
    buildPage();

    $(".board button").prop("disabled", true); // Disable board at the beginning
    $(".board> button").on("click", makeMove);
});