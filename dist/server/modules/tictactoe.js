"use strict";
// const url = window.location.origin;
// let socket = io.connect(url);
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.Result = void 0;
var Player;
(function (Player) {
    Player["X"] = "X";
    Player["Y"] = "Y";
    Player["EMPTY"] = " ";
})(Player || (Player = {}));
var Result;
(function (Result) {
    Result["X"] = "x-wins";
    Result["Y"] = "y-wins";
    Result["TIE"] = "tie";
    Result["NO_RESULT"] = "no-result";
})(Result = exports.Result || (exports.Result = {}));
class Board {
    constructor() {
        this.squares = new Array(9).fill(Player.EMPTY);
        this.turn = Player.X;
    }
    prettyprint() {
        return "     |     |     \n" +
            "  " + this.squares[0] + "  |  " + this.squares[1] + "  |  " + this.squares[2] + "  \n" +
            "_____|_____|_____\n" +
            "     |     |     \n" +
            "  " + this.squares[3] + "  |  " + this.squares[4] + "  |  " + this.squares[5] + "  \n" +
            "_____|_____|_____\n" +
            "     |     |     \n" +
            "  " + this.squares[6] + "  |  " + this.squares[7] + "  |  " + this.squares[8] + "  \n" +
            "     |     |     \n";
    }
    // Check if the player went in an empty square
    isLegal(location) {
        return this.squares[location] == Player.EMPTY;
    }
    // Return one of the result enum possibilities
    checkWin() {
        for (let arr of Board.possibleWins) {
            if (this.squares[arr[0]] == this.squares[arr[1]] &&
                this.squares[arr[0]] == this.squares[arr[2]] &&
                this.squares[arr[0]] != Player.EMPTY) {
                return (this.squares[arr[0]] == Player.X ? Result.X : Result.Y);
            }
        }
        if (this.squares.includes(Player.EMPTY)) {
            return Result.NO_RESULT;
        }
        return Result.TIE;
    }
    makeMove(location) {
        if (this.isLegal(location)) {
            // update tile
            this.squares[location] = this.turn;
            // flip player turn
            if (this.turn == Player.X) {
                this.turn = Player.Y;
            }
            else {
                this.turn = Player.X;
            }
            //return true since the move was made
            return true;
        }
        // return false since the move wasn't made
        return false;
    }
}
Board.possibleWins = [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];
class Game {
    constructor(p1, p2) {
        this.board = new Board();
        this.player1 = p1;
        this.player2 = p2;
    }
    gameMove(location) {
        if (this.board.makeMove(location)) {
            return this.board.checkWin().toString();
        }
        return "illegal-move";
    }
}
exports.Game = Game;
