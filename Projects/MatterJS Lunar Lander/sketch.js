// Anurag Sakharkar
// Lunar Lander Game
// Date
//
// Function


// Module Aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var ground;
var boxes = [];

function setup()
{
  createCanvas(windowWidth, windowHeight);
  var engine = Engine.create();
  Engine.run(engine);
  world = engine.world;
  var options =
  {
    isStatic: true
  }
  ground = Bodies.rectangle(windowHeight, windowHeight, windowWidth, 10, options);
  World.add(world, ground);
}


function draw()
{
  background(51);
  for (thisbox of boxes)
  {
    thisbox.show();
  }
}


function mouseDragged()
{
  boxes.push(new Box(mouseX, mouseY, 20, 20));
}
