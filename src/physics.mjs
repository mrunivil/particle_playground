
import config from './config.mjs';
import pool from './pool.mjs'

export default {

  update:()=>{
    for(let i = 0; i < pool.get().length; i++){
      const body = pool.get()[i]
      if(!body.isInactive()){
        body.addForce(config.gravity);
        body.update()
        if(body.position.y > window.innerHeight + body.h){
          pool.deSpawn(body)
        }
      }
    }
  }
}