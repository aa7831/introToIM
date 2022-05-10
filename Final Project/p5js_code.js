let serial;
let latestData = "waiting for data";

function setup() {
 createCanvas(windowWidth, windowHeight);

 serial = new p5.SerialPort();

 serial.list();
  
 // replace below string with your Arduino's port
 serial.open('/dev/tty.usbmodem1201');

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
    if(key == "w" || key == "W"){
      outByte = 1;
    }
    else if (key == "s" || key == "S"){
      outByte = 0;
    }
    else if (key == "a" || key == "A"){
      outByte = 4
    }
    else if (key == "d" || key == "D"){
      outByte = 5;
    }
    console.log("Sending " + outByte);
    //serial.write(Number(outByte)); // Send as byte value
    //print(outByte);
    serial.write(outByte); // Send as a string/char/ascii value
}

function keyReleased(){
  outByte = 3;
  console.log("Sending " + outByte);
  serial.write(outByte);
}

function draw() {
 background(255,255,255);
 fill(0,0,0);
 text(latestData, 10, 10);
}
