# Process
Aftering figuring out the hard part, I started implementing the game. Here is what the process looked like:
<ul>
  <li>Replace the shapes from the initial test with images.</li>
  <li>Check if the egg has been caught or not by the basket. I did this by making both the image of the basket and the image of eggs as rectangles. This made it easy for me to detect "collisions" between the egg and the basket by making sure the eggs fall within the range of x and y axis of the basket. Here's the piece of code that handles collision detection:
    
    ```
      checkCatch(){
    //this method checks if an egg has been caught in the basket.
    let basketX = this.basket.getX();
    let basketY = this.basket.getY();
    let eggX; let eggY;
    //we only need to check the first egg. Since eggs are added to the array one by one and removed on a first leave first remove basis if they leave the canvas, checking the first egg (that is, the lowest egg) will suffice.
    //getting the X and Y axis of egg
    if(this.eggs.length>0){
      eggX = this.eggs[0].getX();
      eggY = this.eggs[0].getY();
    }
    ```
  </li>
  </ul>
