// Draw a blank maze so the user can make their own maze

function drawCustom()
{
  push();
  strokeWeight(5);
  stroke(45, 45, 230);

  for (let i = 0; i < maze.rows; i++)
  {
    for (let j = 0; j < maze.cols; j++)
    {

      if (maze.customGrid[i][j])
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
  fill(255);
  rect(windowWidth - scalar * 5, windowHeight/2, scalar*3, scalar*3);
  pop();
}



// Change the status of a box from empty to full

function changeMaze()
{
  xToChange = (round(floor(mouseX - rectXOffset)/scalar));
  yToChange = (round(floor(mouseY - rectYOffset)/scalar));

  maze.customGrid[yToChange][xToChange] = !maze.customGrid[yToChange][xToChange]
}



function customUpdate()
{
  drawCustom();
}
