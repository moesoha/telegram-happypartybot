/*=============================================
Tianhai Information Technology 2013-2018
-----------------------------------------------
Tianhai Information Technology
	http://tianhai.info/
Soha Jin
	https://sohaj.in/
=============================================*/

const 调度台=require('./request');
const cheerio=require('cheerio');
const 车架号解析器=require('magnet-uri');

module.exports=async function (获取车架号的相对地址){
	let 车架号信息页面;
	try{
		车架号信息页面=await 调度台({
			url: 获取车架号的相对地址,
			method: "GET"
		});
	}catch(锅){
		if(锅.response){
			if(锅.response.statusCode==404){
				return false;
			}else{
				throw(new Error('The server returned '+锅.response.statusCode));
			}
		}else{
			throw(锅);
		}
	}

	if(车架号信息页面.body.match(/There is no magnet link for this video at the moment\, please wait for others to share it\!/)){
		return [];
	}

	let 所有可发车的车架号=[];
	try{
		let 每一块车架号记录=车架号信息页面.body.match(/<tr.*>\s*<td.*>([\s\S]+?)<\/td>\s*<td.*>\s*<a.*>\s*(.*?)\s*<\/a>\s*<\/td>\s*<td.*>\s*<a.*>\s*(.*?)\s*<\/a>\s*<\/td>\s*<\/tr>/g);
		每一块车架号记录.forEach(function (这个车架号){
			let $=cheerio.load(这个车架号);
			let 车辆信息=$('a[rel="nofollow"]');
			// console.log($('a[rel="nofollow"]')[0].html());
			if(车辆信息.length>=3){
				所有可发车的车架号.push({
					url: $(车辆信息[0]).attr('href'),
					name: $(车辆信息[0]).text().trim(),
					date: $(车辆信息[2]).text().trim(),
					size: $(车辆信息[1]).text().trim()
				});
			}
		});
	}catch(锅){
		console.error(锅);
		return false;
	}
	return(所有可发车的车架号);
};
