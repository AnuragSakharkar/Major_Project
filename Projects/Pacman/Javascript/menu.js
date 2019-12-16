function drawMenu()
{
    push();
    rectMode(CENTER);
    fill(50);
    rect(windowWidth/3, windowHeight/2, scalar * 5, scalar * 5);
    rect(windowWidth * 2/3, windowHeight/2, scalar * 5, scalar * 5);
    pop();

    push();
    fill(255);
    textSize(scalar/3);
    text("CLASSIC PACMAN", windowWidth/(scalar/7.35), windowHeight/2);
    text("CUSTOM PACMAN", windowWidth/(scalar/18.35), windowHeight/2);
    pop();
}


function changeColor()
{
    
}


function runMenu()
{
    drawMenu();
    changeColor();
}

