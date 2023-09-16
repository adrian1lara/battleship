const GameBoard = require('./GameBoard')

class ComputerPlayer {
    constructor() {
        this.gameBoard = new GameBoard();
        this.attackedCoordinates = new Set();
    }

    attack(enemyBoard) {
        return enemyBoard.receiveAttack(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
    }


}

module.exports = ComputerPlayer;