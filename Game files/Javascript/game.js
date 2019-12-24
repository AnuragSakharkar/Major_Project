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
    this.yPos = 18;
    this.lives = 3;
    this.dotsEaten = 0;
    this.isAlive = true;
    this.ghostsEaten = 0;
    this.moveCounter = 0;
    this.inverseSpeed = 20;
    this.xAnimate = 0;
    this.yAnimate = 0;
    this.score = 0;
    this.gameState = "alive";
    this.deathAvailable = false;
    this.direction = Directions.West;
    this.futureDirection = Directions.West;
    this.size = (windowHeight/maze.rows)/1.35;
    this.animationTimer = 0;
    this.animationMax = 10;
  }



  // Move function to change the xPos/yPos of the Pacman over between blocks while the actual pacman object stays in the block.

  move()
  {
    if (this.isAlive && this.checkCollision())
    {
      this.xAnimate = this.xPos + (this.direction.x * ((this.moveCounter/this.inverseSpeed) * 2));
      this.yAnimate = this.yPos + (this.direction.y * ((this.moveCounter/this.inverseSpeed) * 2));

      if(this.moveCounter < this.inverseSpeed/2)
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
    if (this.xPos === 0 && this.yPos === 12 && this.direction === Directions.West)
    {
      this.xPos = 14;
    }
    else if (this.xPos === 14 && this.yPos === 12 && this.direction === Directions.East)
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



  // Render function to draw Pacman at the xAnimate and yAnimate positions as an arc in the PIE mode for faster rendering than a picture or similar asset

  render()
  {
    if (this.isAlive)
    {
      let opening;
      this.animationTimer = (this.animationTimer + 1) % this.animationMax;

      if (this.animationTimer >= this.animationMax / 2)
      {
        opening = (this.animationMax - this.animationTimer) * 8 + 1;
      }
      else
      {
        opening = (this.animationTimer) * 8 + 1;
      }

      push();
      fill(255, 255, 0);
      arc(this.xAnimate * scalar + rectXOffset, this.yAnimate * scalar + rectYOffset, this.size, this.size, opening + this.direction.angle, this.direction.angle - opening,);
      pop();
    }
    else
    {
      this.die();
    }
  }



  // Reduce lives for initiate die()

  initiateDeath()
  {
    this.isAlive = false;
    this.animationTimer = 0;
  }



  // Die animation

  die()
  {
    this.animationTimer++;

    if (this.animationTimer < 60)
    {
      push();
      fill(255, 255, 0);
      circle(this.xAnimate * scalar + rectXOffset, this.yAnimate * scalar + rectYOffset, this.size);
      pop();
    }
    else if (this.animationTimer < 120)
    {
      let opening = (this.animationTimer - 60) * 2.95;
      push();
      fill(255, 255, 0);
      arc(this.xAnimate * scalar + rectXOffset, this.yAnimate * scalar + rectYOffset, this.size, this.size, opening + this.direction.angle, this.direction.angle - opening,);
      pop();
    }
    else
    {
      this.animationTimer = 0;
      this.lives--;
      this.isAlive = false;
      resetEverything();
    }
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
  }

}




// Define the grid class (the game maze)

class Grid
{

  // Constructor for the Grid class to initialize the values. The theGrid and junctions 2D arrays essentially calculate the grid

  constructor()
  {
    this.cols = 15;
    this.rows = 25;
    this.totalFrames = 0;
    this.customGrid = [];
    this.gridUsed;
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
      [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
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
    this.junctionsNEW = [];
  }



  // Change color if clicked

  makeMaze()
  {
    let xCoord = floor(mouseX / scalar + rectXOffset);
    let yCoord = floor(mouseY / scalar + rectYOffset);

    if (this.customGrid[yCoord][xCoord] === 1)
    {
      this.customGrid[yCoord][xCoord] = false;
    }
    else
    {
      this.customGrid[yCoord][xCoord] = true;
    }
  }



  // Render function to calculate and draw the grid

  render()
  {
    push();
    strokeWeight(5);
    stroke(60, 60, 255);
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



  // Display the score in the center

  displayText()
  {
    if ((playerPac.score) >= highScore)
    {
      highScore = playerPac.score;
      //storeItem(); FOR SCORE
    }

    push();
    fill(255);
    textAlign(LEFT, TOP);
    textSize(scalar/1.75);
    this.totalFrames += 1;

    if (this.totalFrames % 60 <= 30)
    {
      text ("1UP", (rectXOffset - (scalar / 4.5)), rectYOffset);
    }

    text("HIGH SCORE", (rectXOffset + (scalar * 4.25)), rectYOffset);
    text(highScore, (rectXOffset + (scalar * 5.8)), rectYOffset + scalar);
    text(playerPac.score, (rectXOffset - (scalar / 5)), rectYOffset + scalar);
    pop();

    let thisLifeX = rectXOffset - (scalar / 5);
    let thisLifeY = windowHeight - (scalar/2);

    for (let i = 0; i < playerPac.lives; i++)
    {
      push();
      fill(170, 170, 0);
      circle(thisLifeX, thisLifeY, scalar/1.5);
      pop();

      push();
      fill(0);
      triangle(
      thisLifeX, thisLifeY,
      thisLifeX + cos(-30) * scalar/1.5, thisLifeY + sin(-30) * scalar/1.5,
      thisLifeX  + cos(30) * scalar/1.5, thisLifeY + sin(30) * scalar/1.5);
      pop();

      thisLifeX += scalar;
    }

  }



  // Play the siren while the game is on

  playSiren()
  {
    if(!playSiren.isPlaying())
    {
      playSiren.play();
    }
  }



  // Update function to organize this object's functions and neaten and simplify main draw loop code.

  update()
  {
    this.render();
    this.displayText();
    this.playSiren();
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



  // Function to calculate the positions of the dots and add them to an array if in the maze boundaries

  layDots()
  {
    for (let i = 0; i < maze.cols; i++)
    {
      this.dotGrid.push([]);
      for (let j = 0; j < maze.rows; j++)
      {
        if (!maze.theGrid[j][i] && j > 2 && j < 24)
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
          playerPac.score += 10;
          eatTheDot.rate(playerPac.inverseSpeed/8);
          if (!eatTheDot.isPlaying())
          {
            eatTheDot.play();
          }
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
    this.yPos = 11;
    this.inverseSpeed = 40;
    this.moveCounter = 0;
    this.xAnimate = 0;
    this.yAnimate = 0;
    this.gameState = "chasing";
    this.direction = Directions.North;
    this.futureDirection;
    this.size = (windowHeight/maze.rows)/1.35;
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
      this.xAnimate = this.xPos + (this.direction.x * ((this.moveCounter/this.inverseSpeed) * 2));
      this.yAnimate = this.yPos + (this.direction.y * ((this.moveCounter/this.inverseSpeed) * 2));

      if(this.moveCounter < this.inverseSpeed/2)
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



  // Draw the ghost (subclass function because of differring colors)

  render()
  {

  }



  // Turn

  turn()
  {
    if (this.moveCounter == 0 && maze.junctions[this.yPos][this.xPos] && ((this.xPos != 7 && this.yPos != 10) || (this.xPos != 6 && this.yPos != 18) || (this.xPos != 8 && this.yPos != 18)))
    {
      let oldDir = this.direction;
      this.choosePath();
      this.changeDirection();

      if (this.futureDirection === Directions.North && oldDir != Directions.North && (this.yPos != 7 || this.yPos != 15) && (this.xPos != 6 || this.xPos != 8))
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
    if (this.xPos === 0 && this.yPos === 12 && this.direction === Directions.West)
    {
      this.xPos = 14;
    }
    else if (this.xPos === 14 && this.yPos === 12 && this.direction === Directions.East)
    {
      this.xPos = 0;
    }
  }



  // Set the target (subclass function because each ghost targets a unique point)

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



  // Reduce Pacman's lives

  kill()
  {
    if (playerPac.isAlive && this.xPos === playerPac.xPos && this.yPos === playerPac.yPos && playerPac.deathAvailable)
    {
      playerPac.initiateDeath();
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
    this.kill();
  }

}



// Define the Blinky subclass

class Blinky extends Ghost
{

  // Constructor for the Blinky subclass to initialize the values.

  constructor()
  {
    super();
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
  }



  // Draw the ghost as an orange circle at the xAnimate and yAnimate positions of this object.

  render()
  {
    push();
    fill(255, 101, 0);
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




// Reset everything except lives and score if Pacman dies.

function resetEverything()
{
  playerPac.xPos = 7;
  playerPac.yPos = 18;
  playerPac.isAlive = true;
  playerPac.ghostsEaten = 0;
  playerPac.moveCounter = 0;
  playerPac.xAnimate = 0;
  playerPac.yAnimate = 0;
  playerPac.gameState = "alive";
  playerPac.direction = Directions.West;
  playerPac.futureDirection = Directions.West;
  playerPac.animationTimer = 0;

  oppBlinky.xPos = 7;
  oppBlinky.yPos = 11;
  oppBlinky.moveCounter = 0;
  oppBlinky.gameState = "chasing";

  oppClyde.xPos = 7;
  oppClyde.yPos = 11;
  oppClyde.moveCounter = 0;
  oppClyde.gameState = "chasing";

  oppInky.xPos = 7;
  oppInky.yPos = 11;
  oppInky.moveCounter = 0;
  oppInky.gameState = "chasing";

  oppPinky.xPos = 7;
  oppPinky.yPos = 11;
  oppPinky.moveCounter = 0;
  oppPinky.gameState = "chasing";
}




// Run the game

function runGame()
{
  playerPac.update();
  maze.update();
  foods.update();

  oppBlinky.update();
  oppPinky.update();
  oppInky.update();
  oppClyde.update();
}