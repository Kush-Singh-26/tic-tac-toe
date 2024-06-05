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

    const addCellClickListeners = (handleCellClick) => {
        cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                handleCellClick(index, e.target);
            });
        });
    };

    const addResetBtn = () =>{
        resetBtn.addEventListener('click',() =>{
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
    };

    const displayWinner = (winner) => {
        scoreDisplay.textContent = `${winner}`;
    };

    const displayTie = () => {
        scoreDisplay.textContent = "It's a tie!";
    };

    const displayCurrentPlayer = (currentPlayer) =>{
        if(currentPlayer === "X"){
            player1Area.style.backgroundColor = "rgb(144, 238, 144)";
            player2Area.style.backgroundColor = "rgb(176, 196, 222)";
        }
        else{
            player2Area.style.backgroundColor = "rgb(144, 238, 144)";
            player1Area.style.backgroundColor = "rgb(176, 196, 222)";
        }
    }
    return {
        submitbtn,
        addCellClickListeners,
        updatePlayerNames,
        showMain,
        updateCell,
        resetDisplay,
        displayWinner,
        displayTie,
        displayCurrentPlayer,
        resetBtn
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

    const init = () => {
        DisplayController.submitbtn.addEventListener('click', (e) => {
            e.preventDefault();
            playerone = document.querySelector("#playerone").value.trim();
            playertwo = document.querySelector("#playertwo").value.trim();
            DisplayController.updatePlayerNames(playerone, playertwo);
            DisplayController.showMain();
        });
        DisplayController.displayCurrentPlayer(currentPlayer);

        DisplayController.addCellClickListeners(handleCellClick);
        DisplayController.addResetBtn();
    };

    const handleCellClick = (index, cell) => {
        if (GameBoardModule.getField(index) === "") {
            GameBoardModule.setField(index, currentPlayer);
            DisplayController.updateCell(cell, currentPlayer);
            console.log(`Updated cell ${index} with ${currentPlayer}`);
            
            if (checkWinner(currentPlayer)) {
                DisplayController.displayWinner(currentPlayer);
                if(currentPlayer === "X")
                    score1 = score1 + 1;
                else
                    score2 = score2 + 1;

                    console.log(`X:${score1} Y:${score2}`)
                DisplayController.resetBtn();
            } else if (checkTie()) {
                DisplayController.displayTie();
                DisplayController.resetBtn();

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
        initialPlayer = initialPlayer === "X" ? "O" : "X"; // Change initial player
        currentPlayer = initialPlayer;
        DisplayController.displayCurrentPlayer(currentPlayer);
    };

    return { init, resetGame };
})(GameBoardModule, DisplayController);

document.addEventListener("DOMContentLoaded", () => {
    GameController.init();
});