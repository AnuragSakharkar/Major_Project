// Bouncing logo
// Anurag Sakharkar
// 9 Sept 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y;
let dx = 10;
let dy = 10;
let radius;
let rectsize;
let mode = "rectangle";


function setup()
{
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  dx = random(-100, 100);
  dy = random(-100, 100);
  radius = 100;
  rectsize = 50;
}

function draw()
{
  background(255);
  x += dx;
  y += dy;

  if (mode === "circle")
  {
    displayCircle()
  }

  else if (mode === "rectangle")
  {
    displayRectangle();
  }
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}



function displayCircle()
{
  if (x > windowWidth - radius/2 || x < 0 + radius/2){
    dx *= -1
  }

  if (y > windowHeight - radius/2 || y < 0 + radius/2){
    dy *= -1
  }

  fill(0);
  circle(x, y, radius);
}


function displayRectangle()
{
  if (x > windowWidth - rectsize || x < 0){
    dx *= -1
  }

  if (y > windowHeight - rectsize || y < 0){
    dy *= -1
  }

  fill(0);
  rect(x, y, rectsize, rectsize);
  print(x);
  print(y);
}
