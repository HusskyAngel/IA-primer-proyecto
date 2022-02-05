const fs = require('fs')

class ObtainInfo{

	constructor(file){
		this.file=file;
		this.data=this.readFile();
		this.map=[];
		this.playerPos="";
		this.boxesPos=[];
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
		let playerPosFound=false;
		this.data.forEach(element => 
			{
				if(element[1]!=',')
					this.map.push(element);
				else if (element[1]==',' && !playerPosFound){
					playerPosFound=true;
					this.playerPos=element;
				}else if (element[1]==','){
					this.boxesPos.push(element);
				}
			});
	}
}

module.exports= ObtainInfo;
