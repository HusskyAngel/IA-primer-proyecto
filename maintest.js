//const fs = require('fs')
const ObtainInfo = require('./ObtainInfo')
const ProfundizacionIt = require('./ProfundizacionIt')



info= new ObtainInfo("nivel2.txt")
console.log(info.map);
console.log(info.playerPos);
console.log(info.boxesPos);


proiter = new ProfundizacionIt(info.map,info.playerPos,info.boxesPos)
console.log(proiter.solve())

