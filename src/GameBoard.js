const { createDefaultShip } = require('./ship');

class GameBoard {
    constructor() {
        this.grid = Array.from({ length: 10 }, () =>
        Array(10).fill(null)
        );
        this.hits = 0;
        this.misses = 0;
        this.ships = [];
    }

    placeShips(ship, x, y, horizontal) {
        if (x < 0 || x >= 10 || y < 0 || y >= 10) {
            return false;
        }
    
        if (horizontal) {
            if (x + ship.length > 10) {
                return false;
            }
    
            for (let i = 0; i < ship.length; i++) {
                if (this.grid[x + i][y] !== null) {
                    return false;
                }
            }
    
            for (let i = 0; i < ship.length; i++) {
                this.grid[x + i][y] = 'S'; // Set cell to 'S' to represent a ship
            }
        } else {
            if (y + ship.length > 10) {
                return false;
            }
    
            for (let i = 0; i < ship.length; i++) {
                if (this.grid[x][y + i] !== null) {
                    return false;
                }
            }
    
            for (let i = 0; i < ship.length; i++) {
                this.grid[x][y + i] = 'S'; // Set cell to 'S' to represent a ship
            }
        }
    
        return true;
    }


    receiveAttack(x, y) {
        if (x < 0 || x >= 10 || y < 0 || y >= 10) {
            return null;
        }
    
        const cell = this.grid[x][y];
    
        if (!cell) {
            if (cell === 'o' || cell === 'X') {
                return 'Already Attacked'; // Ya atacado previamente
            }
    
            this.grid[x][y] = 'o'; // Establecer la celda como 'o' para representar un fallo
            this.misses++;
            return false; // Fallo
        } else if (cell === 'X') {
            return 'Already Hit'; // Barco ya golpeado
        } else if (cell === 'S') {
            this.grid[x][y] = 'X'; // Establecer la celda como 'x' para representar un acierto
            this.hits++; // Incrementar aciertos en el tablero
            return true; // Acierto
        }
    }

    populateComputerBoard() {
        const defaultShips = createDefaultShip(); 

        for (const ship of defaultShips) {
            let placed = false;
            while (!placed) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const horizontal = Math.random() < 0.5; 

                if (this.placeShips(ship, x, y, horizontal)) {
                    placed = true;
                }
            }
        }
    }

    isGameOver() {
        for (const ship of this.ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }

        return true;
    }

}

module.exports = GameBoard;