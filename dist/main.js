/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/GameBoard.js":
/*!**************************!*\
  !*** ./src/GameBoard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\r\n\r\nclass GameBoard {\r\n    constructor() {\r\n        this.grid = Array.from({ length: 10 }, () =>\r\n        Array(10).fill(null)\r\n        );\r\n        this.hits = 0;\r\n        this.misses = 0;\r\n        this.ships = Ship.createDefaultShip();\r\n    }\r\n\r\n    placeShips(ship, x, y, horizontal) {\r\n        if (x < 0 || x >= 10 || y < 0 || y >= 10) {\r\n            return false;\r\n        }\r\n    \r\n        if (horizontal) {\r\n            if (x + ship.length > 10) {\r\n                return false;\r\n            }\r\n    \r\n            for (let i = 0; i < ship.length; i++) {\r\n                if (this.grid[x + i][y] !== null) {\r\n                    return false;\r\n                }\r\n            }\r\n    \r\n            for (let i = 0; i < ship.length; i++) {\r\n                this.grid[x + i][y] = 'S'; // Set cell to 'S' to represent a ship\r\n            }\r\n        } else {\r\n            if (y + ship.length > 10) {\r\n                return false;\r\n            }\r\n    \r\n            for (let i = 0; i < ship.length; i++) {\r\n                if (this.grid[x][y + i] !== null) {\r\n                    return false;\r\n                }\r\n            }\r\n    \r\n            for (let i = 0; i < ship.length; i++) {\r\n                this.grid[x][y + i] = 'S'; // Set cell to 'S' to represent a ship\r\n            }\r\n        }\r\n    \r\n        return true;\r\n    }\r\n\r\n\r\n    receiveAttack(x, y) {\r\n        if (x < 0 || x >= 10 || y < 0 || y >= 10) {\r\n            return null;\r\n        }\r\n    \r\n        const cell = this.grid[x][y];\r\n    \r\n        if (!cell) {\r\n            if (cell === 'o' || cell === 'X') {\r\n                return ; // Ya atacado previamente\r\n            }\r\n    \r\n            this.grid[x][y] = 'o'; // Establecer la celda como 'o' para representar un fallo\r\n            this.misses++;\r\n            return false; // Fallo\r\n        } else if (cell === 'X') {\r\n            return 'Already Hit'; // Barco ya golpeado\r\n        } else if (cell === 'S') {\r\n            this.grid[x][y] = 'X'; // Establecer la celda como 'x' para representar un acierto\r\n            this.hits++; // Incrementar aciertos en el tablero\r\n            return true; // Acierto\r\n        }\r\n    }\r\n\r\n    populateComputerBoard() {\r\n        for (const ship of this.ships) {\r\n            let placed = false;\r\n            while (!placed) {\r\n                const x = Math.floor(Math.random() * 10);\r\n                const y = Math.floor(Math.random() * 10);\r\n                const horizontal = Math.random() < 0.5; \r\n\r\n                if (this.placeShips(ship, x, y, horizontal)) {\r\n                    placed = true;\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    isGameOver() {\r\n        // Check if all ships have been sunk on the game board\r\n        for (let x = 0; x < this.grid.length; x++) {\r\n            for (let y = 0; y < this.grid[x].length; y++) {\r\n                if (this.grid[x][y] === 'S') {\r\n                    return false; // At least one ship is still on the game board\r\n                }\r\n            }\r\n        }\r\n\r\n        return true; // All ships have been sunk\r\n    }\r\n\r\n}\r\n\r\nmodule.exports = GameBoard;\n\n//# sourceURL=webpack://battleship/./src/GameBoard.js?");

/***/ }),

