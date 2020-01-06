// Draw the buttons if in the menu mode and change their color if the mouse is over them

function drawMenu()
{
  push();
  rectMode(CENTER);
  if (mouseX > (windowWidth/3 - scalar * 2.5) && mouseX < (windowWidth/3 + scalar * 2.5) && mouseY < (windowHeight/2 + scalar * 2.5) && mouseY > (windowHeight/2 - scalar * 2.5))
  {
    fill(255, 255, 255);
  }
  else
  {
    fill(75);
  }
  rect(windowWidth/3, windowHeight/2, scalar * 5, scalar * 5);
  pop();

  push();
  rectMode(CENTER);
  if (mouseX > (windowWidth * (2/3) - scalar * 2.5) && mouseX < (windowWidth * (2/3) + scalar * 2.5) && mouseY < (windowHeight/2 + scalar * 2.5) && mouseY > (windowHeight/2 - scalar * 2.5))
  {
    fill(255, 255, 255);
  }
  else
  {
    fill(75);
  }
  rect(windowWidth * (2/3), windowHeight/2, scalar * 5, scalar * 5);
  pop();

  push();
  textAlign(CENTER);
  fill(0);
  textSize(scalar/3);
  text("CLASSIC PACMAN", windowWidth/3, windowHeight/2);
  text("CUSTOM PACMAN", windowWidth * (2/3), windowHeight/2);
  pop();
}



// Change the gameMode when the mouse is clicked

function changeGameMode()
{
  if (mouseX > (windowWidth/3 - scalar * 2.5) && mouseX < (windowWidth/3 + scalar * 2.5) && mouseY < (windowHeight/2 + scalar * 2.5) && mouseY > (windowHeight/2 - scalar * 2.5))
  {
    gameMode = "PACMAN";
    maze.gridUsed = maze.theGrid;
    maze.findJunctions();
    isCustom = false;
    foods.layDots();
  }

  else if (mouseX > (windowWidth * (2/3) - scalar * 2.5) && mouseX < (windowWidth * (2/3) + scalar * 2.5) && mouseY < (windowHeight/2 + scalar * 2.5) && mouseY > (windowHeight/2 - scalar * 2.5))
  {
    gameMode = "CUSTOM";
    isCustom = true;
  }
}



// "Update" function for the menu

function runMenu()
{
  drawMenu();
}
