// Pacman in Javascript
// Anurag Sakharkar
// Computer Science 30 (4)
// 12 November 2019



// 2D Array/Grid used - lines 246 - 336 and the checkCollision functions of every object that has one.

// Extras for experts/Wow me factor:
//       - I completed the entire project using Object-Oriented Programming in p5.js, which allows for efficiency and scalability on an entirely new
//         level when compared to function-oriented programming.
//       - I managed to learn and effectively implement OOP in my code completely independently (learned from Daniel Shiffman - https://shiffman.net/
//         and other sources on the internet).
//       - A significant amount of the actual game mechanics is complete, all that is left to implement is pathfinding for the Ghosts, the points
//         mechanics and maybe a start screen.
//       - I collaborated with people both online and physically to try to complete aspects of this project in the most elegant way possible.
//       - I did some extensive research on stuff like the extends method and the original game mechanics and am working to implement those in the
//         most elegant and efficient way possible.
//       - I plan on expanding this project significantly (see notes at the end of the code) and will ensure that I continue to work on it alongside
//         other CS30 projects.



// Initialize variables and variable names

let oppBlinky;
let playerPac;
let maze;
let rectXOffset;
let rectYOffset;
let scalar;
let eatTheDot;
let gameMode = "PACMAN";




// Define the directions and their X, Y and angle components

let Directions =
{

  North:
  {
    x: 0,
    y: -1,
    angle: 270
  },
  South:
  {
    x: 0,
    y: 1,
    angle: 90
  },
  East:
  {
    x: 1,
    y: 0,
    angle: 0
  },
  West:
  {
    x: -1,
    y: 0,
    angle: 180
  }

};




// Define the Pacman class

class Pacman
{

  // Constructor for the Pacman class to initialize the values.

  constructor()
  {
    this.xPos = 7;
    this.yPos = 15;
    this.dotsEaten = 0;
    this.ghostsEaten = 0;
    this.moveCounter = 0;
    this.xAnimate = 0;
    this.yAnimate = 0;
    this.scoreAmount = 0;
    this.gameState = "alive";
    this.direction = Directions.West;
    this.futureDirection = Directions.West;
    this.size = 25;
    this.animationTimer = 0;
    this.animationMax = 10;
    this.pointsVal = 0;
  }



  // Move function to change the xPos/yPos of the Pacman over between blocks while the actual pacman object stays in the block. The pacman moves
  // over to the new block once the Pacman has been "rendered" in the center of that block. This is also partly why the turning mechanism is so
  // janky for now.

  move()
  {
    if(this.checkCollision())
    {
      this.xAnimate = this.xPos + (this.direction.x * ((this.moveCounter/60) * 2));
      this.yAnimate = this.yPos + (this.direction.y * ((this.moveCounter/60) * 2));

      if(this.moveCounter < 30)
      {
        this.moveCounter++;
      }
      else
      {
        this.moveCounter = 0;
        this.xPos = this.xPos + (this.direction.x);
        this.yPos = this.yPos + (this.direction.y);
      }
    }
  }



  // The turnInput function that changes futureDirection

  turnInput()
  {
    if (keyIsDown(38))
    {
     this.futureDirection = Directions.North;
    }
    if (keyIsDown(37))
    {
     this.futureDirection = Directions.West;
    }
    if (keyIsDown(40))
    {
     this.futureDirection = Directions.South;
    }
    if (keyIsDown(39))
    {
     this.futureDirection = Directions.East;
    }
  }


  // The turn function that uses futureDirection to turn

  turn()
  {
    if (this.moveCounter == 0)
    {
      let oldDir = this.direction;

      if (this.futureDirection === Directions.North && oldDir != Directions.North)
      {
        this.direction = Directions.North;
        if (!this.checkCollision())
        {
          this.direction = oldDir;
        }
      }

      if (this.futureDirection === Directions.West && oldDir != Directions.West)
      {
        this.direction = Directions.West;
        if (!this.checkCollision())
        {
          this.direction = oldDir;
        }
      }

      if (this.futureDirection === Directions.South && oldDir != Directions.South)
      {
        this.direction = Directions.South;
        if (!this.checkCollision())
        {
          this.direction = oldDir;
        }
      }

      if (this.futureDirection === Directions.East && oldDir != Directions.East)
      {
        this.direction = Directions.East;
        if (!this.checkCollision())
        {
          this.direction = oldDir;
        }
      }
    }
  }



  // Teleport function for if Pacman goes through the left or the right of the maze

