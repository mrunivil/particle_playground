import { Particle } from "./particle.mjs"

const pool = new Array(100).fill(null).map(()=> new Particle());
let objects = 0;
export default {
  add:()=>{

  },
  remove:(id)=>{

  },

  get:()=>{
    return pool.filter(e=>!e.isInactive());
  },

  spawn:(pos)=>{
    const index = pool.findIndex(e=>e.isInactive());
    if(index >= 0){
      pool[index].position = pos;
      pool[index].inactive = false;
      objects += 1; 
    }
  },

  deSpawn:(particle)=>{
    particle.deactivate()
    objects -= 1;
  },
  
  usage:()=>{
    return (objects / pool.length * 100).toFixed(2) + `%` 
  }
}