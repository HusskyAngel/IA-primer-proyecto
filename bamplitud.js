const ObtainInfo= require('./ObtainInfo')

//estructura de datos para representar cada nodo del arbol
class CurrentPos{
	constructor(player_pos,boxes_pos,father_id,direction,expanded){
		this.player_pos=player_pos;
		this.boxes_pos=boxes_pos;
		this.father_id=father_id;
		this.direction=direction;
		this.expanded=expanded;
	}
}

//modifica la entrada de info para trabajar la mas facil 
function ppos( pos){
	return [parseInt(pos[0]),parseInt(pos[2])];
}
function pbox(pos){
	let aux=[];
	for (x of pos){
		aux.push([parseInt(x[0]),parseInt(x[2])]);
	}
	return aux;
}

//clase principal que soluciona el problema 
class BusquedaAmplitud{
	
	//constructor de la clase que toma como parametro el nivel:string y la profundidad:int
	constructor (level,deep=64){
		this.deep=deep;
		let info=new ObtainInfo(level);
		this.init_map=info.map;
		this.init_node= new Array( new CurrentPos(ppos(info.playerPos),pbox(info.boxesPos),0,"father",[]));
		this.nodes=[this.init_node];
	}

	//hay caja en la posicion yx?
	isThereBox(node,posy,posx){
		for(x of node.boxes_pos){
			if(x[0]==posy && x[1]==posx)		
				return true;
		}
		return false;
	}
	// segun la posición actual y una dirección, genera la nueva posición.
	generateDirection(posy,posx,direction){
		if(direction=='U')
			return [posy- 1,posx];
		else if(direction=='D')
			return [posy + 1,posx];
		else if(direction=='L')
			return [posy,posx -1];
		else 
			return [posy,posx +1];
	}

	//se pasa el nodo con la posición a futuro, devuelve el nodo con la nueva posicion de jugador y de cajas 
	generateNode(node,posy,posx,father,direction){ //corre a una dirección no posible
		if(posy<0 || posx<0 || posy>=this.init_map.length || posx>= this.init_map[0].length)
			return [];
		else if(this.isThereBox(node,posy,posx)){ //hay caja
			let pushboxpos= this.generateDirection(posy,posx,direction);
			if(this.init_map[pushboxpos[0]][pushboxpos[1]]=="W")//hay muro donde voy a empujar la caja
				return [];
			else if((this.init_map[pushboxpos[0]][pushboxpos[1]]=="0" ||
			        this.init_map[pushboxpos[0]][pushboxpos[1]]=="X")&&
				   !(this.isThereBox(node,pushboxpos[0],pushboxpos[1])))
				{
				let a_return=[...node.boxes_pos];
				for (let r=0;r <node.boxes_pos.length; r++){
					if (a_return[r][0] ==posy && a_return[r][1]==posx)
						a_return[r]=pushboxpos;	
				}
				let expanded_aux=[...node.expanded]
				expanded_aux=expanded_aux.concat( [[posy,posx]]);
				return [new CurrentPos([posy,posx],a_return,father,direction,[])];
			}else
				return [];
		}
		else if(this.init_map[posy][posx]=='W'){ //hay muro
			return [];
		}else{ //el lugar esta disponible 
			let expanded_aux=[...node.expanded]
			expanded_aux=expanded_aux.concat([[posy,posx]]);
			return [new CurrentPos([posy,posx],node.boxes_pos,father,direction,expanded_aux)]; 
		}
	}

	//descarta ramas para evitar bucles 
	discardBranch(node){
		if (node.length ==0)
			return [];
		let aux=node[0];
		let expanded_nodes=this.nodes[this.nodes.length -1][aux.father_id].expanded;
		for (let w of aux.boxes_pos){
			if(this.init_map[w[0]][w[1]]=='X'){
				expanded_nodes=[];
				aux.expanded=[];
			}
		}
		for(let x of expanded_nodes){
			if(aux.player_pos[0] == x[0] && aux.player_pos[1] == x[1] ){
				return [];
			}
		}
		return [aux];
	}


	//genera los hijos de un nodo en especifico 
	generateChilds(node, father_id){
		var aux_return=new Array();
		let posx=node.player_pos[1];
		let posy=node.player_pos[0];
		
		let uppos=this.generateDirection(posy,posx,'U');
		var  up=this.discardBranch(this.generateNode(node,uppos[0],uppos[1],father_id,'U'));
		aux_return=aux_return.concat(up);

		let dpos=this.generateDirection(posy,posx,'D');
		let down=this.discardBranch(this.generateNode(node,dpos[0],dpos[1],father_id,'D'));
		aux_return=aux_return.concat(down);

		let lpos=this.generateDirection(posy,posx,'L');
		let left=this.discardBranch(this.generateNode(node,lpos[0],lpos[1],father_id,'L'));
		aux_return=aux_return.concat(left);

		let rpos=this.generateDirection(posy,posx,'R');
		let right=this.discardBranch(this.generateNode(node,rpos[0],rpos[1],father_id,'R'));
		aux_return=aux_return.concat(right);
		return aux_return;
	}

	//expande los nodos del último nivel del arbol 
	expandNodes(){
		let aux=[];
		let father_idc=0;
		let len=this.nodes[this.nodes.length -1].length;
		let finalpos=this.nodes.length;
		for (let w=0; w<len ;w++){
			aux=aux.concat(this.generateChilds(this.nodes[finalpos-1][w],father_idc));	
			father_idc++;
		}
		if (aux.length==0)
			console.log("vacio");
		this.nodes=this.nodes.concat([aux]);
	}

	// comprueba si el nodo es solución
	isSolution(node){
		for(x of node.boxes_pos){
			if (this.init_map[x[0]][x[1]]!='X')
				return false;
		}			
		return true;
	}

	//opera todas las funciones ateriores para hallar la solución 
	findSolution(){
		console.log(this.nodes[0][0].boxes_pos);
		for(let i=0; i<this.deep; i++){
			console.log("expandiendo nodos en la profundidad "+i);
			this.expandNodes();
			console.log("profundidad creada");	
			console.log("probando si hay una solución en el penúltimo nivel")
			let solution=this.giveSolution();
			if (solution.length>0){
				console.log("se encontro una solución");
				return solution;
			}
		}
		console.log("no se encontro la solución en la profundidad "+this.deep );
	}

	giveSolution(){
		let sol_return="";
		let aux_father=0;
		let isthere=false;
		for (let x of this.nodes[this.nodes.length -2]){
			if (this.isSolution(x)){
				isthere=true;
				aux_father=x.father_id;
				sol_return+=x.direction;
				console.log(x);
			}
		}
		if(isthere){
			for(let y=this.nodes.length - 3; y>0; y--){
				console.log(aux_father);
				sol_return=(this.nodes[y][aux_father].direction)+sol_return;
				aux_father=this.nodes[y][aux_father].father_id;
			}
			console.log(this.nodes);
		}
		return sol_return;
	}
}

module.exports=BusquedaAmplitud;

