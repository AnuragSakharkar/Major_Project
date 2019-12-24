function drawBlank()
{
    push();
    strokeWeight(5);
    stroke(60, 60, 255);
    fill(0);
    for (let i = 0; i < maze.rows; i++)
    {
      for (let j = 0; j < maze.cols; j++)
      {
        if(maze.customGrid[i][j])
        {
          square((j * scalar) + rectXOffset, (i * scalar) + rectYOffset, scalar + 1, 5);
        }
      }
    }
    pop();
}

 

function findJunctions()
{
  for (let i = 0; i < maze.rows; i++)
  {
    maze.junctionsNEW.push([]);
    for (let j = 0; j < maze.cols; j++)
    {

      let totalOptions = 0;


      if (maze.direction === Directions.North || maze.Direction === Directions.South)
      {
        if (maze.theGrid[i][j - 1])
        {
          totalOptions++;
        }
        if (maze.theGrid[i][j + 1])
        {
          totalOptions++
        }
      }
      else
      {
        if (maze.theGrid[i - 1][j])
        {
          totalOptions++;
        }
        if (maze.theGrid[i + 1][j])
        {
          totalOptions++
        }
      }


      if (totalOptions > 2)
      {
        maze.junctionsNEW[j].push(true);
      }
      else
      {
        maze.junctionsNEW[j].push(false);
      }
    }
  }
}



function customUpdate()
{
    drawBlank();
    findJunctions();
}