/***/ "./src/computerPlayer.js":
/*!*******************************!*\
  !*** ./src/computerPlayer.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameBoard = __webpack_require__(/*! ./GameBoard */ \"./src/GameBoard.js\");\r\n\r\nclass ComputerPlayer {\r\n    constructor() {\r\n        this.gameBoard = new GameBoard();\r\n        this.attackedCoordinates = new Set();\r\n    }\r\n\r\n    attack(enemyBoard) {\r\n        let x, y;\r\n\r\n        do {\r\n            x = Math.floor(Math.random() * 10);\r\n            y = Math.floor(Math.random() * 10);\r\n        } while (this.attackedCoordinates.has(`${x}-${y}`));\r\n\r\n        this.attackedCoordinates.add(`${x}-${y}`);\r\n        return enemyBoard.receiveAttack(x, y);\r\n    }\r\n}\r\n\r\nmodule.exports = ComputerPlayer;\r\n\n\n//# sourceURL=webpack://battleship/./src/computerPlayer.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\nconst ComputerPlayer = __webpack_require__(/*! ./computerPlayer */ \"./src/computerPlayer.js\");\r\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    const playerBoardElement = document.getElementById('player-board');\r\n    const computerBoardElement = document.getElementById('computer-board');\r\n    const messageElement = document.getElementById('message');\r\n    const startGameButton = document.getElementById('start-game');\r\n    const controlsElement = document.getElementById('controls');\r\n\r\n    let player;\r\n    let computerPlayer;\r\n\r\n    function resetGame() {\r\n        player = new Player('Player 1');\r\n        computerPlayer = new ComputerPlayer();\r\n        initializeBoards();\r\n        renderGameBoards();\r\n\r\n        startGameButton.innerHTML = '';\r\n        startGameButton.textContent = 'Start new game';\r\n    }\r\n    function initializeBoards() {\r\n        player.gameBoard.populateComputerBoard();\r\n        computerPlayer.gameBoard.populateComputerBoard();\r\n    }\r\n\r\n    function renderGameBoards() {\r\n\r\n        renderBoard(player.gameBoard.grid, playerBoardElement, player.playerName);\r\n        renderBoard(computerPlayer.gameBoard.grid, computerBoardElement, 'computer');\r\n\r\n    }\r\n\r\n    function renderBoard(board, containerElement, playerName) {\r\n        containerElement.innerHTML = '';\r\n\r\n        for (let x = 0; x < 10; x++) {\r\n            for (let y = 0; y < 10; y++) {\r\n                const cell = document.createElement('div');\r\n                cell.classList.add('cell');\r\n                cell.dataset.x = x;\r\n                cell.dataset.y = y;\r\n\r\n                const cellValue = board[x][y];\r\n                cell.textContent = cellValue;\r\n\r\n                if(cellValue === 'S') {\r\n                    cell.classList.add('ship');\r\n                }\r\n                if(cellValue === 'X') {\r\n                    cell.classList.add('hit');\r\n                }\r\n                if(cellValue === 'o') {\r\n                    cell.classList.add('miss');\r\n                }\r\n                \r\n                if (cellValue === 'S' && playerName === 'computer') {\r\n                    cell.classList.remove('ship');\r\n                    cell.textContent = ''; // Hide computer's ships\r\n                }\r\n\r\n                cell.addEventListener('click', () => {\r\n                    if (containerElement === playerBoardElement) {\r\n                        // if the player clicks on their own board\r\n                        return;\r\n                    }\r\n\r\n                    if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) { // Check if the cell has already been attacked\r\n                        const clickedX = parseInt(cell.dataset.x);\r\n                        const clickedY = parseInt(cell.dataset.y);\r\n                \r\n                        const attackResult = player.attack(computerPlayer.gameBoard, clickedX, clickedY);\r\n                \r\n                        if (attackResult) {\r\n                            computerPlayer.attack(player.gameBoard);\r\n                        } else {\r\n                            computerPlayer.attack(player.gameBoard);\r\n                        }\r\n                \r\n                        if (player.gameBoard.isGameOver() || computerPlayer.gameBoard.isGameOver()) {\r\n                            endGame();\r\n                        }\r\n                \r\n                        renderGameBoards();\r\n                    }\r\n                });\r\n\r\n\r\n\r\n                containerElement.appendChild(cell);\r\n            }\r\n        }\r\n    }\r\n\r\n    function endGame() {\r\n        if(player.gameBoard.isGameOver()) {\r\n            messageElement.textContent = 'Perdiste!';\r\n        } else {\r\n            messageElement.textContent = '¡Ganaste!';\r\n        }\r\n        \r\n        controlsElement.classList.remove('hide');\r\n        \r\n        const cells = document.querySelectorAll('.cell');\r\n        cells.forEach(cell => {\r\n            cell.removeEventListener('click', handleClick);\r\n        });\r\n\r\n\r\n        resetGame();\r\n    }\r\n\r\n\r\n    startGameButton.addEventListener('click', () => {\r\n\r\n        resetGame();\r\n        \r\n\r\n        messageElement.textContent = '';\r\n\r\n        messageElement.classList.remove('hide');\r\n        \r\n        controlsElement.classList.add('hide');\r\n\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameBoard = __webpack_require__(/*! ./GameBoard */ \"./src/GameBoard.js\");\r\n\r\nclass Player {\r\n    constructor(name) {\r\n        this.playerName = name;\r\n        this.gameBoard = new GameBoard();\r\n    }\r\n\r\n    attack(enemyBoard, x, y) {\r\n        return enemyBoard.receiveAttack(x, y);\r\n    }\r\n}\r\n\r\nmodule.exports = Player;\r\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("class Ship {\r\n    constructor(length) {\r\n    this.length = length;\r\n    this.hits = 0;\r\n    this.sunk = false;\r\n    }\r\n\r\n    hit() {\r\n        if(this.hits < this.length) {\r\n            this.hits++;\r\n            if (this.hits === this.length) {\r\n                this.sunk = true;\r\n            }\r\n        }\r\n    }\r\n\r\n    isSunk() {\r\n        return this.hits === this.length;\r\n    }\r\n\r\n}\r\n\r\nfunction createDefaultShip() {\r\n    const shipLength = [5, 4, 3, 3, 2];\r\n    const ships = [];\r\n\r\n    for (const length of shipLength) {\r\n        const ship = new Ship(length);\r\n        ships.push(ship);\r\n    }\r\n\r\n    return ships;\r\n}\r\n\r\n\r\nmodule.exports = {\r\n    Ship,\r\n    createDefaultShip\r\n};\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;