// const url = window.location.origin;
// let socket = io.connect(url);

enum Player {
    X = "X",
    Y = "Y",
    EMPTY = " "
}

export enum Result {
    X = "x-wins",
    Y = "y-wins",
    TIE = "tie",
    NO_RESULT = "no-result"
}

export class Game {
    //board: Board;
    player1: string;
    player2: string;

    constructor(p1: string, p2: string) {
        //this.board = new Board();
        this.player1 = p1;
        this.player2 = p2;
    }

    gameMove(location: number): string {
        // if (this.board.makeMove(location)) {
        //     return this.board.checkWin(location).toString();
        // }
        return "illegal-move";
    }
}