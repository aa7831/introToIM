class Face{ //Face Object
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  
  draw(){
    circle(this.x,this.y,100); //face
    circle(this.x-25,this.y-10,10); //eye
    circle(this.x+25,this.y-10,10); //eye
    arc(this.x,this.y+10,10,20,PI,0,CHORD); //nose
  }
  
  emotion1(){
    //happy 
    arc(this.x,this.y+25,40,20,0,PI,CHORD);
  }
  
  emotion2(){
    //sad
    arc(this.x,this.y+35,40,20,PI,0,CHORD);
  }
  
  emotion3(){
    //surprised
    circle(this.x,this.y+30,20)
  }
}

function setup() {
  createCanvas(450, 400);
  
}
let choice = 0; //choice of emotion

let faces = [new Face(100,200), new Face(300,200)]; //array of 2 objects

let numFaces = 1; //number of faces wanted

function draw() {
  background(0,222,255);
  
  drawCircles(); //function to draw buttons
  
  for(let i = 0; i<numFaces;i++){
    faces[i].draw();

    if(choice === 0){
      faces[i].emotion1();
    }

    if(choice === 1){
      faces[i].emotion2();
    }

    if(choice ===2){
      faces[i].emotion3();
    } 
  }
}

function mouseClicked(){  
  if(mouseY>=25 && mouseY<=75){
    if(mouseX>=50 && mouseX <=125){
      //change emotion button clicked
      choice = (choice + 1) % 3; //keeps choice between 0 and 2 (inclusive)
    }
    if(mouseX>=325 && mouseX<=375){
      //add another face clicked
      numFaces = 2;
    }
  }
  
}

function drawCircles(){ //draws the menu buttons
  
  //top right circle
  push();
  text("Click me to add another face! (max 2)",200,20)
  fill(255,0,0);
  circle(350,50,50);
  pop();
  
  //top left circle
  push();
  text("Click to change emotion!", 50,20)
  fill(0,255,0);
  circle(100,50,50)
  pop();
}
