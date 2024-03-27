let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let mode = '';

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

function startGame(selectedMode) {
    mode = selectedMode;
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('board').style.display = 'grid';
}

function handleClick(index) {
    if (board[index] === '' && mode === 'human') {
        board[index] = currentPlayer;
        render();
        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            reset();
            return;
        }
        if (board.every(cell => cell !== '')) {
            alert("It's a draw!");
            reset();
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    if (mode === 'computer' && currentPlayer === 'X' && board[index] === '') {
        board[index] = currentPlayer;
        render();
        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            reset();
            return;
        }
        if (board.every(cell => cell !== '')) {
            alert("It's a draw!");
            reset();
            return;
        }
        currentPlayer = 'O';
        computerMove();
    }
}

function computerMove() {
    // Simple AI: Selects a random empty cell
    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerIndex = emptyCells[randomIndex];
    board[computerIndex] = currentPlayer;
    render();
    if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
        reset();
        return;
    }
    if (board.every(cell => cell !== '')) {
        alert("It's a draw!");
        reset();
        return;
    }
    currentPlayer = 'X';
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function render() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function reset() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    mode = '';
    document.getElementById('mode-selection').style.display = 'flex';
    document.getElementById('board').style.display = 'none';
    render();
}
