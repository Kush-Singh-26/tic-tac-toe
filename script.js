const GameBoardModule = (function () {
    const gameboard = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        gameboard[index] = sign;
    }

    const getField = (index) => {
        return gameboard[index];
    }
    return { gameboard, setField, getField };
})();

const displayController = (function () {
    const cells = document.querySelectorAll(".grid-box");
    const submitbtn = document.querySelector("#submit");
    const main = document.querySelector("main");
    let playerone;
    let playertwo;
    let currentPlayer = "X";
    const dialog = document.querySelector(".dialog");
    const player1 = document.querySelector(".info-1");
    const player2 = document.querySelector(".info-2");

    submitbtn.addEventListener('click', (e) => {
        e.preventDefault();
        playerone = document.querySelector("#playerone").value;
        playertwo = document.querySelector("#playertwo").value;
        player1.textContent = playerone;
        player2.textContent = playertwo;
        main.classList.remove("main-hide");
        main.classList.add("main-show");
        dialog.style.display = "none";
    })
    cells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (GameBoardModule.getField(index) === "") {
                GameBoardModule.setField(index, currentPlayer);
                e.target.textContent = currentPlayer;
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }

        })
    })

    return {};
})

const gameController = (() => {

});
displayController();

