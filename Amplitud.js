const Nodo = require('./Nodo')
class Amplitud {
    constructor(map, inipos, boxes, goalpos, iterations) {
        this.map = map
        this.pos = [inipos[0], inipos[1]]
        this.goalbox = goalpos
        this.boxes = boxes
        this.expandedNodes = []
        this.iter = iterations
        this.stackN = []
    }


    solve() {
        let nodoActual = new Nodo
        let count = 0
        var initialNode = new Nodo(this.pos, this.boxes, "",0,"")
        console.log(initialNode)
        this.stackN.push(initialNode)
        var found = false

//      while(counter < 10){
        while(this.stackN.length >0 ) {
            nodoActual = this.stackN.shift()
    /*        console.log("/*")
            for(let i in this.stackN){
                console.log(this.stackN[i])
            }
            console.log("--/")
    */
            let pos = nodoActual.pos
            let deep = nodoActual.deep
            let boxes = nodoActual.boxes
            let path = new String(nodoActual.pathN)

            if (!this.solved(boxes)) {
                if (!this.alreadyExpanded(pos,boxes)) {
                    if (nodoActual.deep < this.iter){
                        this.expandedNodes.push(nodoActual)

                        var possible = [[pos[0]-1, pos[1]],   //up
                                        [pos[0]+1, pos[1]],   // Down
                                        [pos[0], pos[1]-1],   // Left
                                        [pos[0], pos[1]+1],    // Right
                                         ]
                        for(let i in possible) {
                            this.movement(pos,deep,boxes,possible[i],path)
                        }
                    }else {
                        continue
                    }
                }
            } else {
                console.log("here")
                console.log(nodoActual)
                found = true
                this.expandedNodes.push(nodoActual)
                this.printSolution(nodoActual)
                break
            }
        count++
        }
    }

    movement(pos,deep,boxes, newPos,path) {
        var newPath = path
        var choice = this.decodeMove(pos,newPos)
        if (this.map[newPos[0]][newPos[1]] != 'W' ) {
            if (this.inBox(newPos,boxes)) {
             //   console.log("pos man ",newPos)
                var nextPosBox = this.direction(pos, newPos)
             //   console.log("pos box ", nextPosBox)
                if (this.canMove(nextPosBox,boxes)) {
                    var newNode = new Nodo(newPos, this.updateBox(newPos,nextPosBox,boxes), pos, deep+1,newPath+choice)
                    this.stackN.push(newNode)
                }
            } else {
                var newNode = new Nodo(newPos, boxes, pos, deep+1,newPath+choice)
                this.stackN.push(newNode)
            }
        }
    }

    decodeMove(oldPos,newPos){
        switch(-oldPos[0]+newPos[0]){
            case -1:
                return "U"
            case 1:
                return "D"
        }
        switch(-oldPos[1]+newPos[1]){
            case -1:
                return "L"
            case 1:
                return "R"
        }


    }


    alreadyExpanded(nodoId,nodoBoxes){
        for(let i in this.expandedNodes) {
            //console.log(this.expandedNodes[i].pos ,nodoId)
           //console.log(this.expandedNodes[i].act,nodoAct)
          //  console.log (this.equalArray(this.expandedNodes[i].pos ,nodoId) && this.equalArray(this.expandedNodes[i].act,nodoAct))
            if (this.equalArray(this.expandedNodes[i].pos ,nodoId)
                && this.equalArray(this.expandedNodes[i].boxes,nodoBoxes)) {
                return true
            }
        }
        return false
    }

    updateBox(pos, newPos,boxes){
        let box = [...boxes]
        for(let i in box) {
            if (this.equalArray(box[i],pos) ) {
                box[i] = newPos
            }
        }
        return box
    }


    direction(oldPos,newPos){
        var subs = [-oldPos[0]+newPos[0],-oldPos[1]+newPos[1]]
        return [newPos[0]+subs[0],subs[1]+newPos[1]]
    }



    inBox(pos,boxes){
        for(let i in boxes) {
            if (this.equalArray(boxes[i],pos)) {
                return true
            }
        }
        return false
    }


    canMove(pos,boxes){
       // console.log("in box ", !(this.inBox(pos,boxes)))
      //  console.log("mapa ", (this.map[pos[0]][pos[1]] != 'W'),"  " )

        return !(this.inBox(pos,boxes)) && (this.map[pos[0]][pos[1]] != 'W')
    }

    equalArray(ar1,ar2){
        return JSON.stringify(ar1) === JSON.stringify(ar2)
    }


    solved(cajas) {
        for(let i in cajas){
            let flag = false
            for(let j in this.goalbox) {
                if (this.equalArray(cajas[i],this.goalbox[j]) ) {
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
module.exports= Amplitud;