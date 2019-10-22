// 'use strict';

const nuts = document.querySelectorAll('.nut');
const overlay = document.getElementById('start_screen');
let config_data;
let data;


// if(data){
//   alert("jjjj");
//  config_data = JSON.parse(data);
//  console.log(config_data);  
// }
// else{
//   alert(data);
// }
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
    let number_image = getRandomInt(1, 34);
    let number_mole = getRandomInt(1, 7);
    // console.log(number_mole);
    let image_url = "img/"+ "m" + number_image + ".png";
   
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


// numpad 1  49
// numpad 2  50
// numpad 3  51
// numpad 4  52
// numpad 5  53
// numpad 6  54



// let mydata = JSON.parse(data);
// alert(mydata);
// alert(mydata[0].name);

 
// if(data){

//  alert('888'); 
// }


// function readTextFile(file, callback) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);
//         }
//     }
//     rawFile.send(null);
// }

// //usage:
// readTextFile("config.json", function(text){
//     var data = JSON.parse(text);
//     console.log(data);
// });