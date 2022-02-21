//const fs = require('fs')
const ObtainInfo = require('./ObtainInfo')
const Profundidad = require('./Profundidad')
const Amplitud = require('./Amplitud')
const ProfundidadIter = require('./profundidadIterativo')


let arg = process.argv[2]
info= new ObtainInfo(arg)


amplio = new Amplitud(info.map,info.playerPos,info.boxesPos,info.goalPos,64)
pro =    new Profundidad(info.map,info.playerPos,info.boxesPos,info.goalPos,64)
proiter = new ProfundidadIter(info.map,info.playerPos,info.boxesPos,info.goalPos,64)


pro.solve()
amplio.solve()
proiter.solve()




