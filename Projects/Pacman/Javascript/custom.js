// Draw a blank maze so the user can make their own maze

function drawCustom()
{
  {
    push();
    strokeWeight(5);

    for (let i = 0; i < maze.rows; i++)
    {
      for (let j = 0; j < maze.cols; j++)
      {
        if (i < 3 || i === 24)
        {
          stroke(0);
        }
        else
        {
          stroke(45, 45, 230);
        }

        if (maze.customGrid[i][j] && customMode === "maze")
        {
          fill(60, 60, 255)
        }
        else
        {
          fill(0)
        }

        square((j * scalar) + rectXOffset, (i * scalar) + rectYOffset, scalar + 1, 5);
      }
    }
    pop();

    push();
    strokeWeight(5);
    stroke(45, 45, 230);
    line(windowWidth/2 - scalar * 8, windowHeight - (rectYOffset * 2.1), windowWidth/2 + scalar * 7, windowHeight - (rectYOffset * 2.1))
    pop();
    
    push();
    if (mouseX >= ((windowWidth * 6/7) - 1.5 * scalar) && mouseX <= ((windowWidth * 6/7) + 1.5 * scalar) && mouseY <= ((windowHeight/2) + 1.5 * scalar) && mouseY >= ((windowHeight/2) - 1.5 * scalar))
    {
      fill(204, 204, 0);
    }
    else
    {
      fill(255, 255, 0);
    }
    rect(windowWidth - (windowWidth/7), windowHeight/2, scalar*3, scalar*3);
    pop();

    push();
    fill(0);
    textAlign(CENTER);
    textSize(scalar/2)
    text("DONE!", windowWidth - (windowWidth/7), windowHeight/2)
    pop();
  }
}



// Change the status of a box from empty to full

function changeMaze()
{
  xToChange = (round(floor(mouseX - rectXOffset)/scalar));
  yToChange = (round(floor(mouseY - rectYOffset)/scalar));

  if (mouseX >= ((windowWidth * 6/7) - 1.5 * scalar) && mouseX <= ((windowWidth * 6/7) + 1.5 * scalar) && mouseY <= ((windowHeight/2) + 1.5 * scalar) && mouseY >= ((windowHeight/2) - 1.5 * scalar))
  {
    maze.gridUsed = maze.customGrid;
    customMode = "junctions"
    //gameMode = "PACMAN";
    foods.layDots();
  }

  else if (yToChange > 3 && yToChange < 23 && xToChange != 0 && xToChange != 14 && customMode === "maze")
  {
    maze.customGrid[yToChange][xToChange] = !maze.customGrid[yToChange][xToChange]
  }

  else if (yToChange > 3 && yToChange < 23 && xToChange != 0 && xToChange != 14 && customMode === "junctions")
  {
    maze.customJunctions[yToChange][xToChange] = !maze.customJunctions[yToChange][xToChange]
  }

}



// Draw the custom maze every time this is called

function customUpdate()
{
  drawCustom();
}
