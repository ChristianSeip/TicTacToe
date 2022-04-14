let game = {
    "activePlayer": "x",
    "winner": [],
};

let fields = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function resetGame() {
    for(let x = 0; x < 3; x++) {
        for(let y = 0; y < 3; y++) {
            fields[x][y] = null;
            replaceFieldContent(x, y, "");
        }
    }
    game.activePlayer = null;
}

function setPlayerSign(x, y) {
    if(!isEmptyField(x, y)) {
        alert("Das Feld ist nicht leer");
        return;
    }

    fields[x][y] = game.activePlayer;
    replaceFieldContent(x, y, game.activePlayer);
    game.activePlayer = game.activePlayer === "x" ? "y" : "x";
    let winner = getWinningLine();
    if(winner.length === 3) {
        alert(`${winner[0][0]}:${winner[0][1]}, ${winner[1][0]}:${winner[1][1]}, ${winner[2][0]}:${winner[2][1]}`)
    }
}

function replaceFieldContent(x, y, content) {
    document.getElementById(x).getElementsByTagName('td')[y].innerText = content;
}

function isEmptyField(x, y) {
    return fields[x][y] === null;
}

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