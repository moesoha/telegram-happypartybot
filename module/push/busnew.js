/*=============================================
Tianhai Information Technology 2013-2018
-----------------------------------------------
Tianhai Information Technology
	http://tianhai.info/
Soha Jin
	https://sohaj.in/
=============================================*/

let javbus=require('../javbus');

module.exports=async function ({botBasicInfo,message}){
	let args=message.split(' ');
	try{
		let isUncensored=args[1]?true:false;
		let listArray=await javbus.getNewMagnetList(isUncensored);
		if(!listArray || listArray.length<=0){
			return({
				text: '似乎暂时没有新车要发的样子，请过会儿再试试吧。',
				extra: {}
			});
		}
		let listMarkdown=javbus.getNewMagnetList.markdown(listArray,`https://t.me/${botBasicInfo.username}?start=busdetail-----`);
		return({
			text: `下面是这${isUncensored?'周':'两天'}有新车架号的车次哦!\r\n${listMarkdown}\r\n要获取车次的详细信息，请在上面点击车次或者私聊 @${botBasicInfo.username.replace(/\_/g,'\\_')} 发送 \`/busdetail <车次>\` 。`,
			extra: {
				parse_mode: 'Markdown'
			}
		});
	}catch(锅){
		reply('出锅了! 请联系开发者orz');
		console.error(锅);
	}
};
