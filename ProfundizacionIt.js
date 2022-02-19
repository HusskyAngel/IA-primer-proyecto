
class ProfundizacionIt {
    constructor(map, inipos, boxes, goalpos, iterations) {
        this.map = map
        this.pos = [inipos[0], inipos[1]]
        this.goalbox = goalpos
        this.boxes = boxes
        this.expandedNodes = []
        this.iter = iterations
        this.stack = []
    }


    solve() {
        let nodoActual = new Nodo
        let count = 0
        var initialNode = new Nodo(this.pos, this.boxes, "", 0)
        console.log(initialNode)
        this.stack.push(initialNode)
        this.expandedNodes.push(initialNode)
        var found = false
        while(count < 10 ) {
            nodoActual = this.stack.pop()
           // console.log(nodoActual)
            /*console.log(Array(nodoActual)[0])*/
            if (!this.solved(this.boxes)) {
                if (!this.alreadyExpanded(nodoActual.pos)) {
                    if (nodoActual.deep < this.iter) {
                        this.expandedNodes.push(nodoActual)

                        var possible = [[pos[0]+1, pos[1]],    // Right
                                         [pos[0]-1, pos[1]],   // Left
                                         [pos[0], pos[1]+1],   // Down
                                         [pos[0], pos[1]-1]]   // Up
                        for(let i in possible) {
                            this.movement(pos,possible[i],nodoActual.deep)
                        }
                    }
                }
            } else {

                found = true
                this.expandedNodes.push(nodoActual)
                this.printSolution(nodoActual)
                break
            }
        count++
        }


    }

    movement(oldPos, newPos, deep) {
        if (this.map[newPos[0]][newPos[1]] != 'W') {
            if (this.inBox(newPos)) {
                var nextPosBox = this.direction(oldPos, newPos)
                if (this.canMove(nextPosBox)) {
                    var newNode = new Nodo(newPos, this.box, oldPos, deep+1)

                    this.stack.push(newNode)
                    this.expandedNodes.push(newNode)
                    this.updateBox(newPos,nextPosBox)
                }
            } else {
                var newNode = new Nodo(newPos, this.boxes, oldPos, deep+1)

                this.stack.push(newNode)
                this.expandedNodes.push(newNode)
            }
        }
    }

    alreadyExpanded(nodoId){
        for(let i in this.expandedNodes) {

            if (JSON.stringify(this.expandedNodes[i].pos) === JSON.stringify(nodoId) ) {
                return true
            }
        }
        return false
    }

    updateBox(pos, newPos){
        for(let i in this.boxes) {
            if (JSON.stringify(this.boxes[i]) === JSON.stringify(pos) ) {
                this.boxes[i] = newPos
            }
        }
    }


    direction(oldPos,newPos){
        var subs = [oldPos[0]-newPos[0],oldPos[1]-newPos[1]]
        return [newPos[0]+subs[0],subs[1]+newPos[1]]
    }



    inBox(pos){
        for(let i in this.boxes) {
            if (JSON.stringify(this.boxes[i]) === JSON.stringify(pos) ) {
                return true
            }
            return false
        }
    }


    canMove(pos){
        return !this.inBox(pos) && this.map[pos[0],pos[1]!='W']
    }




    solved(cajas) {
        for(let i in cajas){
            let flag = false
            for(let j in this.goalbox) {
                if (JSON.stringify(cajas[i]) === JSON.stringify(this.goalbox[j]) ) {
                    flag = true
                    break
                }
            }
            if(flag == false){
                return false
            }
        }
        return true
    }
    printSolution(nodo){
        return ""
    }
}
module.exports= ProfundizacionIt;