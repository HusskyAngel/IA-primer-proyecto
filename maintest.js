//const fs = require('fs')
const ObtainInfo = require('./ObtainInfo')
const ProfundizacionIt = require('./ProfundizacionIt')



info= new ObtainInfo("nivel1.txt")



proiter = new ProfundizacionIt(info.map,info.playerPos,info.boxesPos,info.goalPos,64)
//console.log(JSON.stringify(0)==JSON.stringify(0))
proiter.solve()





