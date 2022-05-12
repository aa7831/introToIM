/*
Team Members: Abdullah Ahmed and Mishel Rashid
Date: 26 April, 2022
Project: Remote Control Car with p5js. 
Course: Introduction to Interactive Media
Assignment: Final Project
*/

// nRF 24L01 pin    Arduino pin   name
//          1                     GND
//          2                     3.3V
//          3             8       CE
//          4             7      CSN
//          5             52      SCLK
//          6             51      MOSI/COPI
//          7             50      MISO/CIPO


/*
MOTORS GUIDE

FRONT RIGHT = pwmAPin_2  | AIN1_2 AND AIN2_2
FRONT LEFT = pwmAPin     | AIN1 AND AIN2
BACK_RIGHT = pwmBPin_2   | BIN1_2 AND BIN2_2
BACK LEFT  = pwmBPin     | BIN1 AND BIN2

*/


//Including NRF Module Libraries 
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

//Motor controls
const int ain1Pin = 23;
const int ain2Pin = 22;
const int pwmAPin = 12;

const int ain1Pin_2 = 24; //24 
const int ain2Pin_2 = 25; //25 
const int pwmAPin_2 = 11; //11

const int bin1Pin = 27;
const int bin2Pin = 26;
const int pwmBPin = 10;

const int bin1Pin_2 = 28;
const int bin2Pin_2 = 29;
const int pwmBPin_2 = 9;


const int CEPIN = 8; //CE PIN ON NRF MODULE 
const int CSNPIN = 7; //CSN PIN ON NRF MODULE

//LDR SENSOR PIN
const int LDR_PIN = A0;

//LED PINS
const int LED1 = 44;
const int LED2 = 45;

//is the car moving?
bool moving;

RF24 radio(CEPIN, CSNPIN);  // CE, CSN -- INITIALIZING RADIO


