document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const restBtn = document.getElementById('rest-btn');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleBoxClick(clickedBox, index) {
        if (gameState[index] !== '' || !gameActive) {
            return;
        }
        gameState[index] = currentPlayer;
        clickedBox.textContent = currentPlayer;
        if (checkWin()) {
            alert(`Player ${currentPlayer} has won!`);
            gameActive = false;
            return;
        }
        if (checkDraw()) {
            alert('Game ended in a draw!');
            gameActive = false;
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameState[a] !== '' &&
                gameState[a] === gameState[b] &&
                gameState[b] === gameState[c];
        });
    }

    function checkDraw() {
        return gameState.every(cell => cell !== '');
    }

    function resetGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        boxes.forEach(box => box.textContent = '');
    }

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => handleBoxClick(box, index));
    });

    restBtn.addEventListener('click', resetGame);
});