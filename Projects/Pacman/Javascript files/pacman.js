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
    this.direction = Directions.West;
    this.futureDirection = Directions.West;
    this.size = 25;
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



  // Render function to draw Pacman at the xAnimate and yAnimate positions. His mouth is a black triangle (rotated around the angle value from the
  // direction) opening and closing between the animationMax and zero values.

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
    this.lives--;
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
