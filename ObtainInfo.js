const fs = require('fs')

class ObtainInfo{

	constructor(file){
		this.file=file;
		this.data=this.readFile();
		this.map=[];
		this.boxesPos=[];
		this.goalPos=[];
		this.playerPos=[];
		this.extractInfo();
	}
	 readFile(){
		 try {
			let data = fs.readFileSync(this.file, 'utf8');
			data = data.split(/\r?\n/);
			return data;
		} catch (err) {
			console.error(err)
			return null;
		}
	 }
	
	extractInfo(){

		var node = new Object();
		var node = {};

		let col = 0;
		let row = 0;

		let playerPosFound=	false;
		this.data.forEach(element =>
			{
				if(element[1]!==',' && element.length !== 0) {
					//this.map.push(element);
					this.map.push([]);

					for( let i in element){
						var node = {
							_val: element[i],
							_row: row,
							_col: col,
							_depth: 0,
							_parent: "",
							_boxmove: ""
						};

						this.map[row].push(node)
						//this.map.push(node)

						//this.map[this.map.length - 1].push([element[i]])

						if(element.charAt(i) === 'X')
							this.goalPos.push([row,parseInt(i)]);

						col += 1;
					}
					row += 1;
					col = 0;
				}
				else if (element[1]===',' && !playerPosFound){
					playerPosFound=true;

					for (let i = 0; i < element.length; i++) {
						if(element.charAt(i) !== ',')
							this.playerPos.push(parseInt(element.charAt(i)));
					}
					//this.playerPos.push(element);
				}else if (element[1]===','){
					this.boxesPos.push([parseInt(element[0]),parseInt(element[2])]);
				}
			});
	}

	/*solved(cajas) {
		for(let i in cajas){
			let flag = false
			for(let j in this.finbox) {
				if (JSON.stringify(cajas[i]) === JSON.stringify(this.finbox[j]) ) {
					flag = true
					break
				}
			}
			if(flag == false){
				return false
			}
		}
		return true
	}*/
}

module.exports= ObtainInfo;
