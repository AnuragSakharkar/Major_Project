let mountainImage
let filteredImage

// Image Manipulation demo
// Anurag Sakharkar
// 9 Sept 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function preload(){
  mountainImage = loadImage("assets/Mountains.jpg")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  filteredImage = RGBspotlight(mountainImage);
}


function draw() {
  background(0);
  image(filteredImage, 0, 0);
}



function RGBspotlight(sourceImage) {

  let img = createImage(sourceImage.width, sourceImage.height);
  img.loadPixels();
  sourceImage.loadPixels();

  for (let x = 0; x < sourceImage.width; x++) {
    for (let y = 0; y < sourceImage.height; y++) {
      let p = sourceImage.get(x, y);

      let r = red(p);
      let g = green(p);
      let b = blue(p);

      let newValues = ((r+g+b)/3)

      if (dist(mouseX, mouseY, x, y) > 100){
        img.set(x, y, color(newValues, newValues, newValues));
      }
      else {
        img.set(x, y, color(r, g, b));
      }
    }
  }
  img.updatePixels();
  return img;
}