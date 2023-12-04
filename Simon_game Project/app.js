let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"]; 

let started = false;
let level =  0;

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function() {
    if(started == false){
        console.log("Game is started");
        started = true;

        levelUp();
    }

});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },250);
}

function levelUp() {
    userSeq =[];
    level++;
    h3.innerText = `level ${level}`;
    
    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    //console.log(randomIdx);
   // console.log(randomColor);
    //console.log(randomBtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameflash(randomBtn);
}

function checkAns(idx) {
    //console.log("current level", level);
   // let idx = level - 1;

    if (userSeq[idx] === gameSeq[idx]) {
        //console.log("same value");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerHTML = `Game over! Your score was <b>${level}</b>  <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor= "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor= "white";
        }, 200);
        reset();
    }
}

function btnPress() {
    //console.log(this);
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}