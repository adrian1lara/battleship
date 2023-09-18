
const ComputerPlayer = require('./computerPlayer');
const Player = require('./player');


document.addEventListener('DOMContentLoaded', () => {
    const playerBoardElement = document.getElementById('player-board');
    const computerBoardElement = document.getElementById('computer-board');
    const messageElement = document.getElementById('message');
    const startGameButton = document.getElementById('start-game');
    const controlsElement = document.getElementById('controls');

    let player;
    let computerPlayer;

    function resetGame() {
        player = new Player('Player 1');
        computerPlayer = new ComputerPlayer();
        initializeBoards();
        renderGameBoards();

        startGameButton.innerHTML = '';
        startGameButton.textContent = 'Start new game';
    }
    function initializeBoards() {
        player.gameBoard.populateComputerBoard();
        computerPlayer.gameBoard.populateComputerBoard();
    }

    function renderGameBoards() {

        renderBoard(player.gameBoard.grid, playerBoardElement, player.playerName);
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

                if(cellValue === 'S') {
                    cell.classList.add('ship');
                }
                if(cellValue === 'X') {
                    cell.classList.add('hit');
                }
                if(cellValue === 'o') {
                    cell.classList.add('miss');
                }
                
                if (cellValue === 'S' && playerName === 'computer') {
                    cell.classList.remove('ship');
                    cell.textContent = ''; // Hide computer's ships
                }

                cell.addEventListener('click', () => {
                    if (containerElement === playerBoardElement) {
                        // if the player clicks on their own board
                        return;
                    }

                    if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) { // Check if the cell has already been attacked
                        const clickedX = parseInt(cell.dataset.x);
                        const clickedY = parseInt(cell.dataset.y);
                
                        const attackResult = player.attack(computerPlayer.gameBoard, clickedX, clickedY);
                
                        if (attackResult) {
                            computerPlayer.attack(player.gameBoard);
                        } else {
                            computerPlayer.attack(player.gameBoard);
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
        if(player.gameBoard.isGameOver()) {
            messageElement.textContent = 'Perdiste!';
        } else {
            messageElement.textContent = '¡Ganaste!';
        }
        
        controlsElement.classList.remove('hide');
        
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });


        resetGame();
    }


    startGameButton.addEventListener('click', () => {

        resetGame();
        

        messageElement.textContent = '';
        
        controlsElement.classList.add('hide');

    });
});
