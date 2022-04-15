/**
 * Move active player with the best move option.
 */
function move() {
    let move = getBestMove(game.activePlayer);
    setPlayerSign(move[0], move[1]);
}

/**
 * Get the field with the best winning chance.
 *
 * @param {string} pov
 * @returns {array}
 */
function getBestMove(pov) {
    let enemy = pov === "x" ? "o" : "x";
    let move = [checkCenter(pov), checkDiagonals(pov), checkDiagonals(enemy), getBestPossibleMove(pov), getBestPossibleMove(enemy)];

    for(let i = 0; i < move.length; i++) {
        if(move[i].length !== 0) {
            return move[i];
        }
    }
}

/**
 * Check if center field is a possible move.
 *
 * @param {string} pov
 * @returns {array}
 */
function checkCenter(pov) {
    return fields[1][1] === null ? [1, 1] : [];
}

/**
 * Check if possible to use diagonals.
 *
 * @param {string} pov
 * @returns {array}
 */
function checkDiagonals(pov) {
    if(fields[1][1] === pov) {
        for(let i = 0; i < 3; i+=2) {
            let b = i === 0 ? 2 : 0;

            if((fields[i][0] === null || fields[i][0] === pov) && (fields[b][2] === null || fields[b][2] === pov)) {
                if(fields[i][0] === null) {
                    return [i,0];
                }
                return [b,2];
            }
        }
    }

    return [];
}

/**
 * Get the best possible horizontal or vertical move.
 *
 * @param {string} pov
 * @returns {array}
 */
function getBestPossibleMove(pov) {
    let move = [], possibleX = [], possibleY = [];

    for(let i = 0; i < 3; i++) {
        let xCount = [0,0,0], yCount = [0,0,0];   // [free, own, enemy]

        for(let j = 0; j < 3; j++) {
            let index = getIndexCounter(pov, fields[i][j]);
            xCount[index]++;
            if(index === 0) possibleX.push([i, j]);

            index = getIndexCounter(pov, fields[j][i]);
            yCount[index]++;
            if(index === 0) possibleY.push([j, i]);
        }

        if((xCount[1] === 2 && xCount[0] === 1) || (xCount[2] === 2 && xCount[0] === 1)) return possibleX[possibleX.length - 1];
        if((yCount[1] === 2 && yCount[0] === 1) || (yCount[2] === 2 && yCount[0] === 1)) return possibleY[possibleY.length - 1];
        if(xCount[1] === 1 && xCount[0] === 2) move = possibleX[possibleX.length - 1];
        if(yCount[1] === 1 && yCount[0] === 2) move = possibleY[possibleY.length - 1];
    }

    if(move.length !== 0) return move;
    if(possibleX.length !== 0) return possibleX[possibleX.length - 1];
    if(possibleY.length !== 0) return possibleY[possibleY.length - 1];
}

/**
 * Returns the index to count marker.
 *
 * @param {string} pov
 * @param {string} marker
 * @returns {int}
 */
function getIndexCounter(pov, marker) {
    let index;

    switch (marker) {
        case null:
            index = 0;
            break;
        case pov:
            index = 1;
            break;
        default:
            index = 2;
            break;
    }

    return index;
}