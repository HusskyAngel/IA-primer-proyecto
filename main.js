//const fs = require('fs')
const ObtainInfo = require('./ObtainInfo')
const BusquedaAmplitud = require('./bamplitud')


let solution=new BusquedaAmplitud("nivel2.txt",3); 
let text_solution=solution.findSolution();
console.log(text_solution);

/*let info=new ObtainInfo('nivel1.txt');
console.log(info.map);
console.log(info.playerPos);
console.log(info.boxesPos); */


