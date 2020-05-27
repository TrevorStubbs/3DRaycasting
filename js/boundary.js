'use strict';

// Class to make the walls
class Boundary{
  constructor(x1, y1, x2, y2){
    //Vector returns an object with 3 properties {x, y, z}
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  }

  //Show function
  show(){
    //white line
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}