import pool from './pool.mjs'

export default {
  draw:(ctx)=>{
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
    for(let i = 0; i < pool.get().length; i++){
      const body = pool.get()[i];
      body.draw(ctx)
    }
  }
}