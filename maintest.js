//const fs = require('fs')
const ObtainInfo = require('./ObtainInfo')
const ProfundizacionIt = require('./ProfundizacionIt')
const Amplitud = require('./Amplitud')



info= new ObtainInfo("nivel2.txt")


amplio = new Amplitud(info.map,info.playerPos,info.boxesPos,info.goalPos,64)
proiter = new ProfundizacionIt(info.map,info.playerPos,info.boxesPos,info.goalPos,64)

//console.log(JSON.stringify([[1,2],[1,5]])==JSON.stringify([[1,2],[1,5]]))
//proiter.solve()
amplio.solve()





