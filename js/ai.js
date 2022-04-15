/**
 * Move active player with the best move option
 */
function move() {
    let move = getBestMove(game.activePlayer);
    setPlayerSign(move[0], move[1]);
}

/**
 * Get the field with the best winning chance
 *
 * @param {string} pov
 * @returns {array}
 */
function getBestMove(pov) {
    let checks = ['checkCenter', 'checkDiagonals', 'getBestPossibleMove'];
    let move = [];

    for(let i = 0; i < checks.length; i++) {
        move = window[checks[i]](pov);
        if(move.length !== 0) {
            return move;
        }
    }

    return move;
}

/**
 * Check if center field is a possible move
 *
 * @param {string} pov
 * @returns {array}
 */
function checkCenter(pov) {
    if(fields[1][1] === null) {
        return [1,1];
    }
    return [];
}

/**
 * Check if possible to use diagonals
 *
 * @param {string} pov
 * @returns {array}
 */
function checkDiagonals(pov) {
    if(fields[1][1] === pov) {
        if((fields[0][0] === null || fields[0][0] === pov) && (fields[2][2] === null || fields[2][2] === pov)) {
            if(fields[0][0] === null) {
                return [0,0];
            }
            return [2,2];
        }

        if((fields[2][0] === null || fields[2][0] === pov) && (fields[0][2] === null || fields[0][2] === pov)) {
            if(fields[2][0] === null) {
                return [2,0];
            }
            return [0,2];
        }
    }

    return [];
}

/**
 * Get the best possible horizontal or vertical move
 *
 * @param {string} pov
 * @returns {array}
 */
function getBestPossibleMove(pov) {

    let move = [], possibleX = [], possibleY = [];

    for(let i = 0; i < 3; i++) {

        let xCount = [0,0,0], yCount = [0,0,0];   // [free, own, enemy]

        for(let j = 0; j < 3; j++) {

            switch (fields[i][j]) {
                case null:
                    possibleX.push([i, j]);
                    xCount[0]++;
                    break;
                case pov:
                    xCount[1]++;
                    break;
                default:
                    xCount[2]++;
                    break;
            }

            switch (fields[j][i]) {
                case null:
                    possibleY.push([j, i]);
                    yCount[0]++;
                    break;
                case pov:
                    yCount[1]++;
                    break;
                default:
                    yCount[2]++;
                    break;
            }
        }

        if((xCount[1] === 2 && xCount[0] === 1) || (xCount[2] === 2 && xCount[0] === 1)) {
            return possibleX[possibleX.length - 1];
        }

        if((yCount[1] === 2 && yCount[0] === 1) || (yCount[2] === 2 && yCount[0] === 1)) {
            return possibleY[possibleY.length - 1];
        }

        if(xCount[1] === 1 && xCount[0] === 2) {
            move = possibleX[possibleX.length - 1];
        }

        if(yCount[1] === 1 && yCount[0] === 2) {
            move = possibleY[possibleY.length - 1];
        }

    }

    if(move.length !== 0) {
        return move;
    }

    if(possibleX.length !== 0) {
        return possibleX[possibleX.length - 1];
    }

    if(possibleY.length !== 0) {
        return possibleY[possibleY.length - 1];
    }
}