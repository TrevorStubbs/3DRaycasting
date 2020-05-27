'use strict';

//THe particle object (the thing that the rays emanate from)
class Particle{
  constructor(){
    //TODO
    this.fov = 45;
    // Start position is in the middle of the canvas
    this.pos = createVector(width/2, height/ 2);
    //An array to hold ray objects
    this.rays = [];
    //TODO
    this.heading = 0;
    //Generate the rays
    for (let a = -this.fov / 2; a < this.fov / 2; a+=1){
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  //TODO
  updateFOV(fov){
    this.fov = fov;
    this.rays = [];
    for (let a = -this.fov / 2; a < this.fov / 2; a+=1){
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  //TODO
  rotate(angle){
    this.heading += angle;
    let index = 0;
    for (let a = -this.fov / 2; a < this.fov / 2; a+=1){
      this.rays[index].setAngle(radians(a) + this.heading);
      index++;
    }
  }

  //TODO
  move(amt){
    const vel = p5.Vector.fromAngle(this.heading);
    vel.setMag(amt);
    this.pos.add(vel);
  }
  
  // update the portion of the particle
  update(x, y){
    this.pos.set(x,y);
  }

  // Look for a wall from walls array (works without walls but its better OOP with)
  look(walls){
    //TODO
    let scene = [];
    for(let i = 0; i< this.rays.length; i++){
      //TODO
      const ray = this.rays[i];
      // Start with nothing closest
      let closest = null;
      // Start looking at infinity
      let record = Infinity;
      //Walls is a global variable in sketch.js
      for(let wall of walls){
        //cast to all walls
        const pt = ray.cast(wall);
        //find the closest wall
        if(pt){
          // find distance to each wall
          const d = p5.Vector.dist(this.pos, pt);
          // If a wall is the closest make it the record
          if(d < record){
            record = d;
            closest = pt;
          }
          // return the smallest number from these 2
          record = min(d, record);          
        }
      }

      //Draw the ray if closest is not null
      if(closest){
        stroke(255, 100);
        //Draw a line from particle x,y to the closest wall's intersection.
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      //TODO
      scene[i] = record;
    }
    return scene;
  }

  //Show the particle with it's rays.
  show(){
    fill(255);
    ellipse(this.pos.x, this.pos.y , 4);
    this.look(walls);
    for (let ray of this.rays){
      ray.show();
    }
  }
}