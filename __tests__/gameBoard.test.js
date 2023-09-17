const GameBoard = require('../src/GameBoard');
const {Ship} = require('../src/ship');

describe('GameBoard', () => {
    let gameBoard;
    let ship;

    beforeEach(() => {
        gameBoard = new GameBoard();
        ship = new Ship(3);
    });

    test('should have a grid', () => {
        expect(gameBoard.grid).toBeDefined();
    });

    test('should have a length of 10', () => {
        expect(gameBoard.grid.length).toBe(10);
    });

    test('should place a ship on the grid', () => {
        // Attempt to place the ship
        const placedSuccessfully = gameBoard.placeShips(ship, 0, 0, true);
        
        expect(placedSuccessfully).toBe(true);
        
        // Attempt to place the ship again in the same location, which should return false
        const secondPlacementAttempt = gameBoard.placeShips(ship, 0, 0, true);
        
        expect(secondPlacementAttempt).toBe(false);
    });

    test('should have 0 hits', () => {
        expect(gameBoard.hits).toBe(0);
    });

    test('should have 0 miss hit', () => {
        expect(gameBoard.misses).toBe(0);
    });

    test('should have 1 miss hit', () => {
        gameBoard.placeShips(ship, 0, 0, true);
        gameBoard.receiveAttack(2, 3);
        expect(gameBoard.misses).toBe(1);
    });

    test('should receive a hit', () => {
        
        gameBoard.placeShips(ship, 0, 0, true);
        gameBoard.receiveAttack(0, 0);
        expect(gameBoard.hits).toBe(1);
        expect(gameBoard.misses).toBe(0);
        expect(ship.isSunk()).toBe(false);
    });



})

describe('GameBoard isGameOver', () => {
    test('should return true when all ships are sunk', () => {
      const gameBoard = new GameBoard();
      
      // Hunde todos los barcos en el tablero
      gameBoard.ships.forEach(ship => {
        for (let i = 0; i < ship.length; i++) {
          ship.hit();
        }
      });
  
      // Llama al método isGameOver() y espera que devuelva true
      expect(gameBoard.isGameOver()).toBe(true);
    });
  });