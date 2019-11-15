// Atari Breakout in Javascript
// Anurag Sakharkar
// Computer Science 30 (4)
// 25 September 2019


// Extras for experts:
//       - Even though I didn't originally add the getElementById method, I did extensive research on it and used it properly in all my elements
//         to be able to port this to other platforms (apart from vanilla chrome on a PC) more easily further down the line.
//       - I allowed for the same object to interact with both the mouse and the keyboard, which proved quite hard to achieve unless I did it a
//         (very) certain way. The only online example I could find of this was on (https://www.google.com/search?q=atari%20breakout&tbm=isch).
//       - I collaborated with people both online and physically to try to complete aspects of this project in the most elegant way possible.
//       - I managed to figure out the unique ball bounce mechanic unique to this game and Pong (read the comments @ lines 150-152), which proved
//         be quite difficult to prove the logic of. This problem was also solved by Daniel Shiffman (although in a different, more complex manner)
//         in this codingtrain video (https://youtu.be/IIrC5Qcb2G4?t=3130) from 52:10 to 1:04:30.


// Thank you to u/jonah1956 (via discord, reddit) for helping me out w/the general framework + final formatting + logic
// Thank you to madeinouweland (https://github.com/madeinouweland) for helping me with the logic and reformatting my code
// Thank you to u/steventhate (via discord, reddit) for helping me debug and not be dumb
// Thank you to Timothy Letkeman (irl) for telling me what LERPing is and teaching me about ternary functions


// Initialize everything.
let canvas = document.getElementById("breakout_canvas"),
    context = canvas.getContext("2d"),
    difficulty = 2,
    ballRadius = 10,
    x = canvas.width / 2,
    y = canvas.height - 30,
    dx = difficulty,
    dy = difficulty * -1,
    paddleHeight = 15,
    paddleWidth = 120,
    paddleXPos = (canvas.width - paddleWidth) / 2,
    paddleSpeed = 4,
    rightKeyPressed = false,
    leftKeyPressed = false,
    brickRows = 4,
    brickColumns = 9,
    brickW = 75,
    brickH = 20,
    brickPadding = 10,
    UpBrickOffset = 30,
    LeftBrickOffset = 30;


// Initialize the table of bricks to destroy w/nested loop - columns, then rows
let bricks = [];
for (c = 0; c < brickColumns; c++) {     // Nice
  for (r = 0; r < brickRows; r++) {
    bricks.push({
      x: (c * (brickW + brickPadding)) + UpBrickOffset,
      y: (r * (brickH + brickPadding)) + LeftBrickOffset,
      status: 1
    });
  }
}




function lerp(a, b, n) {                                      //LERP function
  return ((1 - n) * a + n * b);
}

// function to draw the ball and begin
function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "lightgreen";
  context.fill();
  context.closePath();
}

// function to draw the paddle within the 2D rendering context
function drawPaddle() {
  context.beginPath();
  context.rect(paddleXPos, canvas.height - paddleHeight - 30, paddleWidth, paddleHeight);
  context.fillStyle = "blue";
  context.fill();
  context.closePath();
}

// function to draw the bricks within the 2D rendering context
function drawBricks() {
  bricks.forEach(function(brick) {
    if (!brick.status) return;
    context.beginPath();
    context.rect(brick.x, brick.y, brickW, brickH);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
  });
}

// Detect collision with brick based on where the ball is and erase the brick if collision is true
function collisionDetection() {
  bricks.forEach(function(b) {
    if (!b.status) return;

    let inBricksColumn = ((x > b.x) && (x < b.x + brickW + ballRadius));
        inBricksRow = ((y > b.y) && (y < b.y + brickH + ballRadius));

    if (inBricksColumn && inBricksRow) {
      dy = -dy;
      b.status = 0;
    }
  });
}

// Function used to reset everything for if the ball touches the "floor", this is essentially the same as the first block of code (lines 13-33)
function resetEverything() {
  canvas = document.getElementById("breakout_canvas"),
      context = canvas.getContext("2d"),
      difficulty = 2,
      ballRadius = 10,
      x = canvas.width / 2,
      y = canvas.height - 30,
      dx = difficulty,
      dy = difficulty * -1,
      paddleHeight = 15,
      paddleWidth = 120,
      paddleXPos = (canvas.width - paddleWidth) / 2,
      paddleSpeed = 4,
      rightKeyPressed = false,
      leftKeyPressed = false,
      brickRows = 4,
      brickColumns = 9,
      brickW = 75,
      brickH = 20,
      brickPadding = 10,
      UpBrickOffset = 30,
      LeftBrickOffset = 30;
}





