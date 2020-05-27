'use strict';

// initialize global variables
let walls = [];
let particle;
let xOff = 0;
let yOff = 10000;

//TODO
const sceneW = 400;
const sceneH = 400;
let sliderFOV;


function setup() {
  //Initialize the canvas
  var myCanvas = createCanvas(800,400);
  myCanvas.parent('viewport');

  // Instantiates i random walls
  for(let i = 0; i < 5; i++){
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);

    walls.push(new Boundary(x1, y1, x2, y2));
  }

  // Make walls for the canvas
  walls.push(new Boundary(0,0,sceneW,0));
  walls.push(new Boundary(sceneW,0,sceneW,sceneH));
  walls.push(new Boundary(sceneW, sceneH ,0,sceneH));
  walls.push(new Boundary(0,sceneH, 0, 0));


  //make the particle
  particle = new Particle();
  //TODO
  sliderFOV = createSlider(0, 360, 45);
  sliderFOV.input(changeFOV);
}

//TODO
function changeFOV(){
  const fov = sliderFOV.value();
  particle.updateFOV(fov);
}


function draw(){
  //TODO
  if(keyIsDown(65)){
    particle.rotate(-0.05);
  }else if (keyIsDown(68)){
    particle.rotate(0.05);
  } else if (keyIsDown(87)){
    particle.move(1);
  } else if(keyIsDown(83)){
    particle.move(-1);
  }
  
  // black background
  background(0);

  //Show the walls
  for (let wall of walls){
    wall.show();
  }

  //update particle's location
  // particle.update(noise(xOff)* sceneW, noise(yOff)*sceneH);
  //TODO
  // particle.update(mouseX, mouseY);
  //Show the particle's location
  particle.show();

  //noise offset
  // xOff += .01;
  // yOff += .01;

  //TODO
  const scene = particle.look(walls);
  const w = sceneW / scene.length;
  translate(sceneW, 0);
  push();
  for (let i = 0; i < scene.length; i++){
    noStroke();
    const sq = scene[i] * scene[i];
    const wSq = sceneW * sceneW;
    const b = map(sq, 0, wSq, 255, 0);
    const h = map(scene[i], 0, sceneW, sceneH, 0);
    fill(b);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH/2, w + 1, h);
  }
  pop();

}