const ObtainInfo = require('./ObtainInfo')
const BFSAlgorithm = require('./BFSAlgorithm')
const DFSAlgorithm = require('./DFSAlgorithm')
const DFSIterativeAlgorithm = require('./DFSIterativeAlgorithm')

//Process for pass an argument (level) to our ObtainInfo class
let arg = process.argv[2]
info= new ObtainInfo(arg)

//Process for declare and create a instance of every Algorithm
BFS = new BFSAlgorithm(info.map,info.playerPos,info.boxesPos,info.goalPos,64)
DFS =    new DFSAlgorithm(info.map,info.playerPos,info.boxesPos,info.goalPos,64)
DFSIter = new DFSIterativeAlgorithm(info.map,info.playerPos,info.boxesPos,info.goalPos,64)

//Process for invoke a solution of every Algorithm
DFS.solve()
BFS.solve()
DFSIter.solve()