  teleport()
  {
    if (this.xPos === 0 && this.yPos === 9 && this.direction === Directions.West)
    {
      this.xPos = 14;
    }
    else if (this.xPos === 14 && this.yPos === 9 && this.direction === Directions.East)
    {
      this.xPos = 0;
    }
  }



  // Collision check for the maze

  checkCollision()
  {
    let futureX = this.xPos + this.direction.x;
    let futureY = this.yPos + this.direction.y;
    return !maze.theGrid[futureY][futureX];
  }



  // Render function to draw Pacman at the xAnimate and yAnimate positions. His mouth is a black triangle (rotated around the angle value from the
  // direction) opening and closing between the animationMax and zero values.

  render()
  {
    this.animationTimer = (this.animationTimer + 1) % this.animationMax;
    let opening;
    if (this.animationTimer >= this.animationMax / 2)
    {
      opening = (this.animationMax - this.animationTimer) * 6;
    }
    else
    {
      opening = (this.animationTimer) * 6;
    }

    push();
    fill(255, 255, 0);
    circle(this.xAnimate * scalar + rectXOffset, this.yAnimate * scalar + rectYOffset, this.size);
    pop();


    push();
    fill(0, 0, 0);
    triangle(this.xAnimate * scalar + rectXOffset, this.yAnimate * scalar + rectYOffset,
      this.xAnimate * scalar + rectXOffset + cos(this.direction.angle - opening) * 15, this.yAnimate * scalar + rectYOffset + sin(this.direction.angle - opening) * 15,
      this.xAnimate * scalar + rectXOffset  + cos(this.direction.angle + opening) * 15, this.yAnimate * scalar + rectYOffset + sin(this.direction.angle + opening) * 15);
    pop();
  }


  
  // Display the score in the top left

  displayScore()
  {
    push();
    fill(255);
    textAlign(LEFT, TOP);
    textSize(scalar/2);
    text ("score = " + (this.dotsEaten * 10), windowWidth - rectXOffset, rectYOffset);
    pop();
  }



  // Update function to organize this object's functions and neaten and simplify main draw loop code.

  update()
  {
    this.render();
    this.turnInput()
    this.turn();
    this.move();
    this.teleport();
    this.checkCollision();
    this.displayScore();
  }

}




// Define the grid class (the game maze)

class Grid
{

  // Constructor for the Grid class to initialize the values. The theGrid and junctions 2D arrays essentially calculate the grid

  constructor()
  {
    this.cols = 15;
    this.rows = 21;
    this.theGrid =
    [
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
      [true, false,false,false,false,false,false,true, false,false,false,false,false,false,true],
      [true, false,true, false,true, true, false,true, false,true, true, false,true, false,true],
      [true, false,true, false,false,false,false,false,false,false,false,false,true, false,true],
      [true, false,true, false,true, false,true, true, true, false,true, false,true, false,true],
      [true, false,false,false,true, false,false,true, false,false,true, false,false,false,true],
      [true, true, true, false,true, true, false,true, false,true, true, false,true, true, true],
      [true, true, true, false,true, false,false,false,false,false,true, false,true, true, true],
      [true, true, true, false,true ,false,true, false,true, false,true, false,true, true, true],
      [false,false,false,false,false,false,true, true, true,false,false,false,false,false,false],
      [true, true, true, false,true, false,false,false,false,false,true, false,true, true, true],
      [true, true, true, false,true, false,true, true, true, false,true, false,true, true, true],
      [true, true, true, false,true, false,true, true, true, false,true, false,true, true, true],
      [true, false,false,false,false,false,false,true, false,false,false,false,false,false,true],
      [true, false,true, false,true, true, false,true, false,true, true, false,true, false,true],
      [true, false,true, false,false,false,false,false,false,false,false,false,true, false,true],
      [true, false,true, false,true, false,true, true, true, false,true, false,true, false,true],
      [true, false,false,false,true, false,false,true, false,false,true, false,false,false,true],
      [true, false,true, true, true ,true, false,true, false,true, true, true, true, false,true],
      [true, false,false,false,false,false,false,false,false,false,false,false,false,false,true],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
    ]
    this.junctions =
    [
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,true, false,true, false,false,true, false,true, false,false,true, false,true, false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,false,false,true, false,true, true, false,true, true, false,true, false,false,false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,true, false,true, false,true, true, false,true, true, false,true, false,true, false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,false,false,false,false,true, true, true, true, true, false,false,false,false,false],
      [false,false,false,false,false,false,false,true, false,false,false,false,false,false,false],
      [false,false,false,true, false,true, false,false,false,true, false,true, false,false,false],
      [false,false,false,false,false,true, false,false,false,true, false,false,false,false,false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,true, false,true, false,true, true, false,true, true, false,true, false,true, false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,false,false,true ,false,true, true, false,true, true, false,true, false,false,false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,true, false,true, false,true, true, false,true, true, false,true, false,true, false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,true, false,false,false,false,true, false,true, false,false,false,false,true, false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    ]
  }



