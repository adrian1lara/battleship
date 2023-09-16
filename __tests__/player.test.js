const Player = require('../src/player')
const ComputerPlayer = require('../src/computerPlayer')

// Mock the receiveAttack method for the GameBoard
class MockGameBoard {
    constructor() {
        this.grid = Array.from({ length: 10 }, () =>
            Array(10).fill(null)
        );
    }

    receiveAttack(x, y) {
        this.grid[x][y] = 'X'; // Mark the grid to simulate an attack
    }
}

describe('Player and ComputerPlayer', () => {
    test('Player can attack', () => {
       const player = new Player("Player 1");
       const enemyBoard = new MockGameBoard();
       
       player.attack(enemyBoard, 2, 3);
       expect(enemyBoard.grid[2][3]).toBe('X');
    });

    test('ComputerPlayer can attack', () => {
        const computerPlayer = new ComputerPlayer();
        const enemyBoard = new MockGameBoard();
        computerPlayer.attack(enemyBoard);
        expect(enemyBoard.grid.some(row => row.includes('X'))).toBe(true);
    })
});
