const DFSAlgorithm= require('./DFSAlgorithm')

//DFSIter - Iterative Depth First Search
class DFSIterativeAlgorithm {
    constructor(map, inipos, boxes, goalpos, iterations) {
        this.map = map
        this.pos = [inipos[0], inipos[1]]
        this.goalbox = goalpos
        this.boxes = boxes
        this.iter = iterations

    }

    //This class Implements DFS-Algorithm to solve problem but in this case use a variable to limit searching
    solve(){
        for(let i =10;i<this.iter;i++){
            let dfsiter = new DFSAlgorithm(this.map,this.pos,this.boxes,this.goalbox,i)
            if(dfsiter.solve()){
                break
            }
        }
    }
}
module.exports= DFSIterativeAlgorithm;
