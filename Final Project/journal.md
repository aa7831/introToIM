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

### 25 April
<ul>
  <li>Tried implementing communication between two arduinos using the nRF24L01 module. </li>
  <li>The first issue we faced was the shape of the pins on the module - they required soldering. </li>
  <li>Since we have not covered soldering in this class, we improvised and used female-male header wires in order to connect the modules with the arduinos.</li>
  <li>Following a guide online, we could not get the modules to work. Although they were turned on (I could feel them getting hot), data transmitted and received was random: </li>
  <li>After spending several hours working on this with little success, we decided to leave this for another day and the professor for assistance. </li>
  
</ul>

### 30 April
<ul>
  <li>After asking the professor about the module in class, a minimal example was shared with us: https://github.com/michaelshiloh/resourcesForClasses/blob/master/src/arduinoSketches/nRF24L01/minimalnRF/minimalnRF.ino </li>
  <li>Also realised the issue with our previous attempts. The pin layout in the tutorials was incorrectly labeled.</li>
  <li>At first, we used the same example used in the link above without the optional LED just to see if the modules were working. However, it was difficult to tell if it was because of the complicated value being transmitted in the example above. </li>
  <li>In order to make it a bit simpler, we transmitted a single value that is incremented by 1 everytime it is transmitted (code in this repository). This made it easier to tell if the communication was happening. </li>
  <li>Finally, after testing, we were able to make the modules communicate. This will be used to establish remote control signals with the car. </li>
 
</ul>

### 10 MAY
<ul>
  <li> A lot of progress today: communication established, car controls finalised and lights added. </li>
  <li> We decided to switch from an arduino uno to an arduino Mega as uno did not have enough pins to support 4 motors, nrf module and the LEDS along with sensors </li>
  <li> Used laser cutter to cut plastic to make the base of the car. The old one did not support the size of arduino uno and the larger breadboard. </li>
  <li> Established communication between the two arduinos. </li>
  <li> Started off by testing forward and backward movement of car. Below are the results: </li>

https://user-images.githubusercontent.com/90097437/167526121-8aef865d-d30c-47d9-9abf-d046d75a673e.mp4

  <li> Working on this, tried to implement all four directions. This proved to be a bit tricky but here is the working solution: </li>
   <ul>
     <li>To turn right, wheels on the left side go forward and the wheels on the right side go backward. The resultant force is clockwise (right). </li>
     <li>The opposite to turn left. Wheels on the rigth side go forward and the wheels on the left side go backward creating an anticlockwise resultant force. </li>
  </ul>
  
  <li>Here is the working video: </li>
  
https://user-images.githubusercontent.com/90097437/167526366-3f9c8a85-5e32-4b76-a6b2-56460c2067ac.mp4

  <li> After completing this, we moved onto the creative part of the project: introducing an ultrasonic sensor to detect objects with the car. </li>
  <li> However, adding an ultrasonic sensor resulted with the arduino short-circuting. We do not know why this is happening. </li>
  <li> Improvising, we fell back on our backup plan: adding LED lights on the arduino. </li>
  <li> Added 2 LED lights as well as a LDR sensor. </li>
  <li> When the surrouning of the car is dark, the LEDs turn on automatically. Find the code for this in the repository. </li>
  <li> Finally, since we did not have double A cells at the moment, we attached the car using a power bank for the time being. This will be switched to cells later. The battery holder will be attached under the car as we have left some space for it. </li>
</ul>

## USER TESTING
<ul>
  <li> Asked random people at the IM lab, outside on campus as well as our friends to test the car. </li>
  <li> The response was quite consistent. Here is the overview: </li>
  <li> Positive feedback: </li>
  <ul>
    <li> The car is responive to keyboard clicks. </li>
    <li> The LEDs work as expected: in a dark environment, or if we turn the lights of suddenly, the LEDS turn on automatically. They also turn off if the environment is lit again. </li>
    <li> Turning is quite responsive and smooth as well. </li>
  </ul>
  
  <li> Points for improvement: </li>
  <ul>
    <li> At a time, the car can only move in one direction. For example, it is not possible to move forward and right at the same time. </li>
    <li> Having to hold the power bank with the car as batteries are not yet attached. </li>
    <li> Acceleration is instant and too fast. </li>
  </ul>
</ul>

## Response to user testing
<ul>
  <li> The ability to move in multiple directions at the same time is something not possible at the time with the materials we have in hand. However, we will try to implement this with discussion with the professor as well as our peers. This may require the use of different wheels or more motors. </li>
  <li> We will attach double A cells with a battery holder to the car tomorrow. This will fix this issue that users are experiencing. We could not do this today as the IM lab was out of working cells - we will buy some from the convenience store.</li>
  <li> We will try to introduce an "acceleration" system for forward and backward movement. If the keys are held consistently, the speed increases accordingly. This will make the speed more controllable and smooth - similar to an actual car. </li>
</ul>

# Pictures of development:

## 90% Mark:

![IMG_3655 HEIC](https://user-images.githubusercontent.com/90097437/165001143-64834cf5-e205-4a39-b2ab-8bff447b992c.png)

## Complete Project: 


![picture-min](https://user-images.githubusercontent.com/90097437/167527480-5975f2a1-5d1d-4b92-b32e-c2452547496a.png)

