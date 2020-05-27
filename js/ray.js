'use strict';

//Ray object to be attached to the particle
class Ray{
  constructor(pos, angle){
    // pos = (x, y)
    this.pos = pos;
    // Make a new vector(x,y) from an angle 0-360
    this.dir = p5.Vector.fromAngle(angle);
  }

  //TODO
  setAngle(angle){
    this.dir = p5.Vector.fromAngle(angle);
  }

  // Testing function to make sure the ray was rendering
  lookAt(x, y){
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  //Show the ray will be called by the particle
  show(){
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 10, this.dir.y * 10);
    pop();
  }

  //Wall has 2 points.
  cast(wall){
    //find the wall lines
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    // Get this ray's line positions
    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    //both x,y have the same denominator
    const den = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4);
    if(den == 0){
      return;
    }

    //Need to find t and u to see if the line will be cast
    const t = ((x1-x3) * (y3-y4) - (y1-y3) * (x3-x4)) / den;
    const u = -((x1-x2) * (y1-y3) - (y1-y2) * (x1-x4)) / den;

    //check to see if 0 < t < 1 and u > 0 
    // if true cast the line
    if( t > 0 && t < 1 && u > 0){
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);

      return pt;
    } else{
      return;
    }

  }
}