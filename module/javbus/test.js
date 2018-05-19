let argv=process.argv.slice(2);
let {getInfo,getMagnetLink}=require('./');

let isOver=false;

(async function (){
	if(argv.length>=1){
		let info=await getInfo(argv[0]);
		console.log(info);
		let maglink=await getMagnetLink(info.magnetRequestUrl);
		console.log(maglink);
	}

	isOver=true;
})();

setInterval(function (){
	if(isOver){
		process.exit();
	}
},600);
