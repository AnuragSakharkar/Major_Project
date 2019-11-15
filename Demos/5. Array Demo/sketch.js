// Title
// Name
// Date
//
// Function

let shapes = [];



function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(300);
}



 function draw() {

   background(0);

   for (let i = shapes.length - 1; i > 0; --i) {
     if(shapes[i].y - shapes[i].radius > height) {
       shapes.splice(i, 1);
     }
     else {
      shapes[i].y += shapes[i].dy;
      fill(shapes[i].color);
      ellipse(shapes[i].x, shapes[i].y, shapes[i].radius * 2, shapes[i].radius * 2)       
     }
   }
 }


 function mouseDragged() {
  let someShape = {
    x: mouseX,
    y: mouseY,
    radius: random(10, 50),
    color: color(50, 50, 50),
    dy: random(1, 7)
  };

  shapes.push(someShape)
}