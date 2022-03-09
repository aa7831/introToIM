/*
Name: Abdullah Ahmed
Project Name: Egg Catch 
Date: 1 March, 2022
*/

//REMEMBER TO INCLUDE SOUND LIBRARY

const WIDTH_GAME = 650; //width of canvas
const HEIGHT_GAME = 500; //height of canvas
const EGG_SIZE = 30;
const BASKET_WIDTH = 80;
const BASKET_HEIGHT = 40;


let chickenImg; //this variable will hold the image of the chicken
let eggImg; //this variable will hold the image of the egg
let basketImg; //this variable will hold the image of the basket
let bgImg; //this variable will hold the background image

let bgSound; //this variable will hold the background music
let eggSound; //this variable will hold the sound played when an egg is caught
let lostSound; //this variable will hold the sound played when the game is lost
let missedSound; //this variable will hold the sound played when an egg is missed

//this is a 2D array of the position of chickens. Each element of the array contains the position of 1 chicken. Right now, there are 3 chickens right now. For example, the position of the first chicken will be at x = 100 and y = 50.
let chicken_positions = [
  [100, 50],
  [300, 50],
  [500, 50],
];

let DIFFICULTY = "EASY"; //inital difficulty of game is easy

//define the width and height of each chicken
const CHICKEN_WIDTH = 100;
const CHICKEN_HEIGHT = 60;


function preload(){
  //load images here 
  chickenImg = loadImage("chicken.png");
  eggImg = loadImage("egg.png");
  basketImg = loadImage("basket.png")
  bgImg = loadImage("background.jpeg");
  
  //load sounds here
  bgSound = loadSound("background.mp3");
  eggSound = loadSound("egg.mp3");
  lostSound = loadSound("lost.mp3");
  missedSound = loadSound("missed.mp3");
}

//class for chickens
class Chicken {
  constructor(x, y) {
    //constructor takes the x and y value of chicken
    this.x = x;
    this.y = y;
  }

  view() {
    //this method will show the chickens on the screen
    image(chickenImg,this.x, this.y, CHICKEN_WIDTH, CHICKEN_HEIGHT);
  }
}

//class for eggs
class Egg {
  constructor(x, y) {
    //constructor takes x and y value
    //adjust the x axis so that the center is at the center of chicken.
    this.x = x + CHICKEN_WIDTH / 2;
    this.y = y;
  }
  
  getX(){
    //getter method for x axis of egg
    return this.x;
  }
  
  getY(){
    //getter method for y axis of egg
    return this.y;
  }

  bottom() {
    //returns true if the egg has left the canvas
    return this.y >= HEIGHT_GAME - EGG_SIZE;
  }
  move() {
    //this method moves the objects down
    //I do this by increasing the y coordinate of the egg.
    //The speed is increased according to the difficulty chosen by the user.
    if(DIFFICULTY === "EASY"){
      this.y += 1;
    }
    else if(DIFFICULTY === "MEDIUM"){
      this.y +=2;
    }
    else{
      this.y +=3;
    }
  }

  view() {
    //view the image of the egg. I am using circle of diameter 30 for now, I will change them to images later.
    image(eggImg,this.x, this.y, EGG_SIZE,EGG_SIZE);
  }
}

//this is the class of the game, it will manage the chickens and the eggs.

class Basket{
  //class for the basket that the user control
  constructor(){
    this.x = WIDTH_GAME/2; //initial x in middle of screen
    this.y = HEIGHT_GAME-BASKET_HEIGHT; //initial y at bottom
  }
  
  getX(){
    //getter method, returns x coordiante
    return this.x;
  }
  
  getY(){
    //getter method, returns y coordinate
    return this.y;
  }
  
  update(x){
    //updates the x coodinate according to the mouse 
    if(x >= BASKET_WIDTH && x<= WIDTH_GAME-BASKET_WIDTH){
      //only update if the mouse is within the canvas
      this.x = x;
    }
  }
  
  view(){
    //displays the basket on the screen
    image(basketImg,this.x,this.y,BASKET_WIDTH,BASKET_HEIGHT);
  }
}

