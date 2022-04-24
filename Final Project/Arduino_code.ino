//Motor controls
const int ain1Pin = 3;
const int ain2Pin = 4;
const int pwmAPin = 5;

const int ain1Pin_2 = 13;
const int ain2Pin_2 = 12;
const int pwmAPin_2 = 11;

const int bin1Pin = 8;
const int bin2Pin = 7;
const int pwmBPin = 6;

const int bin1Pin_2 = 9;
const int bin2Pin_2 = 2;
const int pwmBPin_2 = 10;

//ultrasonic sensor pins
const int ECHO_PIN = A0;
const int TRIG_PIN = A1;

//the following 2 variables will be used to detect distance with ultrasonic sensor 
double time;
int distance;


void setup() {

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


  //sensor pins
  pinMode(ECHO_PIN, INPUT);
  pinMode(TRIG_PIN, OUTPUT);
  Serial.begin(9600);

}

bool stop = false; //indicates whether the robot is moving or not

void loop() {

  if(!stop){
    analogWrite(pwmAPin, 255);
    analogWrite(pwmAPin_2, 255);

    analogWrite(pwmBPin, 255);
    analogWrite(pwmBPin_2,255);
  }
  else{
    //stop the car
    analogWrite(pwmAPin, 0);
    analogWrite(pwmAPin_2, 0);

    analogWrite(pwmBPin, 0);
    analogWrite(pwmBPin_2,0);
  }

  digitalWrite(ain1Pin, LOW);
  digitalWrite(ain1Pin_2,HIGH);

  digitalWrite(ain2Pin, HIGH);
  digitalWrite(ain2Pin_2,LOW);

  digitalWrite(bin1Pin, HIGH);
  digitalWrite(bin1Pin_2,LOW);

  digitalWrite(bin2Pin,LOW);
  digitalWrite(bin2Pin_2,HIGH);


  // Clear the trig by running it low for 2 microseconds
  digitalWrite(TRIG_PIN, LOW); 
  delayMicroseconds(2);

  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  // Reads the echo, returns the sound wave travel time in microseconds
  time = pulseIn(ECHO_PIN, HIGH);

  distance= time*0.034/2; //calculating the distance. We multiply by 0.034 because speed of sound is 340 ms^-1. 
  //Division by 2 is required because the time we get is for the waves to hit the object AND return i.e., twice the distance.

  if(distance<=15){ //if any object is within range 15, the light turns on
    stop = true;
  }
  else{ //when the object leaves or if there is no object within the range, the light is turned off.
    stop = false;
  } 
  delay(1); //delay for stability

  Serial.println(distance);
}
