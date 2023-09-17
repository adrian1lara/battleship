const GameBoard = require('./GameBoard');

class Player {
    constructor(name) {
        this.playerName = name;
        this.gameBoard = new GameBoard();
    }

    attack(enemyBoard, x, y) {
        return enemyBoard.receiveAttack(x, y);
    }
}

module.exports = Player;