  // Render function to calculate and draw the grid

  render()
  {
    push();
    strokeWeight(5);
    stroke(70, 70, 255);
    fill(0);
    for (let i = 0; i < this.rows; i++)
    {
      for (let j = 0; j < this.cols; j++)
      {
        if(this.theGrid[i][j])
        {
          square((j * scalar) + rectXOffset, (i * scalar) + rectYOffset, scalar + 1, 5);
        }
      }
    }
    pop();
  }



  // Update function to organize this object's functions and neaten and simplify main draw loop code.

  update()
  {
    this.render();
  }

}




// Define the Dots class

class Dots
{

  // Constructor for the Dots class to initialize the values.

  constructor()
  {
    this.radius = 5;
    this.totalDots = 0;
    this.dotGrid = [];
    this.layDots();
  }



  // Function to calculate the positions of the dots and add them to an array

  layDots()
  {
    for (let i = 0; i < maze.cols; i++)
    {
      this.dotGrid.push([]);
      for (let j = 0; j < maze.rows; j++)
      {
        if (!maze.theGrid[j][i] && j >= 4)
        {
          this.dotGrid[i].push(
            {
            x: i,
            y: j
            }
          );
          this.totalDots += 1;
        }
      }
    }
  }



  // Function to render the dots and splice them out of the array if they get "eaten"

  render()
  {
    for (let i = this.dotGrid.length - 1; i >= 0; --i)
    {
      for (let j = this.dotGrid[i].length - 1; j >= 0; --j)
      {
        if (playerPac.xPos === this.dotGrid[i][j].x && playerPac.yPos === this.dotGrid[i][j].y)
        {
          this.dotGrid[i].splice(j, 1);
          playerPac.dotsEaten += 1;
          eatTheDot.play();
        }
        else
        {
          push();
          fill(255);
          circle((this.dotGrid[i][j].x * scalar) + rectXOffset, (this.dotGrid[i][j].y * scalar) + rectYOffset, this.radius);
          pop();
        }
      }
    }
  }



  // Update function to organize this object's functions and neaten and simplify main draw loop code.

  update()
  {
    this.render();
  }

}




// Define the Ghost class

class Ghost
{

  // Constructor for the Ghost class to initialize the values.

  constructor()
  {
    this.xPos = 7;
    this.yPos = 8;
    this.moveCounter = 0;
    this.xAnimate = 0;
    this.yAnimate = 0;
    this.gameState = "chasing";
    this.direction = Directions.North;
    this.futureDirection;
    this.size = 25;
    this.frontIsClear = true;
    this.tempvar = 0;
    this.oldDir = Directions.North;

    this.targetX = playerPac.xPos;
    this.targetY = playerPac.yPos;
    this.southDist = 99999;
    this.northDist = 0;
    this.westDist = 999999;
    this.eastDist = 999999;
    this.minDirection = Directions.North;
  }



  // Move function to change the xPos/yPos of the ghost over between blocks while the actual ghost object stays in the block. The ghost moves
  // over to the new block once it has been "rendered" in the center of that block.

  move()
  {
    if(!this.checkCollision())
    {
      this.xAnimate = this.xPos + (this.direction.x * ((this.moveCounter/60) * 2));
      this.yAnimate = this.yPos + (this.direction.y * ((this.moveCounter/60) * 2));

      if(this.moveCounter < 30)
      {
        this.moveCounter++;
      }
      else
      {
        this.moveCounter = 0;
        this.xPos = this.xPos + (this.direction.x);
        this.yPos = this.yPos + (this.direction.y);
      }
    }
  }



  // Collision check for the maze

  checkCollision()
  {
    let futureX = this.xPos + this.direction.x;
    let futureY = this.yPos + this.direction.y;
    return(maze.theGrid[futureY][futureX]);
  }



  // Draw the ghost (subclass function)

  render()
  {

  }



  // Turn

