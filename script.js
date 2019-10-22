'use strict';

const nuts = document.querySelectorAll('.nut');
const overlay = document.getElementById('start_screen');

  // const scoreBoard = document.querySelector('.score');
  const squirrels = document.querySelectorAll('.squirrel');
  let lastnut;
  let timeUp = false;
  let score = 0;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomnut(nuts) {
    const idx = Math.floor(Math.random() * nuts.length);
    const nut = nuts[idx];
    if (nut === lastnut) {
      // console.log('Ah nah thats the same one bud');
      return randomnut(nuts);
    }
    lastnut = nut;
    return nut;
  }

  function peep() {
    const time = randomTime(200, 1000);
    let number = getRandomInt(1, 33);
    console.log(number);
    let image_url = "img/"+ "m" + number + ".png";
   
    const nut = randomnut(nuts);
    var mole = nut.querySelector('.squirrel');
    mole.style.backgroundImage = 'url(' + image_url + ')';

    nut.classList.add('up');
    setTimeout(() => {
      nut.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }

  function startGame() {
    // scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 25000)
  }

  function bonk(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
  }

  squirrels.forEach(squirrel => squirrel.addEventListener('click', bonk));


  document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
  overlay.style.display = "none";
  startGame();
// var keyCode = e.keyCode;
//   if(keyCode==13) {
//   alert("You hit the enter key.");
//   } else {
//   alert("Oh no you didn't.");
//   }
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

 
