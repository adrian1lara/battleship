
const GameBoard = require('./GameBoard');

class Player {
    constructor(name) {
        this.playerName = name;
        this.gameBoard = new GameBoard();
    }
    get name() {
        return this.playerName;
    }

    attack(enemyBoard, x, y) {
        return enemyBoard.receiveAttack(x, y);
    }

    
}



module.exports = Player
