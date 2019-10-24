'use strict';
const nuts = document.querySelectorAll('.nut');
const overlay = document.getElementById('start_screen');
const overlay2 = document.getElementById('start_screen2');
const great_job = document.getElementById('great_job');
const game_end = document.getElementById('game_end');
const score_game = document.getElementById('score');
let config_data;
let bars =5;
let game_time;
let x;
let y;
let reduce_x;
let reduce_y;
const keys = [49, 50, 51, 52, 53, 54];
let start = false;
let game_data;
if(data){
game_time = data.time;
x = data.x;
y = data.y;
reduce_x = data.reduce_x;
reduce_y = data.reduce_y;
}
else{
game_time = 30000;
x = 2000;
y = 500;
reduce_x = 0.03;
reduce_y = 0.01;
}
const moles = document.querySelectorAll('.mole');
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
return randomnut(nuts);
}
lastnut = nut;
game_data = [nut , idx]; 
return game_data;
}
function gameProcess() {
let number_image = getRandomInt(1, 34);
bars++;
let score_hambuger = document.createElement('div');
score_hambuger.className = 'line_score';
document.getElementById('score_board').appendChild(score_hambuger);
let image_url = 'img/'+ 'm' + number_image + '.png';   
const nut = randomnut(nuts)[0];
let game_moles = nut.querySelector('.mole');
moles.forEach(mole => mole.style.backgroundImage = '');
game_moles.style.backgroundImage = 'url(' + image_url + ')';
nut.classList.add('up');
setTimeout(() => {
nut.classList.remove('up');
if (!timeUp) {
setTimeout(() => gameProcess(), y);	
}
else{
finishGame();
}
}, x);
x = x- x*reduce_x;
y=y - y*reduce_y;
}
function startGame() {
for(let i=0; i<5; i++) {
let score_hambuger = document.createElement('div');
score_hambuger.className = 'line_score';
document.getElementById('score_board').appendChild(score_hambuger);
}
timeUp = false;
score = 0;
enable_timer();
gameProcess();
setTimeout(() => timeUp = true, game_time);
}
function popupMole(e) {  
if(!e.isTrusted) return; 
let number = game_data[1];
let keyButton = keys[number];
let keyCode = e.keyCode;
let url = "img/mcheck.png";  	
let hit = nuts[number].querySelector('.mole');
if(keyCode==keyButton) {
hit.style.backgroundImage = 'url(' + url + ')';
score++;
bars--;
setTimeout(() => hit.style.backgroundImage = ' ', 1500);
document.getElementById('score_board').innerHTML = '';
if (bars <=5){
  bars =5;
}
for(let i=0; i<bars; i++) {
let score_hambuger = document.createElement('div');
score_hambuger.className = 'line_score';
document.getElementById('score_board').appendChild(score_hambuger);
}
} 
 
// this.classList.remove('up');
}
moles.forEach(mole => mole.style.backgroundImage= " ");
document.addEventListener("keydown", keyDownTextField);	
function keyDownTextField(e) {
overlay.style.display = "none";
overlay2.style.display = "block";
document.removeEventListener("keydown", keyDownTextField, false);
document.addEventListener("keydown", keyDownSecondScreen);	
}
function keyDownSecondScreen(e) {
overlay2.style.display = "none";
startGame();
document.removeEventListener("keydown", keyDownSecondScreen, false);
document.addEventListener("keydown", popupMole, false);	
}
function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min)) + min;
}
function finishGame() {
great_job.style.display = "block";
setTimeout(() => great_job.style.display = "none", 3000)
setTimeout(() => showFinal() , 500);
}
function showFinal(){
game_end.style.display = "block";
if(score >0 && score<10){
score_game.innerText = "0"+score;	
}
else{
score_game.innerText = score;	
}
document.removeEventListener("keydown", popupMole, false);
setTimeout(() => document.addEventListener("keydown", resetGame, false), 10000);
setTimeout(() => resetGame(), 60000);
}
function resetGame(){
document.location.reload(true);
}
