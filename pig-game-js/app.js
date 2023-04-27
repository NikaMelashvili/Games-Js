'use strict';

// DOM element selection - Variables

const startAgain = document.querySelector(".btn--new");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const active = document.querySelector(".player--active");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");
const firstPlayer = document.querySelector(".player--0");
const secondPlayer =  document.querySelector(".player--1");
const dice = document.querySelector(".dice"); 
const score1 = document.querySelector("#score--0");
score1.textContent = 0;
const score2  = document.querySelector("#score--1");
score2.textContent = 0;

let activePlayer = 0;
let userScore = [0,0];
let mainScore = [0,0];
let isPlaying = true;

// Functions

const winner = () =>{
    document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    dice.classList.add("hidden");
    isPlaying = false;
}

const switchPlayers = () =>{
    if(mainScore[activePlayer] >= 100) {
        winner();
    }
    userScore[activePlayer] = 0;
    document.getElementById(`current--${activePlayer}`).textContent = userScore[activePlayer];
    activePlayer = activePlayer === 0 ? 1 : 0;
    firstPlayer.classList.toggle("player--active");
    secondPlayer.classList.toggle("player--active");
}

const newGame = () =>{
    if(mainScore[activePlayer] >= 100) {
        winner();
    }
    firstPlayer.classList.add("player--active");
    secondPlayer.classList.remove("player--active");
    activePlayer = 0;
    userScore[activePlayer] = 0;
    document.getElementById(`current--0`).textContent = userScore[activePlayer];
    document.querySelector(`#score--0`).textContent = userScore[activePlayer];
    document.getElementById(`current--1`).textContent = userScore[activePlayer];
    document.querySelector(`#score--1`).textContent = userScore[activePlayer];
    dice.classList.add("hidden");
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
    isPlaying = true;
}

// Event listeners

roll.addEventListener("click" , () =>{
    dice.classList.remove("hidden");
    const ranNum = Math.floor(Math.random() * 6) + 1;
    dice.src = "dice-" + ranNum + ".png";
    if(ranNum !== 1){
        userScore[activePlayer] += ranNum;
        document.getElementById(`current--${activePlayer}`).textContent = userScore[activePlayer];
    } else{
        switchPlayers();
    }
});

hold.addEventListener("click" , () =>{ 
    if(isPlaying){
        mainScore[activePlayer] += userScore[activePlayer];
        document.querySelector(`#score--${activePlayer}`).textContent = mainScore[activePlayer];
        switchPlayers();
    } 
});

startAgain.addEventListener("click" , newGame);
