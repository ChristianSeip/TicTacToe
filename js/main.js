let game = {
    "activePlayer": "o",
    "winner": [],
};

/**
 * Represents the game field as 2d array.
 */
let fields = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

/**
 * Reset the current game.
 */
function resetGame() {
    for(let x = 0; x < 3; x++) {
        for(let y = 0; y < 3; y++) {
            fields[x][y] = null;
            replaceFieldContent(x, y, "");
        }
    }
    game.activePlayer = "o";
    game.winner = [];

    switchPlayer();
}

/**
 * Set the sign of the current player, if field is empty.
 *
 * @param {int} x
 * @param {int} y
 */
function setPlayerSign(x, y) {
    if(!isEmptyField(x, y)) return;

    fields[x][y] = game.activePlayer;
    replaceFieldContent(x, y, game.activePlayer);

    if(isGameOver()) {
        showEndCard();
        return;
    }

    switchPlayer();
}

/**
 * Switch and display current player in ui
 */
function switchPlayer() {
    game.activePlayer = game.activePlayer === "x" ? "o" : "x";
    document.getElementById('playerX').classList.toggle('player-inactive');
    document.getElementById('playerO').classList.toggle('player-inactive');
}

/**
 * Replace the content of the given field.
 *
 * @param {int} x
 * @param {int} y
 * @param {string} content
 */
function replaceFieldContent(x, y, content) {
    document.getElementById(x.toString()).getElementsByTagName('td')[y].innerText = content;
}

/**
 * Check if the given field is empty.
 *
 * @param {int} x
 * @param {int} y
 * @returns {boolean}
 */
function isEmptyField(x, y) {
    return fields[x][y] === null;
}

/**
 * Returns an array with field coordinates of the winning line, if any player has won.
 * Otherwise we return an empty array.
 *
 * @returns {number[][]|(number|number)[][]|*[]}
 */
function getWinningLine() {
    if(fields[1][1] !== null) {
        if(fields[0][0] === fields[1][1] && fields[2][2] === fields[1][1]) {
            return [[0,0], [1,1], [2,2]];
        }

        if(fields[0][2] === fields[1][1] && fields[2][0] === fields[1][1]) {
            return [[0,2], [1,1], [2,0]];
        }
    }

    for(let i = 0; i < 3; i++) {
        if(fields[i][0] !== null && fields[i][1] !== null && fields[i][2] !== null) {
            if(fields[i][0] === fields[i][1] && fields[i][2] === fields[i][1]) {
                return [[i,0], [i,1], [i,2]];
            }
        }

        if(fields[0][i] !== null && fields[1][i] !== null && fields[2][i] !== null) {
            if (fields[0][i] === fields[1][i] && fields[2][i] === fields[1][i]) {
                return [[0, i], [1, i], [2, i]];
            }
        }
    }

    return [];
}

/**
 * Check if game is over.
 *
 * @returns {boolean}
 */
function isGameOver() {
    let winner = getWinningLine();
    if(winner.length === 3) {
        game.winner = winner;
        return true;
    }

    for(let x = 0; x < 3; x++) {
        for(let y = 0; y < 3; y++) {
            if(fields[x][y] === null) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Show game end card
 */
function showEndCard() {
    toggleModal();
    document.getElementById('modal-header').innerText = "Game Over";
    document.getElementById('modal-content').innerHTML = game.winner.length === 3 ?
        `<p>Player <b>${fields[game.winner[0][0]][game.winner[0][1]].toUpperCase()}<b> has won!</p>` : `<p>The Game ends because there are no more possible moves left.</p>`;
    document.getElementById('modal-footer').innerHTML = `<button class="btn btn-primary" onclick="newGame();">New Game</button>`;
}

/**
 * Toogle modal display status
 */
function toggleModal() {
    document.getElementById('modal').classList.toggle('hide');
}

function showWelcomeCard() {
    toggleModal();
    document.getElementById('modal-header').innerText = "Welcome to Tic Tac Toe!";
    document.getElementById('modal-content').innerHTML = "The game is played on a 3x3 grid.<br><br>" +
        "The first player who gets 3 marks in a row (up, down, across, or diagonally) wins the game.<br><br>" +
        "The game is over, when all 9 squares are marked.";
    document.getElementById('modal-footer').innerHTML = `<button class="btn btn-primary" onclick="newGame();">Start Game</button>`;
}

/**
 * Start new Game
 */
function newGame() {
    resetGame();
    toggleModal();
}