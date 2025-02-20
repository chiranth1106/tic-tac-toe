let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let newGameBtn = document.querySelector('#newGame');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true; //playerX /playerO
let count = 0; // for draw condition

const winPattern = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if(turnO === true) {
            box.innerText = "O";
            box.style.color = "#ff5733";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#2073f7";
            turnO = true;
        }
        box.disabled = true;
        count++;
        console.log(count);

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            count = 0;
            showDraw();
        }
    }); 
});

const enableBoxes = () => {
    for(let box  of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for(let box  of boxes){
        box.disabled = true;
    }
};

const showDraw = () => {
    msg.innerText = `The game Was Draw!`
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showWinner = (winner) => {
    msg.innerText = `Congragulations, Winner is '${winner}'`
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);