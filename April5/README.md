# Idea
<ul>
  <li>I wanted to make something different for the switches (analog and digital).</li>
  <li>For the analog input, I wanted to use a sensor that we have not yet used in the class and is interesting. The ultrasonic sensor caught me eye.</li>
  <li>I want to do something that is often seen with sensors: collision detections (this reminds me of Tesla's autopilot system, which is obviously a lot more complex) </li>
  <li>So, whenever an object gets too close to the ultrasonic sensor, an LED light will go off (I chose a red LED as it signifies danger).</li>
  
  <li>For the digital input, I used two basic buttons.</li>
  <li>I want to control 3 different lights with the use of a button</li>
  <li>Everytime the button is pressed, the light alternates.</li>
  <li>In addition to this, an "off" button will be introduced which turns off all the LEDS when it is pressed.</li>
</ul>


# Process / Problems
## Analog Input
<ul>
  <li>To start off, I needed to learn about the ultrasonic sensor. I went through youtube videos and guides on the internet to understand how it works </li>
  <li>The sensor shoots sounds waves of 40,000 HZ and is able to detect when they are "echoed" back. This means that if there is an object in the trajectory, the sound waves will bounce off of them and return to the sensor.</li>
  <li>The use of this sensor required mathematical equations involving speed, time and distance.</li>
  <li>Here are some important notes: speed of sound is 340 ms^-1, distance = speed / time, and finally (most important), we need to divide the time by 2. This is because the time that the sensor records is for the sound wave to leave the sensor, hit the object, and return back to the sensor. This means 2 laps are completed instead of one. </li>
  ```
    distance= time*0.034/2; //calculating the distance. We multiply by 0.034 because speed of sound is 340 ms^-1. 
  //Division by 2 is required because the time we get is for the waves to hit the object AND return i.e., twice the distance.
  ```
  <li>After figuring this out, it was quite easy to get the light to blink. Everytime an object came close to the sensor (low distance value), the light would turn on.</li>
  <li>The following code takes care of the above statement:</li>
  ```
    if(distance<=15){ //if any object is within range 15, the light turns on
    digitalWrite(LED_PIN,HIGH);
  }
  else{ //when the object leaves or if there is no object within the range, the light is turned off.
    digitalWrite(LED_PIN,LOW);
  } 
  ```
                     
                     </ul>
## Digital Input
  <ul>
    <li>This part of the assignment was straight forward.</li>
    <li>I added 3 LED lights on the breadboard, 2 buttons and the required wires (see picture of setup / schematics for reference) </li>
    <li>Most of the work was done in the code, which was also quite straight forward. </li>
    <li>Everytime the button was pressed, the LED would switch to the next one. I used the modulus function here as followed: </li>
    ```
    if(digitalRead(BUTTON) == HIGH){
      //button pressed
      LED_NUMBER = ( LED_NUMBER + 1 ) % NUM_LEDS;
    ```
    <li>In addition to this, I added a second button which would turn all the LEDS off.</li>
  </ul>
  