  turn()
  {

    if (this.moveCounter == 0 && maze.junctions[this.yPos][this.xPos])
    {
      let oldDir = this.direction;
      this.choosePath();
      this.changeDirection();

      if (this.futureDirection === Directions.North && oldDir != Directions.North)
      {
        this.direction = Directions.North;
        if (this.checkCollision())
        {
          this.direction = oldDir;
        }
      }

      if (this.futureDirection === Directions.West && oldDir != Directions.West)
      {
        this.direction = Directions.West;
        if (this.checkCollision())
        {
          this.direction = oldDir;
        }
      }

      if (this.futureDirection === Directions.South && oldDir != Directions.South)
      {
        this.direction = Directions.South;
        if (this.checkCollision())
        {
          this.direction = oldDir;
        }
      }

      if (this.futureDirection === Directions.East && oldDir != Directions.East)
      {
        this.direction = Directions.East;
        if (this.checkCollision())
        {
          this.direction = oldDir;
        }
      }
    }
  }



  // Teleport function for if the Ghost goes through the left or the right of the maze

  teleport()
  {
    if (this.xPos === 0 && this.yPos === 9 && this.direction === Directions.West)
    {
      this.xPos = 14;
    }
    else if (this.xPos === 14 && this.yPos === 9 && this.direction === Directions.East)
    {
      this.xPos = 0;
    }
  }



  // Set the target (subclass function)

  target()
  {

  }



  // Find the way to the target tile

  choosePath()
  {
    this.target();
    if(!((this.xPos === 0 || this.xPos === 14) && this.yPos === 9))
    {

      if ((!maze.theGrid[this.yPos + 1][this.xPos]) && (this.direction != Directions.North))
      {
        this.southDist = dist(this.xPos, this.yPos + 1, this.targetX, this.targetY);
      }
      else
      {
        this.southDist = 5318008;
      }

      if ((!maze.theGrid[this.yPos - 1][this.xPos]) && (this.direction != Directions.South))
      {
        this.northDist = dist(this.xPos, this.yPos - 1, this.targetX, this.targetY);
      }
      else
      {
        this.northDist = 5318008;
      }

      if ((!maze.theGrid[this.yPos][this.xPos + 1]) && (this.direction != Directions.West))
      {
        this.eastDist = dist(this.xPos + 1, this.yPos, this.targetX, this.targetY);
      }
      else
      {
        this.eastDist = 5318008;
      }

      if ((!maze.theGrid[this.yPos][this.xPos - 1]) && (this.direction != Directions.East))
      {
        this.westDist = dist(this.xPos - 1, this.yPos, this.targetX, this.targetY);
      }
      else
      {
        this.westDist = 5318008;
      }

    }
  }



  // Check and change future direction

  changeDirection()
  {
    this.minDirection = min(this.northDist, this.westDist, this.southDist, this.eastDist);
    if (this.minDirection === this.northDist)
    {
      this.futureDirection = Directions.North;
    }
    else if (this.minDirection === this.westDist)
    {
      this.futureDirection = Directions.West;
    }
    else if (this.minDirection === this.southDist)
    {
      this.futureDirection = Directions.South
    }
    else if (this.minDirection === this.eastDist)
    {
      this.futureDirection = Directions.East;
    }
    else
    {
      let randomDir = random(0, 4);
      if (randomDir <= 1 && northDist != 5318008)
      {
        this.futureDirection = Directions.North;
      }
      else if (randomDir <= 2 && southDist != 5318008)
      {
        this.futureDirection = Directions.South;
      }
      else if (randomDir <= 3 && eastDist != 5318008)
      {
        this.futureDirection = Directions.East;
      }
      else
      {
        this.futureDirection = Directions.West;
      }
    }
  }



  // Update function to organize this object's functions and neaten and simplify main draw loop code.

  update()
  {
    this.move();
    this.turn();
    this.render();
    this.teleport();
    this.checkCollision();
  }

}



// Define the Blinky subclass

class Blinky extends Ghost
{

  // Constructor for the Blinky subclass to initialize the values.

  constructor()
  {
    super();
    this.xPos = 3;
    this.yPos = 8;
  }



  // Draw the ghost as a red circle at the xAnimate and yAnimate positions of this object.

  render()
  {
    push();
    fill(255, 0, 0);
    circle(this.xAnimate * scalar + rectXOffset, this.yAnimate * scalar + rectYOffset, this.size);
    pop();
  }



  // Target function to target Pacman's position

  target()
  {
    this.targetX = playerPac.xPos;
    this.targetY = playerPac.yPos;
  }

}



// Define the Pinky subclass

class Pinky extends Ghost
{

  // Constructor for the Pinky subclass to initialize the values.

  constructor()
  {
    super();
    this.xPos = 5;
    this.yPos = 8;
  }



  // Draw the ghost as a pink circle at the xAnimate and yAnimate positions of this object.

