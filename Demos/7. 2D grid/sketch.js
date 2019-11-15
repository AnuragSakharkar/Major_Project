// Title
// Name
// Date
//
// Function

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  background(225);
  grid = create2DArray(20, 20);
}

function draw() {
  displayGrid(grid);
}


function displayGrid(theGrid) {
  for(let y = 0; y < theGrid[0].length; y++) {
    for(let x = 0; x < theGrid[0].length; x++) {
      if(theGrid[y][x] === 0) {
        fill(255);
      }
      else{
        fill(0);
      }
      let cellSize = width/(theGrid[0].length);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}


function create2DArray(cols, rows)
{
  let someArray = [];
  for(let i = 0; i < cols; i++) {
    someArray.push([])
    for (let j = 0; j < rows; j++) {
      if (random(100) < 50) {
        someArray[i].push(1);
      }
      else {
        someArray[i].push(0);
      }
    }
  }
  return someArray;
}