class Game {
  constructor() {
    this.loss = false; //condition to check if game has been lost
    this.eggs = []; //this array will hold objects of eggs
    this.chickens = []; //this array will hold the objects of chickens
    this.score = 0; //score is 0 at the start of the game
    this.health = 3; //maximum health = 3
    
    this.basket = new Basket(); //basket 

    //filling the array of chickens
    for (let i = 0; i < chicken_positions.length; i++) {
      //first element of chicken_positions[i] is the x axis,
      //second element is the y axis.
      //we can access these by chicken_positions[i][0] and
      //chicken_positions[i][1] respectively.
      this.chickens.push(
        new Chicken(chicken_positions[i][0], chicken_positions[i][1])
      );
    }
  }

  add_egg() {
    //this method will add eggs to the game
    //randomly choosing a chicken
    let chicken = round(random(0, chicken_positions.length - 1));
    
    //access the x and Y coordinate as mentioned in the constructor 
    let eggXCoordinate = chicken_positions[chicken][0];
    let eggYCoordinate = chicken_positions[chicken][1] + 40;
    this.eggs.push(new Egg(eggXCoordinate, eggYCoordinate));
  }

  move() {
    //this method will move the eggs down using the egg array we made earlier
    for (let i = 0; i < this.eggs.length; i++) {
        this.eggs[i].move();
      }
    }
  
  checkHealth(){
    //this method will check if any egg has left the canvas 
    //we only need the check the first egg in the array because they are in order. The one on bottom is the first one in the array
    if(this.eggs.length>0){
      if(this.eggs[0].bottom()){
        //if the egg has left the screen without being caught, remove it from the array and decrease the user health by 1 unit.
        this.eggs = subset(this.eggs,1);
        this.health -= 1;
        //play sound for missing egg
        missedSound.play();
      }
    }
    
  }
  checkCatch(){
    //this method checks if an egg has been caught in the basket.
    let basketX = this.basket.getX();
    let basketY = this.basket.getY();
    let eggX; let eggY;
    
    //we only need to check the first egg. Since eggs are added to the array one by one and removed on a first leave first remove basis if they leave the canvas, checking the first egg (that is, the lowest egg) will suffice.
    
    //getting the X and Y axis of egg
    if(this.eggs.length>0){
      eggX = this.eggs[0].getX();
      eggY = this.eggs[0].getY();
    }
    
    //checking x and y range of eggs
    if(eggX >= basketX && eggX + EGG_SIZE <= basketX + BASKET_WIDTH){
      //x axis is within the range
      //checking y value
      if(eggY + EGG_SIZE >= basketY){
        //y axis within range
        //remove the egg from array
        this.eggs = subset(this.eggs,1,this.eggs.length-1);
        //add score
        this.score +=1;
        //play sound
        eggSound.play();
      }
    }
    
    }
  
  checkLoss(){
    //checks if the game has been lost
    return (this.health ===0);
  }

  view() {
    //this method updates the basket
    this.basket.update(mouseX);
    //this method will display the entire game
    //background, chickens, eggs
    image(bgImg,0,0,WIDTH_GAME,HEIGHT_GAME);

    //view each chicken from the array of chickens
    for (let i = 0; i < this.chickens.length; i++) {
      this.chickens[i].view();
    }

    //view each egg from array of eggs
    for (let i = 0; i < this.eggs.length; i++) {
      this.eggs[i].view();
    }
    
    //view the basket
    this.basket.view();
    
    //display the score
    push();
    fill(0,255,239);
    textSize(20);
    text("Health = " + this.health, 25,25);
    text("Score = " + this.score, 25,50);
    pop();
  }
}

let game = new Game(); //initializing the game
let menu = true; //this variable defines whether the user is in the main menu or not.
let lost = false; //this variable defines whether the user has lost the game or not

function setup() {
  createCanvas(WIDTH_GAME, HEIGHT_GAME);
}

function draw() {
  if(menu){
    showMenu();
  }
  else{
    if(!game.checkLoss()){
      if(frameCount % 60 === 0){ 
        //add an egg every second
        game.add_egg();
      }
      
      //play the sound on loop
      if(!bgSound.isPlaying()){
        bgSound.play();
      }

      game.checkCatch();
      game.move();
      game.checkCatch();
      game.checkHealth();
      game.view();
    }
    else{
      //game has been lost
      bgSound.pause(); //stop playing the backgrund sound
      lostSound.play(); //play the lost sound
      lost = true;
      noLoop();
    }
  }
  
  if(lost){
    //if the game has been lost, show the lost menu
    showLostMenu();
  }
}

