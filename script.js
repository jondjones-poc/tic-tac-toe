const cells = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board');
const messageText = document.querySelector('[data-winning]');
const messageEl = document.getElementById('winning-message');
const restart = document.getElementById('restart');

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2 ,4, 6]
];

const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let circleTurn;

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
}

const swapTurn = () => {
    circleTurn = !circleTurn;
}

const setBoardHoverClass = () => {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);   

    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS); 
    } else {
        board.classList.add(X_CLASS);
    }
}

const checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains((currentClass));
        })
    })
}

const endGame = (draw) => {
    if (draw) {
        messageText.innerText = `Draw :(`;
    } else {
        const message = circleTurn ? "O" : "X";
        messageText.innerText = `${message} Wins!`;
    }

    messageEl.classList.add('show')
}

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
    })
}

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    const winner = checkWin(currentClass);
    if (winner) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurn();
        setBoardHoverClass();
    }
}

restart.addEventListener('click', () => {
    messageEl.classList.remove('show')
    startGame();
});

const startGame = () => {
    circleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS); 
        cell.removeEventListener('click', handleClick);  
        cell.addEventListener('click', handleClick, { once: true})
    });
    
    messageEl.classList.remove('show');
    setBoardHoverClass();
}

startGame();