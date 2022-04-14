# Description
Completed 3 exercises in groups. These were the prompts:
<ol>
  <li>Make something that uses only one sensor on arduino and makes the ellipse in p5 move on the horizontal axis, in the middle of the screen, and nothing on arduino is controlled by p5 </li>
  <li>Make something that controls the LED brightness from p5</li>
  <li>take the gravity wind example and make it so every time the ball bounces one led lights up and then turns off, and you can control the wind from one analog sensor</li>
</ol>

# Process
Working with my group, we came up with the solutions.
## First Prompt
<ul>
  <li>For the first prompt, we used a potentiometer to control an ellipse on p5. As the user rotates the potentiometer, the x-axis of the ellipse is changed.</li>
  <li>We had the map the values of the poteniometer from 0 - 1023 to 0-the width of the canvas. Here's the piece of code that takes care of this task: </li>
  ````
  ellipse(map(int(latestData),0,1023,0,width),height/2,40,20)
  ````
  <li>The latest data refers to the analog reading taken from the arduino device. It first has to be converted to an integer using the int() function.</li>
  <li>The y axis, width, and height of the ellipse stay constant throughout the program. Only the x-axis changes.
</ul>

## Second Prompt
<ul>
  <li>For the second prompt, we came up with a simple solution to control the brightness of an LED on the arduino.</li>
  <li>As the user presses keys between 0 and 5, the brightness increases with the numbers. At 0, it is off and at 5, it is at the maximum brightness</li>
  <li>Note that we had to use analog output for this task, so make sure to connect the LED into a pin that supports analogWrite().</li>
</ul>

## Third Prompt
<ul>
  <li>This prompt asked us to modify an already existing example.</li>
  <li>In the example, a ball is dropped into the canvas which slowly loses height to show loss of total energy in the ball.</li>
  <li>The user can control the wind using the LEFT and RIGHT arrow keys, which makes the ball move in the corresponding direction.</li>
  <li>To modify this, we used a potentiometer again. The potentiometer is used to control the wind.</li>
  <li>We again had to map the values from 0-1023 to -2 to 2. This means that somewhere in the middle of the rotation of the potentiometer is the point where wind = 0.</li>
  <li>To make the LED blink everytime the ball bounces, we made use of an already existing condition in the program where a bounce is detected.</li>
  <li>We simply added two additional statements. One inside the condition, where if the ball has met the ground, the output to the LED would be HIGH. The second outside the condition, using an else statement to send a value of LOW to the LED.</li>
  <li>The second statement is needed to make sure that the light blinks and does not stay on after the first bounce.</li>
</ul>

# Code
You can find both the arduino and the p5js code in this repository.
    
