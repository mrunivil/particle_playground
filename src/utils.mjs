export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function distance(pos1,pos2){
  return Math.sqrt((pos2.x - pos1.x) ** 2 + (pos2.y - pos1.y) ** 2)
}