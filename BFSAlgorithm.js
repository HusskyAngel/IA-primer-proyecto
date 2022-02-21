const Nodo = require('./Nodo')

//BFS - Breadth First Search
class BFSAlgorithm {

    //Constructor to initialize this object
    constructor(map, inipos, boxes, goalpos, iterations) {
        this.map = map                      //World map
        this.pos = [inipos[0], inipos[1]]   //Player positions
        this.goalbox = goalpos              //Goals positions
        this.boxes = boxes                  //Boxes positions
        this.expandedNodes = []             //List of expanded nodes
        this.iter = iterations              //Number to iterations
        this.stackN = []                    //Queue of inserted nodes
    }

    //Function to apply BFS Algorithm logic
    solve() {
        let nodoActual = new Nodo
        var initialNode = new Nodo(this.pos, this.boxes, "",0,"")

        this.stackN.push(initialNode)

        while(this.stackN.length >0 ) {
            nodoActual = this.stackN.shift()

            let pos = nodoActual.pos
            let deep = nodoActual.deep
            let boxes = nodoActual.boxes
            let path = new String(nodoActual.pathN)

            if (!this.solved(boxes)) {
                if (!this.alreadyExpanded(pos,boxes)) {
                    if (nodoActual.deep < this.iter){
                        this.expandedNodes.push(nodoActual)

                        var possible = [[pos[0]-1, pos[1]],    //UP
                                        [pos[0]+1, pos[1]],    //DOWN
                                        [pos[0], pos[1]-1],    //LEFT
                                        [pos[0], pos[1]+1],    //RIGHT
                        ]

                        for(let i in possible) {
                            this.movement(pos,deep,boxes,possible[i],path)
                        }
                    }
                }
            } else {
                console.log(nodoActual.pathN)
                break
            }
        }
    }

    //Auxiliary function to expand the node and insert to stack (Generate childs of node)
    movement(pos,deep,boxes, newPos,path) {
        var newPath = path
        var choice = this.decodeMove(pos,newPos)
        if (this.map[newPos[0]][newPos[1]] != 'W' ) {
            if (this.inBox(newPos,boxes)) {
                var nextPosBox = this.direction(pos, newPos)
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

    //Auxiliary function to extract move from a position change [UP(U), DOWN(D), LEFT(L), RIGHT(R)]
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

    //Auxiliary function to verify if node was already expanded before (Consider the node position and boxes configuration positions [map state])
    alreadyExpanded(nodoId,nodoBoxes){
        for(let i in this.expandedNodes) {
            if (this.equalArray(this.expandedNodes[i].pos ,nodoId)
                && this.equalArray(this.expandedNodes[i].boxes,nodoBoxes)) {
                return true
            }
        }
        return false
    }

    //Auxiliary function to update the box position if the box was moved
    updateBox(pos, newPos,boxes){
        let box = [...boxes]
        for(let i in box) {
            if (this.equalArray(box[i],pos) ) {
                box[i] = newPos
            }
        }
        return box
    }

    //Auxiliary function to calculate the new box position
    direction(oldPos,newPos){
        var subs = [-oldPos[0]+newPos[0],-oldPos[1]+newPos[1]]
        return [newPos[0]+subs[0],subs[1]+newPos[1]]
    }

    //Auxiliary function to verify if in the actual position there is a box
    inBox(pos,boxes){
        for(let i in boxes) {
            if (this.equalArray(boxes[i],pos)) {
                return true
            }
        }
        return false
    }

    //Auxiliary function to verify if box could be moved to a free position (without box collisions and without walls)
    canMove(pos,boxes){
        return !(this.inBox(pos,boxes)) && (this.map[pos[0]][pos[1]] != 'W')
    }

    //Auxiliary function to convert two objects (ar1,ar2) into a string and compare both
    equalArray(ar1,ar2){
        return JSON.stringify(ar1) === JSON.stringify(ar2)
    }

    //Auxiliary function to verify if boxes are located on goal positions to finish the search
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
module.exports= BFSAlgorithm;