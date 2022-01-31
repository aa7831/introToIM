function setup() {
  createCanvas(380, 400);
}

function draw() {
  background(51,153,255);
  
  circle(180,140,50) //head
  line(180,165,180,230) //body
  
  line(180,230,210,250) //leg 1
  line(180,230,150,250) //leg 2
  
  line(180,190,150,170) //arm 1
  line(180,190,210,170) //arm 2

  strokeWeight(5)
  point(170,134) //eye
  point(185,134) //eye
  
  arc(180,150,17,6,0,PI) //smile
  
  //headphones
  ellipse(145,135,15,17)
  ellipse(212,135,15,17)
  noFill()
  arc(180,123,66,23,PI,0)
  
  //music note
  circle(215,58,5)
  circle(240,68,5)
  line(220,61,227,42)
  line(227,42,245,43)
  line(245,43,240,68)
  
  circle(293,194,5)
  circle(320,202,5)
  line(298,197,302,197)
  line(302,197,307,171)
  line(307,171,330,173)
  line(330,173,322,202)
  
  circle(297,110,5)
  circle(268,115,5)
  line(270,113,266,90)
  line(266,90,284,87)
  line(284,87,289,110)
  line(289,110,291,110)
  
  circle(53,166,5)
  line(58,166,61,166)
  line(61,166,65,150)
  line(65,150,70,150)
  
  circle(58,71,5)
  circle(87,81,5)
  line(63,73,68,75)
  line(68,75,75,53)
  line(75,53,93,52)
  line(93,52,89,79)
  
  print(mouseX, mouseY)
}
