class Game {

    activePlayer = 0;
    winningFields = [];
    players = [];
    ttt;
    ai;

    constructor() {
        this.ttt = new TTT();
        this.ai = new AI();
        this.players.push(new Player('Player 1', 0, false));
        this.players.push(new Player('Player 2', 1, false));
        for(let x = 0; x < 3; x++) {
            for(let y = 0; y < 3; y++) {
                this.setField(x, y, '', -1);
            }
        }
    }

    /**
     * Let active player take his turn.
     *
     * @param {int} x
     * @param {int} y
     */
    turn(x, y) {
        if(this.ttt.turn(x, y, this.activePlayer)) {
            this.setField(x, y, this.getFormattedPlayerSign(this.activePlayer), this.activePlayer);
            this.switchPlayer(false);
            if(this.isGameOver()) {
                this.showWinningLine();
                this.showEndCard();
                return;
            }
            this.computerTurn();
        }
    }

    /**
     * Let computer take his turn, if we play against the computer.
     */
    computerTurn() {
        if(this.players[this.activePlayer].isComputer) {
            let move = this.ai.getMove(this, this.activePlayer);
            this.turn(move[0], move[1]);
        }
    }

    /**
     * Replace the content of the given field.
     *
     * @param {int} x
     * @param {int} y
     * @param {string} content
     * @param {int} player
     */
    setField(x, y, content, player) {
        let cell = document.getElementById(x.toString()).getElementsByTagName('div')[y];
        cell.innerHTML = content;
        switch (player) {
            case 0:
                cell.classList.add('playerX');
                break;
            case 1:
                cell.classList.add('playerO');
                break;
            default:
                cell.className = '';
        }
    }

    /**
     * Gets formatted player sign to display in document.
     *
     * @param {int} index
     * @returns {string}
     */
    getFormattedPlayerSign(playerIndex) {
        switch (this.players[playerIndex].sign) {
            case 0:
                return 'X';
            case 1:
                return 'O';
        }
    }

    /**
     * Switch and display current player in ui.
     */
    switchPlayer(reset) {
        this.activePlayer = (this.activePlayer + 1) % this.players.length;
        if(reset) {
            document.getElementById('playerX').classList.remove('player-inactive');
            document.getElementById('playerO').classList.add('player-inactive');
        }
        else {
            document.getElementById('playerX').classList.toggle('player-inactive');
            document.getElementById('playerO').classList.toggle('player-inactive');
        }
    }

    /**
     * Check if game is over.
     *
     * @returns {boolean}
     */
    isGameOver() {
        let winner = this.ttt.getWinningLine();
        if(winner.length === 3) {
            this.winningFields = winner;
            return true;
        }
        for(let x = 0; x < 3; x++) {
            for(let y = 0; y < 3; y++) {
                if(this.ttt.gameField[x][y] === null) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Highlight fields of the winning line on game end.
     */
    showWinningLine() {
        if(this.winningFields.length === 3) {
            document.getElementById(this.winningFields[0][0].toString()).getElementsByTagName('div')[this.winningFields[0][1]].classList.add('blinking-text');
            document.getElementById(this.winningFields[1][0].toString()).getElementsByTagName('div')[this.winningFields[1][1]].classList.add('blinking-text');
            document.getElementById(this.winningFields[2][0].toString()).getElementsByTagName('div')[this.winningFields[2][1]].classList.add('blinking-text');
        }
    }

    /**
     * Show game end card.
     */
    showEndCard() {
        toggleModal('main-modal');
        document.getElementById('modal-header').innerText = "Game Over";
        document.getElementById('modal-body').innerHTML = this.winningFields.length === 3 ?
            `<p>Player <b>${this.players[this.ttt.gameField[this.winningFields[0][0]][this.winningFields[0][1]]].name}<b> has won!</p>`
            :
            `<p>The Game ends because there are no more possible moves left.</p>`;
        document.getElementById('modal-footer').innerHTML = `
            <button class="btn btn-primary" onclick="createGame(true, -1);">Play against AI</button>
            <button class="btn btn-secondary" onclick="createGame(false, -1);">Play against friend</button>
        `;
    }
}