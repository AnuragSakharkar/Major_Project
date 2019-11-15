// Cannon w/Mouse follow
// Anurag Sakharkar 
// October 15 2019
//
// Create a cannon angled towards the mouse

let cannonX;
let cannonY;
let cannonWidth;
let cannonLength;
let cannonAngle;
let bullets = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  cannonX = 75;
  cannonY = height - 150;
  cannonWidth = 50;
  cannonLength = 125;
  cannonAngle = 0;
}


function draw() {
  background(110);
  
  displayCannon();
  updateBullets();
}


function displayCannon()
{
  push();
  translate(cannonX, cannonY);
  cannonAngle = atan2(mouseY - cannonY, mouseX - cannonX);
  rotate(cannonAngle);
  rect(0, (0 - cannonWidth/2), cannonLength, cannonWidth);
  circle(0, 0, cannonWidth);
  pop();
}


function mouseClicked()
{
  fire();
}


function fire() 
{
  let thisBullet = 
  {
    x: cannonX,
    y: cannonY,
    radius: cannonWidth,
    angle: cannonAngle,
    speed: 5
  };
  bullets.push(thisBullet);
}


function updateBullets() 
{
  for (let i = bullets.length - 1; i > 0; --i) {
    if ((bullets[i].x > windowWidth) || (bullets[i].y > windowHeight))
    {
      bullets.splice(i, 1);
    }
    else
    {
      push();
      bullets[i].x += (cos(bullets[i].angle) * bullets[i].speed);
      bullets[i].y += (sin(bullets[i].angle) * bullets[i].speed);
      circle(bullets[i].x, bullets[i].y, bullets[i].radius);
      pop();
    }
  }
}