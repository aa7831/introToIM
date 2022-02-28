/*
Name: Abdullah Ahmed
Project Name: Egg Catch 
Date: 1 March, 2022
*/

WIDTH_GAME = 700; //width of canvas
HEIGHT_GAME = 500; //height of canvas

//this is a 2D array of the position of chickens. Each element of the array contains the position of 1 chicken. Right now, there are 3 chickens right now. For example, the position of the first chicken will be at x = 100 and y = 50.
let chicken_positions = [
  [100, 50],
  [300, 50],
  [500, 50],
];

//define the width and height of each chicken
const CHICKEN_WIDTH = 100;
const CHICKEN_HEIGHT = 60;

//class for chickens
class Chicken {
  constructor(x, y) {
    //constructor takes the x and y value of chicken
    this.x = x;
    this.y = y;
  }

  view() {
    //this method will show the chickens on the screen
    //right now, I am using rectangles. Change to images later.
    //Rectangles of width 100 and height 60.
    push();
    fill(255, 0, 0);
    rect(this.x, this.y, CHICKEN_WIDTH, CHICKEN_HEIGHT);
    pop();
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

  bottom() {
    return this.y >= HEIGHT_GAME;
  }
  move() {
    //this method moves the objects down
    //I do this by increasing the y coordinate of the egg.
    this.y += 1;
  }

  view() {
    //view the image of the egg. I am using circle of diameter 30 for now, I will change them to images later.
    push();
    fill(0, 255, 0);
    circle(this.x, this.y, 30);
    pop();
  }
}

//this is the class of the game, it will manage the chickens and the eggs.
class Game {
  constructor() {
    this.loss = false; //condition to check if game has been lost
    this.eggs = []; //this array will hold objects of eggs
    this.chickens = []; //this array will hold the objects of chickens

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
    let eggYCoordinate = chicken_positions[chicken][1] + 20;
    this.eggs.push(new Egg(eggXCoordinate, eggYCoordinate));
  }

  move() {
    //this method will move the eggs down using the egg array we made earlier
    for (let i = 0; i < this.eggs.length; i++) {
      this.eggs[i].move();
    }
  }

  view() {
    //this method will display the entire game
    //background, chickens, eggs
    //color background for now, change to image later
    background(0, 0, 255);

    //view each chicken from the array of chickens
    for (let i = 0; i < this.chickens.length; i++) {
      this.chickens[i].view();
    }

    //view each egg from array of eggs
    for (let i = 0; i < this.eggs.length; i++) {
      this.eggs[i].view();
    }
  }
}

let game = new Game(); //initializing the game

function setup() {
  createCanvas(WIDTH_GAME, HEIGHT_GAME);
}

function draw() {
  if(frameCount % 60 === 0){
    game.add_egg();
  }
  game.move();
  game.view();
}
