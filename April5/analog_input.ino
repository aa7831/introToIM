const int TRIG_PIN = 13; // TRIG Pin on ultrasonic sensor connects to 13 on arduino
const int ECHO_PIN = 12; // ECHO pin on ultrasonic sensor connects to 12 on arduino
const int LED_PIN = 10;

double time; //measure the time 
int distance; //measure the distance from any object

void setup() {
  // put your setup code here, to run once:
  pinMode(TRIG_PIN,OUTPUT);
  pinMode(ECHO_PIN,INPUT);
  pinMode(LED_PIN,OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
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
    digitalWrite(LED_PIN,HIGH);
  }
  else{ //when the object leaves or if there is no object within the range, the light is turned off.
    digitalWrite(LED_PIN,LOW);
  } 
  delay(1); //delay for stability
}
