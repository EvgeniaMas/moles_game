'use strict';
const nuts = document.querySelectorAll('.nut');
const overlay = document.getElementById('start_screen');
const great_job = document.getElementById('great_job');
const game_end = document.getElementById('game_end');
const score_game = document.getElementById('score');
let config_data;
let game_time;
let x;
let y;
const keys = [49, 50,51, 52,53,54 ];
let start = false;
let game_data;
if(data){
game_time = data.time;
x = data.x;
y = data.y
 
}
else{
  game_time = 180;
x = 600;
y = 1000;
}
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
    game_data = [nut , idx]; 
    return game_data;
  }

  function peep() {
    // const time = randomTime(200, 1000);
    let number_image = getRandomInt(1, 34);
    
    // console.log(number_mole);
    let image_url = "img/"+ "m" + number_image + ".png";
   
    const nut = randomnut(nuts)[0];
    // alert(nut);
    let moles = nut.querySelector('.squirrel');
    moles.style.backgroundImage = 'url(' + image_url + ')';

    nut.classList.add('up');
    setTimeout(() => {
      nut.classList.remove('up');
      if (!timeUp) peep();
      else{
      	finishGame();
      }
    }, x);
  }

  function startGame() {
    // scoreBoard.textContent = 0;
    for(let i=0; i<5; i++) {
    let score_hambuger = document.createElement('div');
    score_hambuger.className = 'line_score';
    document.getElementById('score_board').appendChild(score_hambuger);
     }

    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 25000)
  }

  function bonk(e) {
    
    if(!e.isTrusted) return; // cheater!
     let number = game_data[1];
     // alert(number);
    // let number_mole = getRandomInt(1, 7);
    let keyButton = keys[number];
    let keyCode = e.keyCode;

    // console.log(keyButton + "  Нажала");
    // console.log(keyCode + "  Код клавиши");
  if(keyCode==keyButton) {
  	let url = "img/mcheck.png";

  	
  	let hit = nuts[number].querySelector('.squirrel')
     hit.style.backgroundImage = 'url(' + url + ')';
     score++;

   // alert(score + "    Увеличился!!");
   let score_hambuger = document.createElement('div');
    score_hambuger.className = 'line_score';
    document.getElementById('score_board').appendChild(score_hambuger);


  } else {
  	score--;
 
 
   if (score<=5){
  
    score = 5;
  }
    // alert(score + "    Уменьшился");

    document.getElementById('score_board').innerHTML = '';

    for(let i=0; i<score; i++) {
    let score_hambuger = document.createElement('div');
    score_hambuger.className = 'line_score';
    document.getElementById('score_board').appendChild(score_hambuger);
     }
   	// var elem = document.getElementById("score_board");

    // elem.parentNode.removeChild(elem);

   	// document.getElementsByClassName('line_score')[1].remove();
   	// document.getElementById('score_board').appendChild(score_hambuger);
    // }
  }

  // if (score<=5){
  //   score = 5;
  // }

  
   
    // this.classList.remove('up');
    // console.log(score);
    // scoreBoard.textContent = score;
  }

  // squirrels.forEach(squirrel => squirrel.addEventListener('keydown', bonk));





// if(!start){
// document.addEventListener("keydown", keyDownTextField);	
// }

// else{
document.addEventListener("keydown", bonk, false);	
// }


function keyDownTextField(e) {
	start = true;
  overlay.style.display = "none";
  startGame();
//   var keyCode = e.keyCode;
//   if(keyCode==49) {
//   alert("1");
//   } else {
//   alert("Oh no you didn't.");
//   }
 }



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function finishGame() {
great_job.style.display = "block";

setTimeout(() => great_job.style.display = "none", 3000)
setTimeout(() => showFinal() , 500)
}

function showFinal(){
 game_end.style.display = "block";

score_game.innerText = score;
}

startGame();
