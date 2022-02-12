const ObtainInfo= require('./ObtainInfo')

//estructura de datos para representar cada nodo del arbol
class CurrentPos{
	constructor(player_pos,boxes_pos,father_id,direction){
		this.player_pos=player_pos;
		this.boxes_pos=boxes_pos;
		this.father_id=father_id;
		this.direction=direction;
	}
}

//modifica la entrada de info para trabajar la mas facil 
function ppos( pos){
	return [parseInt(pos[0]),parseInt(pos[2])];
}
function pbox(pos){
	let aux=[];
	for (x in pos){
		aux.push([x[0],x[2]]);
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
		this.init_node= new Array( new CurrentPos(ppos(info.playerPos),pbox(info.boxesPos),"father"));
		this.nodes=[this.init_node];
	}

	//hay caja en la posicion yx?
	isThereBox(node,posy,posx){
		for(x in node.boxes_pos){
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
			let aux_count=0;
			for(x in node.boxes_pos){//hay otra caja donde voy a empujar la caja 
				if (x[0]==pushboxpos[0] && x[1]==pushboxpos[1] && aux_count==0)
					aux_count++;
				else if (x[0]==pushboxpos[0] && x[1]==pushboxpos[1] && aux_count>1)
					return [];
			}
			//correr la caja
			let boxpos=[];
			for (x in node.boxes_pos){
				if (x[0]!=posy && x[1]!=posx)
					boxpos.push(x);
			}
			boxpos.push(pushboxpos);
			let aux_return=new CurrentPos([posy,posx],boxpos,father,direction);
			return [aux_return]
		}
		else if(this.init_map[posy][posx]=='W'){ //hay muro
			return [];
		}else{ //el lugar esta disponible 
			return [new CurrentPos([posy,posx],node.boxes_pos,father,direction)]; 
		}
	}


	generateChilds(node, father_id){
		let aux_return=new Array();
		let posx=node.player_pos[1];
		let posy=node.player_pos[0];
		
		let uppos=this.generateDirection(posy,posx,'U');
		let up=this.generateNode(node,uppos[0],uppos[1],father_id,'U');
		aux_return.concat(up);
		//console.log(up);

		let dpos=this.generateDirection(posy,posx,'D');
		let down=this.generateNode(node,dpos[0],dpos[1],father_id,'D');
		aux_return.concat(down);
		console.log(down);
		let lpos=this.generateDirection(posy,posx,'L');
		let left=this.generateNode(node,lpos[0],lpos[1],father_id,'L');
		aux_return.concat(left);
		//console.log(left);

		let rpos=this.generateDirection(posy,posx,'R');
		let right=this.generateNode(node,rpos[0],rpos[1],father_id,'R');
		aux_return.concat(right);
		console.log(right);
		//console.log(this.nodes.length);
		//console.log(this.nodes[0].length);
//		console.log(aux_return);
		return aux_return;
	}

	//expande los nodos de el último nivel de el arbol 
	expandNodes(){
		let aux=[];
		let father_idc=0;
		let len=this.nodes[this.nodes.length -1].length;
		for (let w=0; w<len ;x++){
			aux.concat(this.generateChilds(this.nodes[len-1][w],father_idc));	
			console.log(aux);
			father_idc++;
		}
		this.nodes.concat([aux]);
	}

	// comprueba si el nodo es solución
	isSolution(node){
		for(x in node.boxes_pos){
			if (x[0][1] !='W')
				return false;
		}			
		return true;
	}

	//opera todas las funciones ateriores para hallar la solución 
	findSolution(){
		let solution="";
		let aux=0;
		for(let i=0; i<this.deep; i++){
			console.log("expandiendo nodos en la profundida "+ i);
			this.expandNodes();
			console.log("comenzando la profundidad"+ i);
			for (let x in this.nodes[this.nodes.length -2]){ 
				if(this.isSolution(x)){
					solution+=x.direction;
					aux+=x.father_id;
					console.log("solución encontrada \n")
					break;
				}
			}
			if (solution.length==1)
				break;
			console.log("profundidad "+ i);	
		}
		if (solution.length==0){
			console.log("solucion no encontrada en la profundidad "+ this.deep);
			return "";
		}
		for(let a=nodes.length-2; a >= 0; a--){
			aux=this.nodes[a][aux].father_id;	
			solutions= this.nodes[a][aux].direction +solutions;
		}
		return solution;
	}
}

module.exports=BusquedaAmplitud;
