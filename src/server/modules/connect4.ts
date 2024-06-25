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

    // Deleted since I don't want to update it 
    // prettyprint(): string {
    //     return  "     |     |     \n" +
    //             "  " + this.squares[0] + "  |  " + this.squares[1] + "  |  " + this.squares[2] + "  \n" +
    //             "_____|_____|_____\n" +
    //             "     |     |     \n" +
    //             "  " + this.squares[3] + "  |  " + this.squares[4] + "  |  " + this.squares[5] + "  \n" +
    //             "_____|_____|_____\n" +
    //             "     |     |     \n" +
    //             "  " + this.squares[6] + "  |  " + this.squares[7] + "  |  " + this.squares[8] + "  \n" +
    //             "     |     |     \n"
    // }

    // Check if the player went in an empty square
    isLegal(location: number): boolean {
        return this.squares[location] == Player.EMPTY;
    }

    // TODO check win function
    // Return one of the result enum possibilities
    checkWin(): Result {
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

    makeMove(location: number): boolean {
        if (this.isLegal(location)) {
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

export class Game {
    board: Board;
    player1: string;
    player2: string;

    constructor(p1: string, p2: string) {
        this.board = new Board();
        this.player1 = p1;
        this.player2 = p2;
    }

    gameMove(location: number): string {
        if (this.board.makeMove(location)) {
            return this.board.checkWin().toString();
        }
        return "illegal-move";
    }
}