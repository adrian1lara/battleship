const Player = require('./Player');
const ComputerPlayer = require('./ComputerPlayer');
const Ship = require('./ship');


document.addEventListener('DOMContentLoaded', () => {
    const playerBoardElement = document.getElementById('player-board');
    const computerBoardElement = document.getElementById('computer-board');
    const messageElement = document.getElementById('message');
    const startGameButton = document.getElementById('start-game');

    const player = new Player('Player 1');
    const computerPlayer = new ComputerPlayer();

    function renderGameBoards() {
        renderBoard(player.gameBoard.grid, playerBoardElement, 'player');
        renderBoard(computerPlayer.gameBoard.grid, computerBoardElement, 'computer');
    }

    function renderBoard(board, containerElement, playerName) {
        containerElement.innerHTML = '';

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;

                const cellValue = board[x][y];
                cell.textContent = cellValue;

                if (cellValue === 'S' && playerName === 'computer') {
                    cell.textContent = ''; // Hide computer's ships
                }

                cell.addEventListener('click', () => {
                    if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
                        const clickedX = parseInt(cell.dataset.x);
                        const clickedY = parseInt(cell.dataset.y);

                        const attackResult = player.attack(computerPlayer.gameBoard, clickedX, clickedY);
                        computerPlayer.attack(player.gameBoard);

                        if (attackResult) {
                            messageElement.textContent = '¡Has acertado un barco!';
                        } else {
                            messageElement.textContent = '¡Has fallado!';
                        }

                        if (player.gameBoard.isGameOver() || computerPlayer.gameBoard.isGameOver()) {
                            endGame();
                        }

                        renderGameBoards();
                    }
                });

                containerElement.appendChild(cell);
            }
        }
    }

    function endGame() {
        messageElement.textContent = '¡Fin del juego!';

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });

        startGameButton.classList.remove('hide');
    }

    startGameButton.addEventListener('click', () => {
        player.gameBoard.populateComputerBoard();
        computerPlayer.gameBoard.populateComputerBoard();
        renderGameBoards();

        messageElement.textContent = '';

        startGameButton.classList.add('hide');
    });

    renderGameBoards();
});
