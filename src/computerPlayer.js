const GameBoard = require('./GameBoard')

class ComputerPlayer {
    constructor() {
        this.gameBoard = new GameBoard();
        this.attackedCoordinates = new Set();
    }

    attack(enemyBoard) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while(enemyBoard.grid[x][y] !== null);

        enemyBoard.receiveAttack(x, y);
    }

}

module.exports = ComputerPlayer