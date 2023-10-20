

import {getRandomInt} from './utils.mjs';
import "./styles.css";
import pool from './pool.mjs'
import renderer from './rendering.mjs'
import physics from './physics.mjs'
// setup canvas

const canvas = document.querySelector('#board');
canvas.height = document.body.offsetHeight;
canvas.width = document.body.offsetWidth;

const ctx = canvas.getContext('2d');

function draw(){
  requestAnimationFrame(()=>{
    if(getRandomInt(0,100) > 95){
      const pos = {x:getRandomInt(0,window.innerWidth),y:-100}
      pool.spawn(pos)
    }
    physics.update();
    renderer.draw(ctx)

    ctx.fillText(pool.usage(),10,200)
    draw();
  })
}

draw();