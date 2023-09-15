const Ship = require('../src/ship');

describe('Ship', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(3);
    });

    test('should have a length of 3', () => {
        expect(ship.length).toBe(3);
    });

    test('should have 0 hits', () => {
        expect(ship.hits).toBe(0);
    });

    test('it should not be sunk yet', () => {
        expect(ship.isSunk).toBe(false);
    });

    test('it should register hit correctly', () => {
        ship.hit();
        expect(ship.hits).toBe(1);

        ship.hit();
        expect(ship.hits).toBe(2);

        ship.hit();
        expect(ship.hits).toBe(3);
    });

    test('should be sunk', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk).toBe(true);
    });

    test('it should not register a after being sunk', () => { 
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.hits).toBe(3);
    });

});