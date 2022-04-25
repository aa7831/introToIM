# Initial Idea and Team Members
<ul>
  <li>Team Members: Abdullah and Mishel. </li>
  <li>We plan on making a remote control car.</li>
  <li>This will require the use of p5js, 2 arduinos, and a car that we will build using materials from the IM Lab and the wheels in the sparksfun inventor kit.</li>
  <li>One arduino will be connected to a laptop at all time to send and receive data with p5js.</li>
  <li>This arduino will also send data to the other arduino using some sort of connection (radio waves maybe). It is still unclear how we plan on executing this.</li>
  <li>The second arduino will be attached to the remote control car and its component. It will be powered using batteries or a power bank.</li>
  <li>The second arduino will decode the instructions sent by the user through p5js and the first arduino to make movements on the car.</li>
  <li>The use of two arduinos is necessary as we need 1 to be connected to a laptop to take input from the user and a second one connected to the car's components. </li>
</ul>


# Finalised Idea and Concept
<ul>
  <li>Remote Control Car </li>
  <li>Creative Part: Introduce an object detection system. Sensors around the car that will detect if it is getting to close to any object.</li>
  <li>If the car is getting close, a warning will be displayed on p5js along with a sound or a voice saying "slow down, object detected". </li>
</ul>

### Components Needed
<ol>
  <li>2 Arduinos </li>
  <li>nRF24L01 module to communicate between the 2 arduinos. </li>
  <li>Ultrasonic sensor - to detect objects </li>
  <li>4 Wheels </li>
  <li>4 motors </li>
  <li>Battery for the arduino attached to the car</li>
  <li>Casing for the car - Built ourselves using materials from the IM Lab </li>
</ol>

### Additional Features if time permits
<ul>
  <li>LEDs on the car with light sensor as well. If it gets too dark in the room, the LEDS will light up automatically. </li>
</ul>

# Process, Problems, Solutions
### 24 April, 2022
<ul>
  <li>Since the IM lab is closed, we are working on one arduino at the time and will work on the communication later. </li>
  <li>The goal is to make a working car that moves. </li>
  <li>We started off by following an online tutorial but did not make much progress. </li>
  <li>So, decided to start working on our own. </li>
  <li>Connected the arduino and breadboard to the platform provided in the sparkfun starter kit. </li>
  <li>Connected 4 wheels to 4 motors and attached these to the bottom of the platform. </li>
  <li>Here is a weird error we ran into: </li>
  
  

https://user-images.githubusercontent.com/90097437/165000892-2b80bf87-d844-40d4-9294-dd109d4fdc01.mp4

  <li>Could not figure out the problem. So we decided to take the car apart and do everything over again. This seemed to fix the issue. </li>
  <li>A video of everything working fine: </li>

https://user-images.githubusercontent.com/90097437/165000916-0762c6ee-2bc3-4ae5-923e-cb6fa5a136ff.mp4

  <li>To test how the car deals with different terrains, we took it outside to test: </li>

https://user-images.githubusercontent.com/90097437/165000933-cf796715-4be2-4434-b33c-e3678001a450.mp4


  <li>After everything started working, we added an ultrasonic sensor that would stop the car in case it gets too close to an object. When the object is removed, it starts moving again. </li>
  <li>This will be modified later to work with p5js: it will show a warning message along with warning sounds on p5js. </li>
  <li>This was fairly simple to implement. </li>
  <li>The ultrasonic sensor works by shooting out sound waves and measuring the time it takes for the wave to echo back. Using this, we can detect the distance from any object in the car's trajectory. </li>
  <li>After calculating the distance, we can apply the implementation mentioned above: the car stops when it gets too close to an object. </li>
  <li>Here are two videos showing this: </li>
  
https://user-images.githubusercontent.com/90097437/165001063-1a7d864c-dfe2-4ebc-8820-dcbdf2f77fce.mp4

https://user-images.githubusercontent.com/90097437/165001080-f67562c3-5338-4ab5-a34b-d1dba02aa27b.mp4
  
  <li>Something that we found helpful was: when you are working with a lot of wires and connections, it is helpful to note down the locations (pins) of these connections on a piece of paper for reference later because the arduino gets messy and it is hard to track them later on. </li>

</ul>

# Pictures of development:

## 90% Mark:

![IMG_3655 HEIC](https://user-images.githubusercontent.com/90097437/165001143-64834cf5-e205-4a39-b2ab-8bff447b992c.png)

    