// Main draw loop
function draw() {
  let RIGHT_ARROW = 39,                                     // Right arrow keycode so I don't have to look it up while coding
      LEFT_ARROW= 37;                                       // Left arrow keycode for the same reason ^

  context.clearRect(0, 0, canvas.width, canvas.height);     // Draw the boundary
  context.fillStyle = "black";

  drawBricks();                                             // Run the functions for everything in the canvas
  drawBall();
  drawPaddle();
  collisionDetection();

  if (hitSideWall()) {                                        // What to do if the ball hits any of the walls/paddles/floor
      dx = -dx }
  if (paddleBlock()) {                                        // Adding the unique ball bounce mechanic - where the physical paddle is
    let tempvar = (x - paddleXPos) / paddleWidth;             // straight but the reflection mechanics are of an inverted curved surface (that
    let tempvar2 = lerp(-1, 1, tempvar)                       // doesn't block the ball)
    dx = tempvar2 * difficulty
    dy = -dy}
  if (hitRoof() || paddleBlock()) {
      dy = -dy }
  if (gameOver()) {
    console.log("Death!")
    resetEverything() }

  // These functions are in the draw loop because I only use them here
  function paddleBlock() { return (hitPaddle() && ballAbovepaddle()) }
  function ballAbovepaddle() { return ((x > paddleXPos) && (x < paddleXPos + paddleWidth)) }
  function hitPaddle() { return ((y + dy) > (canvas.height - 30 - (2 * ballRadius))) }
  function gameOver() { return (hitPaddle() && !ballAbovepaddle()) }
  function hitRoof() { return ((y + dy) < ballRadius) }
  function hitSideWall() { return (((x + dx) > (canvas.width - ballRadius)) || (x + dx < ballRadius)) }
  function hitFloor() { return (((x + dx) > canvas.width - ballRadius) || (x + dx < ballRadius)) }
  function rightPressed(key) { return (key.keyCode == RIGHT_ARROW) }
  function leftPressed(key) { return (key.keyCode == LEFT_ARROW) }

  // Movement function for the keys using the fancy ternary operator format
  function keyDown(key) {
    rightKeyPressed = rightPressed(key);
    leftKeyPressed = leftPressed(key);
  }

  function keyUp(key) {
    rightKeyPressed = rightPressed(key) ? false : rightKeyPressed;
    leftKeyPressed = leftPressed(key) ? false : leftKeyPressed;
  }

  // Movement function for the mouse + move the paddle according to mouse movement
  function mouseMoveHandler(e) {
    let relativeX = (e.clientX - LeftBrickOffset * 12);
    if(relativeX > 0 && relativeX < canvas.width) {
      paddleXPos = relativeX - paddleWidth/2 ;
  }
}

  // Add an event listener to the keypress and mousemoved events.
  document.addEventListener("mousemove", mouseMoveHandler, false);
  document.addEventListener("keydown", keyDown, false);
  document.addEventListener("keyup", keyUp, false);

  // Move the paddle according to the key pressed (if the mouse isn't moved)
  let maxX = canvas.width - paddleWidth,
      minX = 0,
      paddleDelta = rightKeyPressed ? paddleSpeed : leftKeyPressed ? paddleSpeed * -1 : 0;

  paddleXPos = paddleXPos + paddleDelta;
  paddleXPos = Math.min(paddleXPos, maxX);
  paddleXPos = Math.max(paddleXPos, minX);

// Move the ball
  x += dx;
  y += dy;

}




// Refresh, this value was chosen to get a nice "tail" behind the ball without changing the code to accomodate for it
setInterval(draw, 1);





// Possible future improvements/stuff I will probably add for fun:
// - Further optimizations to allow for future porting to other platforms
// - Proper collision detections
// - Death/score counter
// - More levels
// - Start/end screen
// - Menu to choose custom colours



// :)