const byte address[6] = "00030"; //Byte of address to communicate between NRF MODULES
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
  radio.openReadingPipe(0, address);  // Destination address
  radio.setPALevel(RF24_PA_MIN);      // Min or max
  radio.startListening();             // sets  module as receiver

  //setting all motor controls to output
  pinMode(ain1Pin, OUTPUT);
  pinMode(ain2Pin, OUTPUT);
  pinMode(pwmAPin, OUTPUT); 

  pinMode(ain1Pin_2, OUTPUT);
  pinMode(ain2Pin_2, OUTPUT);
  pinMode(pwmAPin_2, OUTPUT); 

  pinMode(bin1Pin, OUTPUT);
  pinMode(bin2Pin, OUTPUT);
  pinMode(pwmBPin, OUTPUT);

  pinMode(bin1Pin_2, OUTPUT);
  pinMode(bin2Pin_2, OUTPUT);
  pinMode(pwmBPin_2, OUTPUT);
  
  //LDR PIN
  pinMode(LDR_PIN,INPUT);

  //LED PINS
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
}
void loop() {
  uint8_t pipeNum;
  if (radio.available(&pipeNum))  //Looking for the data.
  {
    // Serial.print("data available on pipe ");
    // Serial.println(pipeNum);
    long data;
    radio.read(&data, sizeof(data));  //Reading the data
    Serial.print("data = ");
    Serial.println( data);

    //debugging purposes:
    // Serial.print("LDR READING = ");
    // Serial.println(analogRead(LDR_PIN));


    //set all motors to maximum speed.
    analogWrite(pwmAPin, 255);
    analogWrite(pwmAPin_2, 255);

    analogWrite(pwmBPin, 255);
    analogWrite(pwmBPin_2,255);
    moving = true;

    if(data == 1){
      //GO FORWARD 
      //All motors go forward
      digitalWrite(ain1Pin, LOW); 
      digitalWrite(ain1Pin_2,LOW);  

      digitalWrite(ain2Pin, HIGH); 
      digitalWrite(ain2Pin_2,HIGH);

      digitalWrite(bin1Pin, LOW);  
      digitalWrite(bin1Pin_2,HIGH);

      digitalWrite(bin2Pin, HIGH);
      digitalWrite(bin2Pin_2,LOW); 

    }
    else if(data == 0){
      //GO BACKWARD
      //all motors go backwards
      digitalWrite(ain1Pin, HIGH); 
      digitalWrite(ain1Pin_2,HIGH); 

      digitalWrite(ain2Pin, LOW);
      digitalWrite(ain2Pin_2,LOW);

      digitalWrite(bin1Pin, HIGH);  
      digitalWrite(bin1Pin_2,LOW);

      digitalWrite(bin2Pin, LOW);
      digitalWrite(bin2Pin_2,HIGH); 
    }
    else if (data == 3){ 
      //STOP 
      moving = false;
      //Simply turn the speed to 0 for all motors
      analogWrite(pwmAPin, 0);
      analogWrite(pwmAPin_2, 0);

      analogWrite(pwmBPin, 0);
      analogWrite(pwmBPin_2,0);
    }
    else if(data == 4){
      //TURN LEFT
      // RIGHT WHEELS FORWARD, LEFT WHEELS BACKWARDS
      digitalWrite(ain1Pin, HIGH);
      digitalWrite(ain1Pin_2,LOW);

      digitalWrite(ain2Pin, LOW);
      digitalWrite(ain2Pin_2,HIGH);

      digitalWrite(bin1Pin, HIGH);
      digitalWrite(bin1Pin_2,HIGH);

      digitalWrite(bin2Pin,LOW);
      digitalWrite(bin2Pin_2,LOW);
    }
    else if(data == 5){
      //TURN RIGHT
      //Left wheels forward, right wheels backwards
      digitalWrite(ain1Pin, LOW); 
      digitalWrite(ain1Pin_2,HIGH); 

      digitalWrite(ain2Pin, HIGH); 
      digitalWrite(ain2Pin_2,LOW);

      digitalWrite(bin1Pin, LOW); 
      digitalWrite(bin1Pin_2,LOW);

      digitalWrite(bin2Pin, HIGH);
      digitalWrite(bin2Pin_2,HIGH); 
    }
    else if (data == 6){
      //forward and left
      //back wheels turn forward
      // forward RIGHT WHEEL FORWARD, forward LEFT WHEEL BACKWARDS
      digitalWrite(ain1Pin, HIGH); 
      digitalWrite(ain1Pin_2,LOW);  

      digitalWrite(ain2Pin, LOW); 
      digitalWrite(ain2Pin_2,HIGH);

      digitalWrite(bin1Pin, LOW);  
      digitalWrite(bin1Pin_2,HIGH);

      digitalWrite(bin2Pin, HIGH);
      digitalWrite(bin2Pin_2,LOW);
    }
    else if(data == 7){
      //back and left
      //front wheels turn backward
      //back left forward, back right backward
      digitalWrite(ain1Pin, HIGH); 
      digitalWrite(ain1Pin_2,HIGH); 

      digitalWrite(ain2Pin, LOW);
      digitalWrite(ain2Pin_2,LOW);

      digitalWrite(bin1Pin, LOW);  
      digitalWrite(bin1Pin_2,LOW);

      digitalWrite(bin2Pin, HIGH);
      digitalWrite(bin2Pin_2,HIGH); 
    }
    else if (data == 8){
      //forward and right
      //back wheels go forward
      //forward right backward, forward left forward
      digitalWrite(ain1Pin, LOW); 
      digitalWrite(ain1Pin_2,HIGH);  

      digitalWrite(ain2Pin, HIGH); 
      digitalWrite(ain2Pin_2,LOW);

      digitalWrite(bin1Pin, LOW);  
      digitalWrite(bin1Pin_2,HIGH);

      digitalWrite(bin2Pin, HIGH);
      digitalWrite(bin2Pin_2,LOW);
    }
    else if (data == 9){
      //backward and right
      //forward wheels back.
      //back left wheel backward, back right wheel forward
      digitalWrite(ain1Pin, HIGH); 
      digitalWrite(ain1Pin_2,HIGH); 

      digitalWrite(ain2Pin, LOW);
      digitalWrite(ain2Pin_2,LOW);

      digitalWrite(bin1Pin, HIGH);  
      digitalWrite(bin1Pin_2,HIGH);

      digitalWrite(bin2Pin, LOW);
      digitalWrite(bin2Pin_2,LOW); 
    }
  }

  int LDR_READING = analogRead(LDR_PIN); //reading the LDR sensor
  if(LDR_READING < 100 && !moving){ //if too dim, lights turn on
    Serial.println("LIGHTS COMING ON");
    digitalWrite(LED1,HIGH);
    digitalWrite(LED2,HIGH);
  }
  else{ //else turn lights off
    digitalWrite(LED1,LOW);
    digitalWrite(LED2,LOW);
  }
}
