#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

const int CEPIN = 9;
const int CSNPIN = 10;
RF24 radio(CEPIN, CSNPIN);                // CE, CSN

// Byte of array representing the address.
// This is the address where we will send the data.
// This should be same on the receiving side.
const byte address[6] = "00030";

void setup() {
  Serial.begin(9600);

  // RF24 setup
  if (!radio.begin()) {
    Serial.println("radio  initialization failed");
    while (1)
      ;
  } else {
    Serial.println("radio successfully initialized");
  }
  radio.openWritingPipe(address);   // Destination address
  radio.setPALevel(RF24_PA_MIN);    // min or max
  radio.stopListening();            //This sets the module as transmitter

}

long data;

void loop() {
  while (Serial.available() > 0) {
    // read the incoming byte from p5js:
    data = Serial.read();
    radio.write(&data, sizeof(data)) ;
    // Serial.println(data);
  
  delay(100);
}
}
