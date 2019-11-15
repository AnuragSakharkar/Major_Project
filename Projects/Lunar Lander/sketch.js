// Lunar Lander in Javascript
// Anurag Sakharkar
// Computer Science 30 (4)
// 21 October 2019



// State variable(s) used - line 41
// Array used - line 280

// Extras for experts/Wow me factor:
//       - I completed the entire project using Object-Oriented Programming in p5.js, which allows for efficiency and scalability on a new level when
//         compared to function-oriented programming.
//       - I managed to learn and effectively implement OOP in my code completely independently (learned from Daniel Shiffman - https://shiffman.net/
//         and other sources on the internet).
//       - I managed to complete rotation of the object completely independently using the beginShape() function and calculating the vertices of the
//         rocket independently (which,  as far as I know, is very slightly more efficient but more time-consuming to code and is pretty much only
//         suitable for simple objects) and was very interesting to research.
//       - I collaborated with people both online and physically to try to complete aspects of this project in the most elegant way possible.
//       - I did some extensive research on physics engines (including Matter.js) and have begun work (~50% complete) on a similar version of this
//         project using Matter.js. This version will allow for even more expandibility than the considerable amount I have here and will also allow
//         for a better collision detection method than the one currently used.
//       - I plan on expanding this project significantly (see notes at the end of the code) and will ensure that I continue to work on it alongside
//         other CS30 projects.



// Initialize the values for the rocket
let rocket;
let landscape;
let gravityValue = 0.015;




// Define the rocket class

class Rocket
{


  // Constructor for the rocket class to initialize the values. State variable(s) used here!

  constructor()
  {
    this.x = windowWidth/2;
    this.y = 5;
    this.dx = (random() * 5);
    this.dy = 0;
    this.thrust = 0.1;
    this.landingThreshold = 1;
    this.angle = 0;
    this.fuelAmount = 100;
    this.angularThrust = 5;
    this.rotationFuelUsage = 0.25;
    this.boostingFuelUsage = 0.5;
    this.gameState = "notLanded";
    this.rocketState = "notCrashed";
    this.boostingState = false;
    this.controlsAvailable = true;
    this.fillValR = 255;
    this.fillValG = 255;
    this.fillValB = 255;
  }



  // Function to boost the rocket, using the angle and trigonometry, in whatever direction it's facing.

  move()
  {
    if (this.gameState === "notLanded")
    {
      this.dy += gravityValue;
    }

    if (keyIsDown(38) && this.controlsAvailable)
    {
      this.dx += (cos(this.angle) * this.thrust);
      this.dy += (sin(this.angle) * this.thrust);
      this.fuelAmount -= this.boostingFuelUsage;
      this.boostingState = true;
    }
    else
    {
      this.boostingState = false;
    }
  }



  // Function to bounce off of the walls and ceiling.

