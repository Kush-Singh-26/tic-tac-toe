const GameBoardModule = (function() {
    const gameboard = ["", "", "", "", "", "", "", "", ""];

    const setField = (index,sign) => {
        gameboard[index] = sign;
    }

    const getField = (index) => {
        return gameboard[index];
    }
    return{gameboard, setField, getField };
})();

const displayController = (function(){
    const cells = document.querySelectorAll(".grid-box");
    const submitbtn = document.querySelector("#submit");
    const main = document.querySelector("main");
    let playerone; 
    let playertwo;
    const dialog = document.querySelector("dialog");
    submitbtn.addEventListener('click', (e)=>{
        e.preventDefault();
        playerone = document.querySelector("#playerone").value;
        playertwo = document.querySelector("#playertwo").value;
        dialog.close();
    })
    cells.forEach((cell) =>{
        cell.addEventListener('click', (e) =>{
            console.log(GameBoardModule.getField(parseInt(e.target.dataset.index)))
        })
    })
    dialog.showModal();

    return{};
})

const gameController = ( ()=>{

});
displayController();