let startRectX = WIDTH_GAME/2 -100; //this variable holds the X-coordinate of the rectangle that surrounds the "start game" text.
let startRectY = HEIGHT_GAME/2 - 75; //this variable holds the Y-coordinate of the rectangle that surrounds the "start game"
let startRectWidth = 200; //this variable holds the width of the rectangle that surrounds the "start game"
let startRectHeight = 30; //this variable holds the height of the rectangle that surrounds the "start game"

let difficultyRectX = startRectX - 100; //this variable holds the X coordinate of the rectangle surrounding the difficulty text
let difficultyRectY = startRectY + 50;
let difficultyRectWidth = 460; //this variable holds the width of the rectangle surrounding the difficulty text
let difficultyRectHeight = 30; //this variable holds the height of the rectangle surroundng the difficulty text

function showMenu(){
  //this function shows the main menu of the game
  image(bgImg,0,0,WIDTH_GAME,HEIGHT_GAME);
  textSize(30);
  stroke(15);
  push();
  noFill();
  //this rectangle surrounds the start game text, we need it to detect the mouse click.
  noStroke();
  rect(startRectX,startRectY,startRectWidth,startRectHeight);
  pop();
  push();
  fill(0,255,0);
  text("START GAME", WIDTH_GAME/2 - 100,HEIGHT_GAME/2 -50);
  pop();
  
  
  push();
  noFill();
  //this rectangle surrounds the difficulty text, we need it to detect the mouse click.
  noStroke();
  rect(difficultyRectX,difficultyRectY,difficultyRectWidth,difficultyRectHeight);
  pop();
  
  //the text that shows the instructions of the game. 
  push();
  fill(255,0,0);
  text("Click to change difficulty: " + DIFFICULTY, WIDTH_GAME/2 - 200, HEIGHT_GAME/2 );
  pop();
}


let restartRectX = difficultyRectX;
let restartRectY = difficultyRectY + 50;
let restartRectWidth = 400;
let restartRectHeight = difficultyRectHeight;

function showLostMenu(){
  //this function is called when the game has been lost
  image(bgImg,0,0,WIDTH_GAME,HEIGHT_GAME)
  
  push();
  fill(255,0,0);
  text("GAME OVER", WIDTH_GAME/2-100, HEIGHT_GAME/2-50);
  pop();
  
  push();
  fill(0,255,0);
  text("Click to return to main menu",restartRectX,restartRectY + 25)
  pop();
  
  push();
  noFill();
  noStroke();
  rect(restartRectX, restartRectY, restartRectWidth, restartRectHeight);
  pop();
  

}

function mouseClicked(){
  //the user is in the menu
  if(menu === true){
    //check if the user clicked the start game button
    //checking for X-axis
    if(mouseX >= startRectX && mouseX <= startRectX + startRectWidth){
      //within the x-axis range
      //checking the Y-axis range
      if(mouseY >= startRectY && mouseY <= startRectY + startRectHeight){
        //within the y axis
        //the user has clicked the "Start game" button
        //proceed to the start of the game
        menu = false;
      }
    }
    
    //check if the user clicked the difficulty button]
    //checking for X-axis range
    if(mouseX >= difficultyRectX && mouseX <= difficultyRectX + difficultyRectWidth){
      //within the x-axis range
      //checking for y-axis range
      if(mouseY >= difficultyRectY && mouseY<=difficultyRectY + difficultyRectHeight){
        //within the y-axis range
        //the user has clicked the button to change difficulty
        if(DIFFICULTY === "EASY"){
          DIFFICULTY = "MEDIUM";
        }
        else if(DIFFICULTY === "MEDIUM"){
          DIFFICULTY = "HARD";
        }
        else{
          DIFFICULTY = "EASY";
        }
      }
    }

  }
  
  //see if the user is in the game over menu
  if(lost === true){
    //user is in the lost menu
    //Check if user clicked on the restart button
    //check the X-axis range
    if(mouseX >= restartRectX && mouseX <= restartRectX + restartRectWidth){
      //mouse is within x-axis range
      //check if the mouse is within the y-axis range
      if(mouseY>=restartRectY && mouseY <= restartRectY + restartRectHeight){
        //user has clicked the "return to main menu button"
        //re-initialize the game
        game = new Game();
        lost = false;
        menu = true;
        DIFFICULTY = "EASY";
        loop();
      }
    }
  }
}