  render()
  {
    push();
    fill(255, 0, 255);
    circle(this.xAnimate * scalar + rectXOffset, this.yAnimate * scalar + rectYOffset, this.size);
    pop();
  }



  // Target function to target the tile four tiles ahead of Pacman's current position (unless facing up, in which case Pinky targets the tile 4)
  // up and 4 to the left of Pacman's position - vector addition overflow error in the original game

  target()
  {
    if (playerPac.direction === Directions.North)
    {
      this.targetX = playerPac.xPos - 4;
      this.targetY = playerPac.yPos - 4;
    }
    else
    {
      this.targetX = playerPac.xPos + (4 * playerPac.direction.x);
      this.targetY = playerPac.yPos + (4 * playerPac.direction.y);
    }
  }

}



// Define the Inky subclass

class Inky extends Ghost
{

  // Constructor for the Inky subclass to initialize the values.

  constructor()
  {
    super();
    this.xPos = 9;
    this.yPos = 8;
  }



  // Draw the ghost as an aqua circle at the xAnimate and yAnimate positions of this object.

  render()
  {
    push();
    fill(0, 255, 255);
    circle(this.xAnimate * scalar + rectXOffset, this.yAnimate * scalar + rectYOffset, this.size);
    pop();
  }



  // Target the tile received when you flip the vector drawn between Pacman and Blinky around 180 degrees.

  target()
  {
    let pointX;
    let pointY;
    if (playerPac.direction === Directions.North)
    {
      pointX = playerPac.xPos - 2;
      pointY = playerPac.yPos - 2;
    }
    else
    {
      pointX = playerPac.xPos + (4 * playerPac.direction.x);
      pointY = playerPac.yPos + (4 * playerPac.direction.y);
    }

    this.targetX = pointX + (pointX - oppBlinky.xPos);
    this.targetY = pointY + (pointY - oppBlinky.yPos);
  }

}



// Define the Clyde subclass

class Clyde extends Ghost
{

  // Constructor for the Clyde subclass to initialize the values.

  constructor()
  {
    super();
    this.xPos = 11;
    this.yPos = 8;
  }



  // Draw the ghost as an orange circle at the xAnimate and yAnimate positions of this object.

  render()
  {
    push();
    fill(255, 138, 10);
    circle(this.xAnimate * scalar + rectXOffset, this.yAnimate * scalar + rectYOffset, this.size);
    pop();
  }



  // If close to Pacman, target the bottom left corner but if not, target Pacman

  target()
  {
    if (dist(this.xPos, this.yPos, playerPac.xPos, playerPac.yPos) <= 7)
    {
      this.targetX = 0;
      this.targetY = 21;
    }
    else
    {
      this.targetX = playerPac.xPos;
      this.targetY = playerPac.yPos;
    }
  }

}




// Change the canvas size and reset all the other elements if the window is resized

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);

  scalar = windowHeight/21;
  rectYOffset = scalar/2;
  rectXOffset =  (windowWidth/2 - (7.5 * scalar));
}




// Manhattan distance calculation

function dist(x1, y1, x2, y2)
{
  return(abs(x1-x2) + abs(y1-y2));
}




function preload()
{
  eatTheDot = loadSound('assets/eatingSound.wav');
  eatTheBigDot = loadSound('assets/powerPelletSound.mp3');
  playSiren = loadSound('assets/sirenSound.mp3');
}




// Main setup and draw loops

// Setup loop - initializes the canvas, universally converts angles to degrees, and creates objects from the classes defined above.

function setup()
{

  frameRate(120);
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  windowResized();

  maze = new Grid();
  foods = new Dots();

  playerPac = new Pacman();

  oppBlinky = new Blinky();
  oppPinky = new Pinky();
  oppInky = new Inky();
  oppClyde = new Clyde();
}



// Draw Loop - this is the main loop and will be iterated 60 times per second. Update functions for all the classes are called here.

function draw()
{

  rectMode(CENTER);
  noStroke();
  background(0);

  if (gameMode === "MENU")
  {

  }


  else (gameMode === "PACMAN")
  {
    playerPac.update();
    maze.update();
    foods.update();

    oppBlinky.update();
    oppPinky.update();
    oppInky.update();
    oppClyde.update();
  }
}


// Possible future improvements/stuff I will probably add for fun:
// - Modes for the ghosts (chase, rest, scared) just like is present in the real game.
// - Get the points rendered and working properly
// - Further optimizations to allow for future porting to other platforms
// - Collision and death mechanisms against the ghosts
// - Death/score counter
// - Levels where the speed and timing of the Ghosts are changed
// - Start/end screen
// - Menu to choose custom colours for Pacman


// :)
