# Description
A simple mini-piano that plays different melodies when different keys are pressed. There is also an off/on button.

![IMG_3528_2](https://user-images.githubusercontent.com/90097437/162854311-e2069468-886e-439e-a72f-f410160f579a.jpg)

# Development Process
<ul>
  <li>The development process consisted of a lot of trial and error, switching between ideas and experimenting with different sensors. </li>
  <li>The original idea was to make a piano with cut-out wood tiles that would play notes similar to an actual piano.
    However, we soon realized that this was not feasible because of the amount of materials and time that would be needed. </li>
  <li>Pivoting from the original idea, Mishel and I decided to use cardboard instead of wood for the piano.</li>
  <li>Going off of guides online, we wanted to use conductive ink but the IM lab did not have these. Then, we discovered force sensors.</li>
  <li>The idea was simple: when the user presses a cardboard tile, it would increase the reading of the force sensor attached beneath the tile which would activate a note in turn.</li>
  <li>However, we ran into another problem. Here is a video of the complication: </li>
  
  

https://user-images.githubusercontent.com/90097437/162854970-f0434d49-5d3c-4b82-a7b1-c57811b5e258.mp4

  <li>We could not figure out what the issue was but our best guess after conducting several tests is that the force applied on the cardboard was not strong enough to be detected by the sensor through the layers of the cardboard. </li>
  <li>But this does not explain the fluctuating readings on the force sensors (from 0 all the way up to 1023)!</li>
  <li>After more testing, we decided to change our approach and use normal A4 paper instead of the cardboard. We did this because the force sensors were working fine without the cardboard, so the material was probably the issue,</li>
  <li>Before making the piano again, we tested if the force sensors work through paper, and they did. </li>
  <li>After figuring this out, the rest was quite simple as we had already done most of the work with cardboard. </li>
  <li>We cut out the piece of paper, made the tiles and attached force sensors under the corresponding tiles. </li>
  <li>After making the circuit, the rest of the work was done through software.</li>
  <li>However, we ran into another problem. We could not figure out how to program the on/off button as it did not work.</li>
  <li>Here is the piece of code that finally fixed the problem: </li>
  
  ````
    if(digitalRead(controlButton) == HIGH){
    if(status && !previousStatus || !status && previousStatus){
      status = !status;
      previousStatus = status;
    }
  }
  ````
  
  <li>The code works by storing a previous state of the button as well as the current state. See the code file in this repository for more detail</li>
</ul>

# Final Product

https://user-images.githubusercontent.com/90097437/162855893-c99e4501-6e29-4f5d-a4aa-f69588f4fe44.mp4