  wallBounce()
  {
    if (this.x <= 0 || this.x >= windowWidth)
    {
      this.dx *= -1;
    }
    else if (this.y <= 0)
    {
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;
  }



  // Function to rotate the angle the rocket is facing when the left/right arrow keys are pressed.

  changeAngle()
  {
    if (this.gameState === "notLanded" && this.controlsAvailable)
    {
      if (keyIsDown(37))
      {
        this.angle -= this.angularThrust;
        this.fuelAmount -= this.rotationFuelUsage;
      }
      else if (keyIsDown(39))
      {
        this.angle += this.angularThrust;
        this.fuelAmount -= this.rotationFuelUsage;
      }

      if (Math.abs(this.angle) === 360)
      {
        this.angle = 0;
      }
    }
  }



  // Function to check whether the rocket has already landed, then whether it is at the height of the ground, then its speed. It then checks
  // whether the rocket is vertically aligned (+/- 10°)­. It then changes the gamestate and rocketstate accordingly.

  checkRocket()
  {
    this.totalMomentum = (Math.abs(this.dx) + Math.abs(this.dy));
    if (this.gameState === "notLanded")
    {
      if (this.y > (windowHeight - 65))
      {
        if ((this.totalMomentum < this.landingThreshold) && ((Math.abs(this.angle + 90)) <= 10 || (this.angle + 90) >= 350))
        {
          this.gameState = "landed";
          this.rocketState = "notCrashed";
        }
        else
        {
          this.gameState = "landed";
          this.rocketState = "hasCrashed";
        }

        this.controlsAvailable = false;
        this.dy = 0;
        this.dx = 0;
      }
    }

    if (this.fuelAmount <= 0)
    {
      this.controlsAvailable = false;
      this.boostingState = false;
    }
  }



  // Function to change the colour of the rocket based on whether it is boosting (blue), has crashed (red), has landed successfully (green), or
  // none of the above (white) using the gamestate value.

  showColor()
  {
    if (this.boostingState)
    {
      this.fillValR = 0;
      this.fillValG = 0;
      this.fillValB = 255;
    }
    else if ((this.gameState === "landed") && (this.rocketState === "hasCrashed") /* && (!this.hasLanded) */)
    {
      this.fillValR = 255;
      this.fillValG = 0;
      this.fillValB = 0;
      this.hasLanded = true;
    }
    else if ((this.gameState === "landed") && (this.rocketState === "notCrashed") /* && (!this.hasLanded) */)
    {
      this.fillValR = 0;
      this.fillValG = 255;
      this.fillValB = 0;
      this.hasLanded = true;
    }
    else
    {
      this.fillValR = 255;
      this.fillValG = 255;
      this.fillValB = 255;
    }
  }



  // Print white text with information about the vertical and horizontal speeds + angle, like was present in the original game.

  showInfoText ()
  {
    push();

    textSize(20);
    fill(255);

    text ("dy = " + (this.dy * 10).toFixed(2), windowWidth - 195, 10, 150);
    text ("dx = " + (this.dx * 10).toFixed(2), windowWidth - 195, 30, 150);
    text ("angle = " + (this.angle + 90).toFixed(2), windowWidth - 195, 50, 150);

    if (this.fuelAmount <= 0)
    {
      text ("No fuel left", windowWidth - 195, 70, 150);
    }
    else
    {
      text ("fuel = " + (this.fuelAmount), windowWidth - 195, 70, 150);
    }

    pop();
  }



  // Render function to draw the rocket shape using the vertices and the angle property to allow for rotation. The fill values allow for the
  // rocket's color to reflect the gamestate.

  render()
  {
    noStroke();
    fill(this.fillValR, this.fillValG, this.fillValB);

    beginShape();
    vertex(cos(this.angle) * 30 + this.x, sin(this.angle) * 30 + this.y);
    vertex(cos(this.angle + 110) * 30 + this.x, sin(this.angle + 110) * 30 + this.y);
    vertex(cos(this.angle + 180) * -2 + this.x, sin(this.angle + 180) * -2 + this.y);
    vertex(cos(this.angle - 110) * 30 + this.x, sin(this.angle - 110) * 30 + this.y);
    endShape(CLOSE);
  }



  // Update function to organize this object's functions and neaten and simplify main draw loop code.

  update()
  {
    if(this.y < windowHeight)
    {
      this.move();
      this.changeAngle();
      this.wallBounce();
      this.checkRocket();
      this.showColor();
      this.showInfoText();
      this.render();
    }
  }


}




// Define the landscape class

class Landscape
{

  // Constructor for the landscape class to initialize the values. Array used here!

  constructor()
   {
    this.y = windowHeight - 50;
    this.dust = new Array();
    this.dustSpeed = 2;
    this.numDustParticles = 75;
   }


  // Render function to actually draw the line (this can be replaced with a variable landscape in the future)

  render()
   {
     stroke(255);
     line(0, this.y, windowWidth, this.y);
   }


  // Function to "calculate' the dust spray around the rocket's landing site if it crashes. Will calculate dust as random circles travelling outwards
  // from the rocket's landing site outwards in the positive (up) direction.

  makeDustSpray()
  {
    if ((rocket.gameState === "landed") && (rocket.rocketState === "hasCrashed"))
    {
      while (this.dust.length < this.numDustParticles)
      {
        let thisParticle =
        {
          x: rocket.x,
          y: this.y,
          radius: random(0, 10),
          angle: random(0, -180),
          speed: this.dustSpeed
        };
        this.dust.push(thisParticle);
      }
    }
  }



  // Function to display the dust spray "calculated" above.

  renderDustSpray()
  {
    push();
    fill(255);
    for (let thisParticle of this.dust)
    {
      thisParticle.x += thisParticle.speed * cos(thisParticle.angle);
      thisParticle.y += thisParticle.speed * sin(thisParticle.angle);
      circle(thisParticle.x, thisParticle.y, thisParticle.radius)
    }
    pop();
  }



  update()
  {
    this.render();
    this.makeDustSpray();
    this.renderDustSpray();
  }


}




// Main setup and draw loops

// Setup loop - initializes the canvas, universally converts angles to degrees, and creates objects from the classes defined above.

function setup()
{

  frameRate(60);
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  rocket = new Rocket();
  landscape = new Landscape;

}




// Draw Loop - this is the main loop and will be iterated ~ 60 times per second.

function draw()
{

  background(0);
  rocket.update();
  landscape.update();

}


// Possible future improvements/stuff I will probably add for fun:
// - Integration into HTML
// - Variable landscape using the Perlin noise function (can only be done using matter.js)
// - Further optimizations to allow for future porting to other platforms
// - Proper collision detections with Matter.js and physics engines
// - Death/score counter
// - Side-scrolling, just like is present in the real game.
// - Levels/a different game mode where you navigate a maze in zero gravity
// - Start/end screen
// - Menu to choose custom colours
// - Trying to get this running on Retropie (will require extensive research and coding, part of the final project maybe?)


// :)
