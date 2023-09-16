const Player = require('../src/player');
const ComputerPlayer = require('../src/computerPlayer');
const GameBoard = require('../src/GameBoard');

document.addEventListener('DOMContentLoaded', () => {
    const playerBoardElement = document.getElementById('player-board');
    const computerBoardElement = document.getElementById('computer-board');
    const messageElement = document.getElementById('message');
    const startGameButton = document.getElementById('start-game');
    const takeTurnButton = document.getElementById('take-turn');

    const player = new Player('Player 1');
    const computerPlayer = new ComputerPlayer();

    function renderGameBoards(playerBoard, enemyBoard) {
    
        // Clear the boards
        playerBoardElement.innerHTML = '';
        computerBoardElement.innerHTML = '';
    
        // Render player's game board
        renderBoard(playerBoard, playerBoardElement);
    
        // Render enemy's game board
        renderBoard(enemyBoard, computerBoardElement);
    }
    
    function renderBoard(board, containerElement) {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-x', x); // Agregar el atributo data-x
                cell.setAttribute('data-y', y); // Agregar el atributo data-y
    
                // Check the cell value
                const cellValue = board[x][y];
                if (cellValue === 'S') {
                    cell.classList.add('ship'); // Add class to display ships
                } else if (cellValue === 'o') {
                    cell.classList.add('miss'); // Add class to display misses
                } else if (cellValue === 'X') {
                    cell.classList.add('hit'); // Add class to display hits
                }
                
                cell.addEventListener('click', () => {
                    if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
                        const clickedX = parseInt(cell.getAttribute('data-x')); // Obtener data-x
                        const clickedY = parseInt(cell.getAttribute('data-y')); // Obtener data-y
                
                        // Luego, puedes realizar el ataque llamando al método 'attack' del jugador
                        const attackResult = player.attack(computerPlayer.gameBoard, clickedX, clickedY);
                
                        // Verificar el resultado del ataque y mostrar un mensaje al jugador
                        if (!attackResult) {
                            messageElement.textContent = '¡Has fallado!';
                        } else {
                            messageElement.textContent = '¡Has acertado un barco!';
                        }
                
                        // Renderizar los tableros actualizados después del ataque
                        renderGameBoards(player.gameBoard.grid, computerPlayer.gameBoard.grid);
                    }
                });
                            


    
                containerElement.appendChild(cell);
            }
        }
    }


    

    startGameButton.addEventListener('click', () => {
        player.gameBoard.populateComputerBoard();
        computerPlayer.gameBoard.populateComputerBoard();
        renderGameBoards(player.gameBoard.grid, computerPlayer.gameBoard.grid);

    });

    

});