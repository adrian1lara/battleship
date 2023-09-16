class Ship {
    constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    }

    hit() {
        if(this.hits < this.length) {
            this.hits++;
            if (this.hits === this.length) {
                this.sunk = true;
            }
        }
    }

    isSunk() {
        return this.hits === this.sunk;
    }

}

function createDefaultShip() {
    const shipLength = [5, 4, 3, 3, 2];
    const ships = [];

    for (const length of shipLength) {
        const ship = new Ship(length);
        ships.push(ship);
    }

    return ships;
}


module.exports = {
    Ship,
    createDefaultShip
};