let velocity; 
let gravity;
let position;
let acceleration;
let wind;
let drag = 0.99;
let mass = 50;
let hDampening;
let serial;
let latestData = "waiting for data";

function setup() {
 createCanvas(windowWidth, windowHeight);

 serial = new p5.SerialPort();

 serial.list();
 
 // replace below string with your Arduino's port
 serial.open('/dev/tty.usbmodem21101');

 serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);
  noFill();
  position = createVector(width/2, 0);
  velocity = createVector(0,0);
  acceleration = createVector(0,0);
  gravity = createVector(0, 0.5*mass);
  wind = createVector(0,0);
  hDampening=map(mass,15,80,.98,.96);
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


function draw() {
 background(255,255,255);
 fill(0,0,0);
 text(latestData, 10, 10);

  wind.x= map(int(latestData),0,1023,-2,2); //adjust the wind according to the reading from potentiometer. Map the values between 0 and 1023 to -2 and 2.
  velocity.x*=hDampening;
 
  applyForce(wind);
  applyForce(gravity);
  velocity.add(acceleration);
  velocity.mult(drag);
  position.add(velocity);
  acceleration.mult(0);
  ellipse(position.x,position.y,mass,mass);
  if (position.y > height-mass/2) {
      velocity.y *= -0.9;  // A little dampening when hitting the bottom
      position.y = height-mass/2;
      serial.write(1); //the ball hit the ground, send a value of 1 the arduino so the LED can be turned on. Refer to the arduino code for this.
    }
  else{
    serial.write(0); //ball left the ground, send a value of 0 the arduino to turn the LED off.
  }
}

function applyForce(force){
  // Newton's 2nd law: F = M * A
  // or A = F / M
  let f = p5.Vector.div(force, mass);
  acceleration.add(f);
}

function keyPressed(){
  if (key==' '){ //pressing spacebar restarts the simulation
    mass=random(15,80);
    position.y=-mass;
    velocity.mult(0);
  }
}
