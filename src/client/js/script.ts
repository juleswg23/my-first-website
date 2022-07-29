
const url = window.location.origin;

//import { Socket } from "socket.io";
import io from "socket.io-client";
// edits here!!

let socket = io();

let myTurn: boolean = true;
let symbol: string;

function getBoardState() {
    let obj: {[key: string] : string } = {};

  /* We are creating an object where each attribute corresponds
   to the name of a cell (r0c0, r0c1, ..., r2c2) and its value is
   'X', 'O' or '' (empty).
  */
    $(".board button").each(function() {
        let id: string | undefined = $(this).attr("id");
        if (id) {
            obj[id] = $(this).text() || "";
        }
    });

    return obj;
}

function isGameOver() {
    let state = getBoardState();
    let matches = ["XXX", "OOO"]; // This are the string we will be looking for to declare the match over

    // We are creating a string for each possible winning combination of the cells
    let rows = [
        state.r0c0 + state.r0c1 + state.r0c2, // 1st line
        state.r1c0 + state.r1c1 + state.r1c2, // 2nd line
        state.r2c0 + state.r2c1 + state.r2c2, // 3rd line
        state.r0c0 + state.r1c0 + state.r2c0, // 1st column
        state.r0c1 + state.r1c1 + state.r2c1, // 2nd column
        state.r0c2 + state.r1c2 + state.r2c2, // 3rd column
        state.r0c0 + state.r1c1 + state.r2c2, // Primary diagonal
        state.r0c2 + state.r1c1 + state.r2c0  // Secondary diagonal
    ];

    // Loop through all the rows looking for a match
    for (let elem of rows) {
        if (elem === matches[0] || elem === matches[1]) {
            return true;
        }
    }

    return false;
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
socket.on("move.made", function(data: {[key: string] : "X" | "O"}) {
    $("#" + data.position).text(data.symbol); // Render move

    // If the symbol of the last move was the same as the current player
    // means that now is opponent's turn
    myTurn = data.symbol !== symbol;

    if (!isGameOver()) { // If game isn't over show who's turn is this
        renderTurnMessage();
    } else { // Else show win/lose message
        if (myTurn) {
            $("#message").text("You lost.");
        } else {
            $("#message").text("You won!");
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
    $(".board button").prop("disabled", true); // Disable board at the beginning
    $(".board> button").on("click", makeMove);
});