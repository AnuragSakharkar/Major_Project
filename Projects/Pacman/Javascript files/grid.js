
// Define the grid class (the game maze)

class Grid
{

  // Constructor for the Grid class to initialize the values. The theGrid and junctions 2D arrays essentially calculate the grid

  constructor()
  {
    this.cols = 15;
    this.rows = 25;
    this.totalFrames = 0;
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
  
  
  
  // Update function to organize this object's functions and neaten and simplify main draw loop code.

  update()
  {
    this.render();
    this.displayText();
  }

}