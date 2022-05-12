//code extracted from Jack's example, edits made to serve our purpose
let serial;
let latestData = "waiting for data";
let forward = 0;
let backward = 0; 
let right = 0;
let left = 0;

function setup() {
 createCanvas(700, 500);

 serial = new p5.SerialPort();

 serial.list();
  
 // replace below string with your Arduino's port
 serial.open('/dev/tty.usbmodem11301');

 serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);
}

function serverConnected() {
 print("Connected to Server");
}

function gotList(thelist) {
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) {
  print(i + " " + thelist[i]);
 }
}

function gotOpen() {
 print("Serial Port is Open");
}

function gotClose(){
 print("Serial Port is Closed");
 latestData = "Serial Port is Closed";
}

function gotError(theerror) {
 print(theerror);
}

function gotData() {
 let currentString = serial.readLine();
  trim(currentString);
 if (!currentString) return;
 console.log(currentString);
 latestData = currentString;
}

function keyPressed() {
    let outByte;
    if(key == "w" || key == "W"){
      //going forward
      forward = 1;
      outByte = 1;
    }
    else if (key == "s" || key == "S"){
      //going backward
      backward = 1;
      outByte = 0;
    }
    else if (key == "a" || key == "A"){
      //going left
      left = 1;
      if(forward == 1){
        outByte = 6; //forward and left
      }
      else if(backward == 1){
        //backward and left
        outByte = 7;
      }
      else{
        //just left
        outByte = 4
      }
    }
    else if (key == "d" || key == "D"){
      right = 1;
      //going right
      if(forward == 1){
        //forward and right
        outByte = 8;
      }
      else if(backward == 1){
        //backward and right
        outByte = 9;
      }
      else{
        //just right
        outByte = 5;
      }
    }
  else{
    outByte = 0;
  }
    console.log("Sending " + outByte);
    //serial.write(Number(outByte)); // Send as byte value
    //print(outByte);
    serial.write(outByte); // Send as a string/char/ascii value
}

function keyReleased(){
  forward = 0;
  backward = 0;
  left = 0; right = 0;
  outByte = 3; //stop moving
  console.log("Sending " + outByte);
  serial.write(outByte);
}

function draw() {
 background(81,185,196);
 fill(128);
 textSize(20);
 text("Abdullah and Mishel's Remote Control Car", 150,50);
  
  //instructions on the left side 
  
  //printing a box on the left side
  push();
  strokeWeight(10);
  line(0,110,250,110);
  line(250,110,250,325);
  line(250,325,0,325);
  
  //printing a box on the right side 
  line(700,110,400,110);
  line(400,110,400,450);
  line(400,450,700,450);
  pop();
  
  
  //printing instructions
  fill(240,0,0);
  text("INSTRUCTIONS",40,140);
  textSize(17);
  text("1-W to move forward", 10,165);
  text("2-S to move back", 10, 190);
  text("3-A to move left", 10, 215);
  text("4-D to move right", 10, 240);
  text("5-Lights turn on automatically", 10, 265);
  text("in dark environment", 25,285);
  
  //printing directions in real time
  fill(0,255,0);
  let secondDirection = false; //is it two directions at a time?
  text("Real-time Response", 480,135);
  textSize(30);
  text("MOVEMENT:", 480, 210);
  if(forward == 1){
    text("FORWARD", 460,310);
    secondDirection = true;
  }
  else if(backward == 1){
    text("BACKWARD", 460,310);
    secondDirection = true;
  }
  
  if(right){
    if(secondDirection){
      text("/",640,310);
      text("RIGHT", 460, 350);
    }
    else{
      text("RIGHT", 460,310);
    }
  }
  
  else if(left){
    if(secondDirection){
      text("/",640,310);
      text("LEFT", 460, 350);
    }
    else{
      text("LEFT", 460,310);
    }
  }
  
  else if(forward == 0 && backward == 0 && left == 0 && right == 0){
    //stoped
    push();
    fill(255,0,0);
    text("STOPPED", 460,310);
    pop();
  }
}
