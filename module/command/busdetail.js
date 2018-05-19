/*=============================================
Tianhai Information Technology 2013-2018
-----------------------------------------------
Tianhai Information Technology
	http://tianhai.info/
Soha Jin
	https://sohaj.in/
=============================================*/

const magnetUri=require('magnet-uri');
let javbus=require('../javbus');

let returnYMD=function (date){
	return `${date.getFullYear()}-${date.getMonth().toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
};

module.exports=async function ({message,reply,replyWithMarkdown,replyWithPhoto}){
	/*
		Return Message
		------------------------
		![](scheme://domain.tld/path/to/image.ext)
		------------------------
		bango  _series_
		*title*
		由release.releaser于release.date发行，制作商是release.producer

		标签: 1,2,3

		*name* _size_
		date
		`hash`
	*/
	let args=message.text.split(' ');
	reply('中央正在检索数据……');
	try{
		let info=await javbus.getInfo(args[1]);
		if(!info){
			reply('并没找到这个车次，可能哪里出了偏差。');
			return;
		}
		let maglnk=await javbus.getMagnetLink(info.magnetRequestUrl);
		let magnetHashSection="";
		if(maglnk){
			if(maglnk.length>0){
				maglnk.forEach(function (o){
					magnetHashSection+=`*${o.name}*  _${o.size}_ \r\n`;
					magnetHashSection+=`${o.date} \r\n`;
					magnetHashSection+=`\`${(magnetUri.decode(o.url)).infoHash}\` \r\n`;
					magnetHashSection+='------------------------ \r\n';
				});
			}else{
				magnetHashSection="很可惜，现在似乎还没有可以发车的车架号。";
			}
		}
		let replyContent="";
		replyContent+=`${info.bango} ${info.series?`_${info.series}_`:''} 系列 \r\n`;
		replyContent+=`*${info.title}* \r\n`;
		replyContent+=`${info.release.releaser?'由'+info.release.releaser:''}于${returnYMD(info.release.date)}发行${info.release.producer?'，制作商是'+info.release.producer:''} \r\n`;
		replyContent+='======================== \r\n';
		replyContent+=`标签: ${info.tag.join(', ')} \r\n`;
		replyContent+='======================== \r\n';
		replyContent+=magnetHashSection;
		replyWithPhoto(info.cover);
		replyWithMarkdown(replyContent);
	}catch(锅){
		reply('出锅了! 请联系开发者orz');
		console.error(锅);
	}
};
