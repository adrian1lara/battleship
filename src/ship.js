class Ship {
    constructor(length) {
    this.length = length;
    this.hits = 0;
    this.isSunk = false;
    }

    hit() {
        if(this.hits < this.length) {
            this.hits++;
            if (this.hits === this.length) {
                this.isSunk = true;
            }
        }
    }

    isSunk() {
        return this.hits === this.length;
    }

}


module.exports = Ship;