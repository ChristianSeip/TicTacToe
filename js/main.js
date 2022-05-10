let GAME;

function init() {
    showIntro();
}

/**
 * Create a new game
 *
 * @param {boolean} singlePlayer
 * @param {int} playerIndex
 */
function createGame(singlePlayer, playerIndex) {
    toggleModal('main-modal');
    GAME = new Game();
    if(singlePlayer) {
        document.getElementById('player1').innerText = 'Computer';
        GAME.players[1].setName('Computer');
        GAME.players[1].setIsComputer(true);
    }
    initPlayers(singlePlayer, playerIndex);
}

/**
 * Init players with name
 *
 * @param {boolean} singlePlayer
 * @param {int} playerIndex
 */
function initPlayers(singlePlayer, playerIndex) {
    if(playerIndex > -1) {
        toggleModal('main-modal');
        let name = document.getElementById('player-name');
        if(name.value.length > 0 && name.value !== ' ') {
            let id = 'player' + (playerIndex);
            document.getElementById(id).innerText = name.value;
            GAME.players[playerIndex].setName(name.value);
        }
        if(playerIndex === 0 && singlePlayer) {
            return;
        }
    }
    if(playerIndex < 1) {
        getPlayerName(singlePlayer, ++playerIndex);
    }
}

/**
 * Ask for player name
 *
 * @param {boolean} singlePlayer
 * @param {int} playerIndex
 */
function getPlayerName(singlePlayer, playerIndex) {
    toggleModal('main-modal');
    document.getElementById('modal-header').innerText = `Add Player (Player ${playerIndex + 1})`;
    document.getElementById('modal-body').innerHTML = `
    <label>Your Name</label><input id="player-name" type="text">
    `;
    document.getElementById('modal-footer').innerHTML = `
        <button class="btn btn-primary" onclick="initPlayers(${singlePlayer}, ${playerIndex});">Save</button>`;
}

/**
 * Show intro card as modal window.
 */
function showIntro() {
    toggleModal('main-modal');
    document.getElementById('modal-header').innerText = "Welcome to Tic Tac Toe!";
    document.getElementById('modal-body').innerHTML = "The game is played on a 3x3 grid.<br><br>" +
        "The first player who gets 3 marks in a row (up, down, across, or diagonally) wins the game.<br><br>" +
        "The game is over, when all 9 squares are marked.";
    document.getElementById('modal-footer').innerHTML = `
        <button class="btn btn-primary" onclick="createGame(true, -1);">Play against AI</button>
        <button class="btn btn-secondary" onclick="createGame(false, -1);">Play against friend</button>`;
}

/**
 * Toogle modal display status.
 *
 * @param {string} id
 */
function toggleModal(id) {
    document.getElementById(id).classList.toggle('hidden');
}