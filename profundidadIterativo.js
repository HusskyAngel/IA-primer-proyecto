const Profundidad = require('./Profundidad')
class ProfundidadIterativo {
    constructor(map, inipos, boxes, goalpos, iterations) {
        this.map = map
        this.pos = [inipos[0], inipos[1]]
        this.goalbox = goalpos
        this.boxes = boxes
        this.iter = iterations

    }
    solve(){
        for(let i =10;i<this.iter;i++){
            proiter = new Profundidad(this.map,this.pos,this.boxes,this.goalbox,i)
            if(proiter.solve()){
                break
            }
        }
    }
}
module.exports= ProfundidadIterativo;
