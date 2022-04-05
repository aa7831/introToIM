const int RED_LIGHT = 8;
const int GREEN_LIGHT = 6;
const int BLUE_LIGHT = 3;
const int NUM_LEDS = 3;

const int BUTTON = 11; 
const int OFF_BUTTON = 2;

int LED_NUMBER;
int currentLED = -1;

int value = LOW;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(RED_LIGHT,OUTPUT);
  pinMode(GREEN_LIGHT,OUTPUT);
  pinMode(BLUE_LIGHT,OUTPUT);
  pinMode(BUTTON,INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(digitalRead(BUTTON) == HIGH){
    //button pressed
    LED_NUMBER = ( LED_NUMBER + 1 ) % NUM_LEDS;
    digitalWrite(currentLED,LOW);
    value = HIGH;
  }

  if(LED_NUMBER == 0){
    //red light turns on
    currentLED = RED_LIGHT;
  }
  else if(LED_NUMBER ==1){
    //green light turns on
    currentLED = GREEN_LIGHT;
  }
  else if(LED_NUMBER == 2){
    //blue light turns on
    currentLED = BLUE_LIGHT;
  }

  if(digitalRead(OFF_BUTTON) == HIGH){
    //off button pressed
    value = LOW;
  }

  digitalWrite(currentLED,value);

  delay(100);
  Serial.println(currentLED);

}
