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

    const updatePlayerNames = (playerone, playertwo) => {
        player1Display.textContent = playerone;
        player2Display.textContent = playertwo;
    };

    const showMain = () => {
        main.classList.remove("main-hide");
        main.classList.add("main-show");
        dialog.style.display = "none";
    };

    const addCellClickListeners = (handleCellClick) => {
        cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                handleCellClick(index, e.target);
            });
        });
    };

    const updateCell = (cell, currentPlayer) => {
        cell.textContent = currentPlayer;
    };

    const resetDisplay = () => {
        cells.forEach((cell) => {
            cell.textContent = "";
        });
    };

    const displayWinner = (winner) => {
        alert(`Player ${winner} wins!`);
    };

    return {
        submitbtn,
        addCellClickListeners,
        updatePlayerNames,
        showMain,
        updateCell,
        resetDisplay,
        displayWinner
    };
})();

const GameController = (function (GameBoardModule, DisplayController) {
    let currentPlayer = "X";
    let playerone;
    let playertwo;

    const init = () => {
        DisplayController.submitbtn.addEventListener('click', (e) => {
            e.preventDefault();
            playerone = document.querySelector("#playerone").value;
            playertwo = document.querySelector("#playertwo").value;
            DisplayController.updatePlayerNames(playerone, playertwo);
            DisplayController.showMain();
        });

        DisplayController.addCellClickListeners(handleCellClick);
    };

    const handleCellClick = (index, cell) => {
        if (GameBoardModule.getField(index) === "") {
            GameBoardModule.setField(index, currentPlayer);
            console.log(`Updated cell ${index} with ${currentPlayer}`);
            DisplayController.updateCell(cell, currentPlayer);
            console.log(`Updated cell ${index} with ${currentPlayer}`);
            
            if (checkWinner(currentPlayer)) {
                DisplayController.displayWinner(currentPlayer);
                resetGame();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
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

    const playRound = (index, player) => {
        console.log(`Cell Index: ${index}, Player: ${player}`);
    };

    const resetGame = () => {
        GameBoardModule.resetBoard();
        DisplayController.resetDisplay();
        currentPlayer = "X";
    };

    return { init, resetGame };
})(GameBoardModule, DisplayController);

document.addEventListener("DOMContentLoaded", () => {
    GameController.init();
});
