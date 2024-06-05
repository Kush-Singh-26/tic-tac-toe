const GameBoardModule = (function () {
    const gameboard = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        gameboard[index] = sign;
    };

    const getField = (index) => {
        return gameboard[index];
    };

    const resetBoard = () => {
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[i] = "";
        }
    };

    return { gameboard, setField, getField, resetBoard };
})();

const DisplayController = (function () {
    const cells = document.querySelectorAll(".grid-box");
    const submitbtn = document.querySelector("#submit");
    const main = document.querySelector("main");
    const dialog = document.querySelector(".dialog");
    const player1Display = document.querySelector(".info-1");
    const player2Display = document.querySelector(".info-2");
    const scoreDisplay = document.querySelector("#score");
    const player1Area = document.querySelector("#player1");
    const player2Area = document.querySelector("#player2");
    const resetBtn = document.querySelector("#reset");
    const scoreArea = document.querySelector(".current-score");
    const score1Display = document.querySelector("#score-1");
    const score2Display = document.querySelector("#score-2");
    const tieDisplay = document.querySelector("#score-tie");

    let handleCellClick;

    const updatePlayerNames = (playerone, playertwo) => {
        player1Display.textContent = playerone;
        player2Display.textContent = playertwo;
    };

    const showMain = () => {
        main.classList.remove("main-hide");
        main.classList.add("main-show");
        scoreDisplay.classList.remove("score-hide");
        scoreDisplay.classList.add("score-show");
        dialog.style.display = "none";
    };

    const addCellClickListeners = () => {
        cells.forEach((cell) => {
            cell.addEventListener('click', handleCellClick);
        });
    };

    const removeCellClickListeners = () => {
        cells.forEach((cell) => {
            cell.removeEventListener('click', handleCellClick);
        });
    };

    const addResetBtn = () => {
        resetBtn.addEventListener('click', () => {
            GameController.resetGame();
        });
    };

    const updateCell = (cell, currentPlayer) => {
        cell.textContent = currentPlayer;
    };

    const resetDisplay = () => {
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        scoreArea.textContent = "";
        scoreArea.style.border = "none";
    };

    const displayWinner = (winner) => {
        scoreArea.textContent = `${winner} wins!`;
        scoreArea.style.border = "5px solid lavenderblush";
    };

    const displayTie = () => {
        scoreArea.textContent = "It's a tie!";
        scoreArea.style.border = "5px solid lavenderblush";
    };

    const displayCurrentPlayer = (currentPlayer) => {
        if (currentPlayer === "X") {
            player1Area.style.backgroundColor = "rgb(144, 238, 144)";
            player2Area.style.backgroundColor = "rgb(176, 196, 222)";
        } else {
            player2Area.style.backgroundColor = "rgb(144, 238, 144)";
            player1Area.style.backgroundColor = "rgb(176, 196, 222)";
        }
    };

    const displayScore = (score_1, score_2, score_tie) => {
        score1Display.textContent = score_1;
        score2Display.textContent = score_2;
        tieDisplay.textContent = score_tie;
    };

    return {
        submitbtn,
        addCellClickListeners,
        removeCellClickListeners,
        setHandleCellClick: (handler) => { handleCellClick = handler; },
        updatePlayerNames,
        showMain,
        updateCell,
        resetDisplay,
        displayWinner,
        displayTie,
        displayCurrentPlayer,
        addResetBtn,
        displayScore
    };
})();

const GameController = (function (GameBoardModule, DisplayController) {
    let initialPlayer = "X";
    let currentPlayer = "X";
    let playerone;
    let playertwo;
    let score1 = 0;
    let score2 = 0;
    let tie = 0;
    let gameOver = false;

    const init = () => {
        DisplayController.submitbtn.addEventListener('click', (e) => {
            e.preventDefault();
            playerone = document.querySelector("#playerone").value.trim();
            playertwo = document.querySelector("#playertwo").value.trim();
            DisplayController.updatePlayerNames(playerone, playertwo);
            DisplayController.showMain();
        });
        DisplayController.displayCurrentPlayer(currentPlayer);
        updateScore();
        DisplayController.setHandleCellClick(handleCellClick);
        DisplayController.addCellClickListeners();
        DisplayController.addResetBtn();
    };

    const handleCellClick = (e) => {
        if (gameOver) return;

        const index = parseInt(e.target.dataset.index);
        if (GameBoardModule.getField(index) === "") {
            GameBoardModule.setField(index, currentPlayer);
            DisplayController.updateCell(e.target, currentPlayer);

            if (checkWinner(currentPlayer)) {
                gameOver = true;
                DisplayController.displayWinner(currentPlayer);
                if (currentPlayer === "X") {
                    score1++;
                } else {
                    score2++;
                }
                updateScore();
            } else if (checkTie()) {
                gameOver = true;
                DisplayController.displayTie();
                tie++;
                updateScore();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                DisplayController.displayCurrentPlayer(currentPlayer);
            }
        }
    };

    const checkWinner = (player) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => GameBoardModule.getField(index) === player)
        );
    };

    const checkTie = () => {
        return GameBoardModule.gameboard.every(field => field !== "");
    };

    const resetGame = () => {
        GameBoardModule.resetBoard();
        DisplayController.resetDisplay();
        initialPlayer = initialPlayer === "X" ? "O" : "X";
        currentPlayer = initialPlayer;
        DisplayController.displayCurrentPlayer(currentPlayer);
        gameOver = false;
        DisplayController.removeCellClickListeners();
        DisplayController.addCellClickListeners();
    };

    const updateScore = () => {
        DisplayController.displayScore(score1, score2, tie);
    };

    return { init, resetGame };
})(GameBoardModule, DisplayController);

document.addEventListener("DOMContentLoaded", () => {
    GameController.init();
});
