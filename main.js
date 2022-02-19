//const fs = require('fs')
const ObtainInfo = require('./ObtainInfo')

info= new ObtainInfo("nivel2.txt")
console.log(info.map);
console.log(info.playerPos);
console.log(info.boxesPos);
console.log(info.goalPos);
console.log(info.map[0][0]);
console.log(info.map[3][3]);

