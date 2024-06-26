// const url = window.location.origin;
// let socket = io.connect(url);

enum Player {
    X = "red",
    Y = "blue",
    EMPTY = " "
}

export enum Result {
    X = "x-wins",
    Y = "y-wins",
    TIE = "tie",
    NO_RESULT = "no-result"
}

/**
 * Board Storage: starting at the bottom left and going up
 * 5 11 17 23 29 35 41
 * 4 10 16 22 28 34 40
 * 3 9  15 21 27 33 39
 * 2 8  14 20 26 32 38
 * 1 7  13 19 25 31 37
 * 0 6  12 18 24 30 36
 */ 


class Board {
    squares: Array<Player>;
    turn: Player;

    constructor() {
        this.squares = new Array(42).fill(Player.EMPTY);
        this.turn = Player.X;
    }

    // TODO make this for connect4
    static possibleWins: number[][] = 
                       [[0, 1, 2],
                        [3, 4, 5],
                        [6, 7, 8],
                        [0, 3, 6],
                        [1, 4, 7],
                        [2, 5, 8],
                        [0, 4, 8],
                        [2, 4, 6]]

    // Check if the player went in an empty square
    isLegal(location: number): boolean {
        // Check if space is empty and if space is in bottom row or space is empty
        return (this.squares[location] === Player.EMPTY) &&
         (location % 6 === 0 || this.squares[location-1] !== Player.EMPTY);
    }

    // TODO check win function
    // Return one of the result enum possibilities
    checkWin(location: number): Result {
        // Find row and column of location of move
        let row = location % 6;
        let col = Math.floor(location/6);

        if (row >= 3 &&
            this.squares[location] == this.squares[location-1] && 
            this.squares[location] == this.squares[location-2] &&
            this.squares[location] == this.squares[location-3] &&
            this.squares[location] != Player.EMPTY) {
                return this.squares[location] == Player.X ? Result.X : Result.Y;
            }
        
        // Use these to keep track as we look for 4 in a row
        let total: number = 0; // Count how many in a row we have
        let curSquare: Player = Player.EMPTY;
        let prevSquare: Player = Player.EMPTY;

        // For loop checks for row win
        for (let i = 0; i < 7; i++) {
            curSquare = this.squares[row + i*6]
            // If we match the previous square, add to total
            if (curSquare === prevSquare) {
                total++;
            }
            
            // if the current square is empty, reset total
            if (curSquare !== Player.EMPTY) {
                total = 0;
            } 

            // If we have three pairs in a row, return winner
            if (total === 3) {
                return curSquare == Player.X ? Result.X : Result.Y 
            }
            //update prevSquare for next iteration of loop
            prevSquare = curSquare;
        }

        prevSquare = Player.EMPTY;
        // For loop checks diagonal increasing win
        for (let lo = Math.min(row, col); row-lo < 6 && col-lo < 7; lo--) {
            curSquare = this.squares[(row-lo) + (col-lo)*6]
            // If we match the previous square, add to total
            if (curSquare === prevSquare) {
                total++;
            }
            
            // if the current square is empty, reset total
            if (curSquare !== Player.EMPTY) {
                total = 0;
            } 

            // If we have three pairs in a row, return winner
            if (total === 3) {
                console.log("Increasing diagonal win"); // TODO remove
                return curSquare == Player.X ? Result.X : Result.Y 
            }
            //update prevSquare for next iteration of loop
            prevSquare = curSquare;
        }

        prevSquare = Player.EMPTY;
        // For loop checks diagonal *decreasing* win
        for (let lo = Math.min(5-row, col); row+lo >= 0 && col-lo < 7; lo--) {
            curSquare = this.squares[(row+lo) + (col-lo)*6]
            // If we match the previous square, add to total
            if (curSquare === prevSquare) {
                total++;
            }
            
            // if the current square is empty, reset total
            if (curSquare !== Player.EMPTY) {
                total = 0;
            } 

            // If we have three pairs in a row, return winner
            if (total === 3) {
                console.log("Increasing diagonal win"); // TODO remove
                return curSquare == Player.X ? Result.X : Result.Y 
            }
            //update prevSquare for next iteration of loop
            prevSquare = curSquare;
        }

        if (this.squares.includes(Player.EMPTY)) {
            return Result.NO_RESULT;
        }
        return Result.TIE;
    }

    makeMove(location: number): boolean {
        if (this.isLegal(location)) {
            console.log("was legal move");
            // update tile
            this.squares[location] = this.turn;
            
            // flip player turn
            if (this.turn == Player.X) {
                this.turn = Player.Y;
            } else {
                this.turn = Player.X;
            }
            
            //return true since the move was made
            return true
        }
        // return false since the move wasn't made
        return false
    }
}

export class ConnectFourGame {
    board: Board;
    player1: string;
    player2: string;

    constructor(p1: string, p2: string) {
        this.board = new Board();
        this.player1 = p1;
        this.player2 = p2;
    }

    gameMove(location: number) : string {
        if (this.board.makeMove(location)) {
            return this.board.checkWin(location).toString();
        }
        console.log("returning illegal move");
        return "illegal-move";
    }
}