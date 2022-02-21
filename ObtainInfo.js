const fs = require('fs') //Common use for the File System module

//Class for read file(.txt) and extract the information
class ObtainInfo{

	constructor(file){
		this.file=file;					//Input file
		this.data=this.readFile();
		this.map=[]; 					//World map
		this.boxesPos=[]; 				//Boxes positions
		this.goalPos=[]; 				//Goals positions
		this.playerPos=[]; 				//Player positions
		this.extractInfo();
	}

	//Read file
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

	//Extract info file, and construct our data (map,boxesPos,goalPos,playerPos)
	extractInfo(){
		let row = 0;
		let playerPosFound=	false;
		this.data.forEach(element =>
		{
			if(element[1]!==',' && element.length !== 0) {
				//this.map.push(element);
				this.map.push([]);
				for( let i in element){
					this.map[this.map.length - 1].push(element[i])

					if(element.charAt(i) === 'X')
						this.goalPos.push([row,parseInt(i)]);
				}
				row += 1;
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
}

module.exports= ObtainInfo;
