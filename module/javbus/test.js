let argv=process.argv.slice(2);
let {getInfo,getMagnetLink,getNewMagnetList}=require('./');

let isOver=false;

(async function (){
	if(argv.length>=1){
		let info=await getInfo(argv[0]);
		console.log(info);
		let maglink=await getMagnetLink(info.magnetRequestUrl);
		console.log(maglink);
	}else{
		let list=await getNewMagnetList();
		console.log('censored',list);
		let listUn=await getNewMagnetList(true);
		console.log('uncensored',listUn);
	}

	isOver=true;
})();

setInterval(function (){
	if(isOver){
		process.exit();
	}
},600);
