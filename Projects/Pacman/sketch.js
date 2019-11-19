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

let Blinky;
let playerPac;
let maze;
let rectXOffset;
let rectYOffset;
let scalar




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



  // Update function to organize this object's functions and neaten and simplify main draw loop code.

  update()
  {
    this.render();
    this.turnInput()
    this.turn();
    this.move();
    this.teleport();
    //this.turn();
    this.checkCollision();
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
    this.theGrid = new Array();
    this.theGrid =
    [
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
      [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
    ]
    this.junctions =
    [
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
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    ]
  }



  // Render function to calculate and draw the grid

  render()
  {
    push();
    fill(0, 0, 255);
    for (let i = 0; i < this.rows; i++)
    {
      for (let j = 0; j < this.cols; j++)
      {
        if(this.theGrid[i][j])
        {
          square((j * scalar) + rectXOffset, (i * scalar) + rectYOffset, scalar);
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
    this.dotGrid = [];
  }



  // Function to calculate the positions of the dots and add them to an array

  layDots()
  {
    for (let i = 0; i < maze.cols; i++)
    {
      for (let j = 0; j < maze.rows; j++)
      {
        if (!(maze.theGrid[i, j]))
        {
          let thisDot =
          {
            x: i,
            y: j,
          }
          this.dotGrid.push(thisDot);
        }
      }
    }
  }



  // Function to render the dots and splice them out of the array if they get "eaten"

  render()
  {
    for (let i = this.dotGrid.length; i > 0; --i)
    {
      if (playerPac.xPos === this.x && playerPac.yPos === this.y)
      {
        this.dotGrid().splice(i, 1);
      }
      else
      {
        push();
        fill(255);
        circle(this.dotGrid[i].x + maze.rectXOffset, this.dotGrid[i].y, this.radius);
        pop();
      }
    }
  }



  // Update function to organize this object's functions and neaten and simplify main draw loop code.

  update()
  {
    this.layDots();
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
    this.futureX;
    this.futureY;
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
    this.bottomDist = 0;
    this.topDist = 0;
    this.leftDist = 0;
    this.rightDist = 0;
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



  // Draw the ghost as a red circle at the xAnimate and yAnimate positions of this object.

  render()
  {
    push();
    fill(255, 0, 0);
    circle(this.xAnimate * scalar + rectXOffset, this.yAnimate * scalar + rectYOffset, this.size);
    pop();
  }



  // Pick random direction (for now)

  randomTurn()
  {
    this.tempVar = floor(random([1], [5]));
    this.oldDir = this.direction;
    if (this.tempVar === 1 && this.oldDir != Directions.North && this.oldDir != Directions.South)
    {
      this.futureDirection = Directions.North
    }
    else if (this.tempVar === 2 && this.oldDir != Directions.South && this.oldDir != Directions.North)
    {
      this.futureDirection = Directions.South
    }
    else if (this.tempVar === 3 && this.oldDir != Directions.East && this.oldDir != Directions.West)
    {
      this.futureDirection = Directions.East
    }
    else if (this.oldDir != Directions.West && this.oldDir != Directions.East)
    {
      this.futureDirection = Directions.West
    }
  }



  // Turn

  turn()
  {

    if (this.moveCounter == 0)
    {
      let oldDir = this.direction;

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



  // Teleport the ghost if it goes out of the maze

  teleport()
  {
    if (this.xPos === 0 && this.yPos === 9)
    {
      this.xPos = 14;
    }
    else if (this.xPos === 14 && this.yPos === 9)
    {
      this.xPos = 0;
    }
  }



  // Set the target to be pacman's location
  target()
  {
    this.targetX = playerPac.xPos;
    this.targetY = playerPac.yPos;
  }



  // Find the way to the target tile

  pathFind()
  {
    if(!((this.xPos === 0 || this.xPos === 14) && this.yPos === 9))
    {
      if (maze.junctions[this.yPos][this.xPos])
      {
        if (!maze.theGrid[this.yPos + 1][this.xPos])
        {
          this.bottomDist = dist(this.xPos, this.yPos + 1, this.targetX, this.targetY);
        }
        if (!maze.theGrid[this.yPos - 1][this.xPos])
        {
          this.topDist = dist(this.xPos, this.yPos - 1, this.targetX, this.targetY);
        }
        if (!maze.theGrid[this.yPos][this.xPos + 1])
        {
          this.rightDist = dist(this.xPos + 1, this.yPos, this.targetX, this.targetY);
        }
        if (!maze.theGrid[this.yPos][this.xPos - 1])
        {
          this.leftDist = dist(this.xPos - 1, this.yPos, this.targetX, this.targetY);
        }
      }
    }
  }



  // Check and change future direction
  // THIS DOESN'T WORK BECAUSE YOU ARE NOT CHECKING IF THE DIRECTION IS CLEAR - FIX THIS!!!!!!!!! ADD DIRECTIONS FROM
  // THE pathFind THING TO AN ARRAY IF THEY ARE CLEAR AND THIS WILL WORK

  changeDirection()
  {
    this.minDirection = min(this.bottomDist, this.topDist, this.leftDist, this.rightDist);
    if (this.minDirection === this.bottomDist)
    {
      this.futureDirection = Directions.South;
      console.log("South is closest");
    }
    else if (this.minDirection === this.topDist)
    {
      this.futureDirection = Directions.North;
      console.log("North is closest");
    }
    else if (this.minDirection === this.leftDist)
    {
      this.futureDirection = Directions.West;
      console.log("West is closest");
    }
    else if (this.minDirection === this.rightDist)
    {
      this.futureDirection = Directions.East;
      console.log("East is closest");
    }
  }



  // Update function to organize this object's functions and neaten and simplify main draw loop code.

  update()
  {
    this.move();
    this.turn();
    //this.randomTurn();
    this.teleport();
    this.target();
    this.pathFind();
    this.changeDirection();
    this.render();
    this.checkCollision();
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




// Main setup and draw loops

// Setup loop - initializes the canvas, universally converts angles to degrees, and creates objects from the classes defined above.

function setup()
{

  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  windowResized();

  playerPac = new Pacman();
  Blinky = new Ghost();
  maze = new Grid();
  foods = new Dots();

}



// Draw Loop - this is the main loop and will be iterated 60 times per second. Update functions for all the classes are called here.

function draw()
{

  rectMode(CENTER);
  noStroke();
  background(0);

  Blinky.update();

  playerPac.update();
  maze.update();
  foods.update();

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
// - Trying to get this running on Retropie (will require extensive research and coding, part of the final project maybe?)


// :)
