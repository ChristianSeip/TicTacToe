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
    let move = [checkCenter(), checkDiagonals(pov), checkDiagonals(enemy), getBestPossibleMove(pov)];

    for(let i = 0; i < move.length; i++) {
        if(move[i].length !== 0) {
            return move[i];
        }
    }
}

/**
 * Check if center field is a possible move.
 *
 * @returns {array}
 */
function checkCenter() {
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
    let bestMove = [], possibleMoves = [];

    for(let round = 0; round < 2; round++) {
        for(let i = 0; i < 3; i++) {
            let fieldCount = [0, 0, 0]; // [free, own, enemy]

            for(let j = 0; j < 3; j++) {
                let a = round === 0 ? i : j, b = round === 0 ? j : i;
                let index = getIndexCounter(pov, fields[a][b]);

                if(index === 0) possibleMoves.push([a, b]);
            }

            if((fieldCount[1] === 2 && fieldCount[0] === 1) || (fieldCount[2] === 2 && fieldCount[0] === 1)) return possibleMoves[possibleMoves.length - 1];
            if(fieldCount[1] === 1 && fieldCount[0] === 2 && bestMove.length === 0) bestMove = possibleMoves[possibleMoves.length -1];
        }
    }

    return bestMove.length === 1 ? bestMove : possibleMoves[possibleMoves.length - 1];
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