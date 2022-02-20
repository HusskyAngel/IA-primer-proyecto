class Nodo{
    constructor(pos,box,parent,deep,id) {
        this.pos = pos
        this.boxes = box
        this.parentN = parent
        this.deep = deep
        this.id = id
    }
}
module.exports= Nodo;