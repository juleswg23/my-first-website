const url = window.location.origin;
let socket = io.connect(url);

const Player = {
    X: "X",
    Y: "Y",
    EMPTY: " "
}

const Result = {
    X: "X",
    Y: "Y",
    TIE: "Tie",
    NO_RESULT: "No Result"
}

class Board {
    constructor() {
        this.squares = new Array(9).fill(Player.EMPTY);
        this.turn = Player.X
    }

    static possibleWins = [[0, 1, 2],
                           [3, 4, 5],
                           [6, 7, 8],
                           [0, 3, 6],
                           [1, 4, 7],
                           [2, 5, 8],
                           [0, 4, 8],
                           [2, 4, 6]]

    prettyprint() {
        return  "     |     |     \n" +
                "  " + this.squares[0] + "  |  " + this.squares[1] + "  |  " + this.squares[2] + "  \n" +
                "_____|_____|_____\n" +
                "     |     |     \n" +
                "  " + this.squares[3] + "  |  " + this.squares[4] + "  |  " + this.squares[5] + "  \n" +
                "_____|_____|_____\n" +
                "     |     |     \n" +
                "  " + this.squares[6] + "  |  " + this.squares[7] + "  |  " + this.squares[8] + "  \n" +
                "     |     |     \n"
    }

    // Check if the player went in an empty square
    isLegal(location) {
        return this.squares[location] == Player.EMPTY
    }

    // Return one of the result enum possibilities
    checkWin() {
        for (let arr in this.possibleWins) {
            if (this.squares[arr[0]] == this.squares[arr[1]] && 
                this.squares[arr[0]] == this.squares[arr[2]] &&
                this.squares[arr[0]] != Player.EMPTY) {
                    return this.squares[arr[0]]
                }
        }

        if (this.squares.includes(Player.EMPTY)) {
            return Result.NO_RESULT
        }
        return Result.TIE
    }

    makeMove(location) {
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


// Entry point
(function() {
    board = new Board()

    readline.question(`What's your name?`, name => {
        console.log(`Hi ${name}!`);
        readline.close();
      });
    
    console.log("hii");

    // while (board.checkWin() == Result.NO_RESULT) {
    //     console.log(board.prettyprint());
        
    // }

})();