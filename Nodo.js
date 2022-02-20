class Nodo{
    constructor(pos,box,parent,deep,path) {
        this.pos = pos
        this.boxes = box
        this.parentN = parent
        this.deep = deep
        this.pathN = path
    }
}
module.exports= Nodo;