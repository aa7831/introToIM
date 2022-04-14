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
 //the following line displays the ellipse on the canvas. 
 //We need to map the reading from the potentiometer between the canvas. 
 //Also need to convert it to an integer to make sure it is in the correct format
 ellipse(map(int(latestData),0,1023,0,width),height/2,40,20);

}
