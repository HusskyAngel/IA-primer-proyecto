//Structure for save every node´s data, A node is a point on our problem (world/map)
class Nodo{
    constructor(pos,box,parent,deep,path) {
        this.pos = pos //Player positions
        this.boxes = box //Boxes positions
        this.parentN = parent // Parent node
        this.deep = deep //Node depth
        this.pathN = path //Node path
    }
}
module.exports= Nodo;