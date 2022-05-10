class TTT {
    gameField = [];

    constructor() {
        this.initGameField();
    }

    /**
     * Init game field array
     */
    initGameField() {
        this.gameField = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }

    /**
     * Check if the given field is empty.
     *
     * @param {int} x
     * @param {int} y
     * @returns {boolean}
     */
    isPossibleTurn(x, y) {
        return this.gameField[x][y] === null;
    }

    /**
     * Set players turn if possible.
     *
     * @param {int} x
     * @param {int} y
     * @param {int} player
     * @returns {boolean}
     */
    turn(x, y, player) {
        if(!this.isPossibleTurn(x, y)) {
            return false;
        }
        this.gameField[x][y] = player;
        return true;
    }

    /**
     * Returns an array with field coordinates of the winning line, if any player has won.
     * Otherwise we return an empty array.
     *
     * @returns {array}
     */
    getWinningLine() {
        if(this.gameField[1][1] !== null) {
            if(this.gameField[0][0] === this.gameField[1][1] && this.gameField[2][2] === this.gameField[1][1]) {
                return [[0,0], [1,1], [2,2]];
            }

            if(this.gameField[0][2] === this.gameField[1][1] && this.gameField[2][0] === this.gameField[1][1]) {
                return [[0,2], [1,1], [2,0]];
            }
        }

        for(let i = 0; i < 3; i++) {
            if(this.gameField[i][0] !== null && this.gameField[i][1] !== null && this.gameField[i][2] !== null) {
                if(this.gameField[i][0] === this.gameField[i][1] && this.gameField[i][2] === this.gameField[i][1]) {
                    return [[i,0], [i,1], [i,2]];
                }
            }

            if(this.gameField[0][i] !== null && this.gameField[1][i] !== null && this.gameField[2][i] !== null) {
                if (this.gameField[0][i] === this.gameField[1][i] && this.gameField[2][i] === this.gameField[1][i]) {
                    return [[0, i], [1, i], [2, i]];
                }
            }
        }
        return [];
    }
}