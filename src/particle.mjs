import config from './config.mjs'
import pool from './pool.mjs';
import {distance, getRandomInt} from './utils.mjs';

export class Particle{

  constructor(x,y,w,h,c){
   this.reset(x,y,w,h,c)
  }

  reset(x,y,w,h,c){
    this.w = w===undefined?4:w;
    this.h = h===undefined?4:h;
    this.c = c===undefined?'pink':c;
    
    this.force = {x:0,y:0};
    this.velocity = {x:0,y:0};
    this.position = {x:x===undefined?0:x,y:y===undefined?0:y};

    this.inactive = true;
    this.id = crypto.randomUUID()

    this.speedIndex = Math.random() * 2.5
  }

setPosition(pos){
  this.position.x = pos.x;
  this.position.y = pos.y;
}

 addForce(force){
      this.force.x += force.x;
      this.force.y += force.y;
 }

 update(){
      this.velocity.x += this.force.x * this.speedIndex;
      this.velocity.y += this.force.y * this.speedIndex;
      this.velocity.x *= config.drag ;
      this.velocity.y *= config.drag ;
      this.force.x = 0;
      this.force.y = 0;
      this.position.x += this.velocity.x ;
      this.position.y += this.velocity.y;
 }

 draw(ctx){
   ctx.fillStyle = this.c;
   ctx.fillRect((this.position.x-this.w/2)|0, (this.position.y-this.h/2)|0,this.w,this.h)
   this.drawLines(ctx);
 }

 drawLines(ctx){
  const bodies = pool.get();
  ctx.fillText(bodies.length + ' active bodies',10,10)
   // Set line width
   ctx.lineWidth = 0.25;
  ctx.beginPath();
  
  for (let i = 0; i < bodies.length; i++) {
    const body = bodies[i];
    for (let p = i + 1; p < bodies.length; p++) {
      const pody = bodies[p];
      const d = distance(body.position, pody.position);
      if(d<150){
       
        ctx.moveTo(body.position.x, body.position.y);
        ctx.lineTo(pody.position.x, pody.position.y);
       
      }
    }
  }
  ctx.stroke();
   
 }

 activate(newPos){
  this.inactive = false;
  this.reset(newPos?newPos.x:0,newPos?newPos.y:0)
 }

 deactivate(){
  this.inactive = true;
 }

 isInactive(){
   return this.inactive;
 }
}