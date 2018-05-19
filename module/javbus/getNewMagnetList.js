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

module.exports=async function (是否无码=false){
	let 车次列表页面;
	try{
		车次列表页面=await 调度台({
			url: 是否无码?'/uncensored':'/',
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

	let $=cheerio.load(车次列表页面.body);
	let 今天和昨天的新上车架的车=[];
	$('body').find('div.container-fluid').find('div#waterfall').children('div.item').each(function (){
		if(!是否无码){
			if($(this).find("button[title='包含最新出種的磁力連結']").text()=='今日新種'){
				今天和昨天的新上车架的车.push({
					bango: $($(this).find('date')[0]).text(),
					name: $(this).find('img').attr('title'),
					when: "today"
				});
				//console.log('got one: '+$($(this).find('date')[0]).text());
			}else if($(this).find("button[title='包含最新出種的磁力連結']").text()=='昨日新種'){
				今天和昨天的新上车架的车.push({
					bango: $($(this).find('date')[0]).text(),
					name: $(this).find('img').attr('title'),
					when: "yesterday"
				});
				//console.log('got one: '+$($(this).find('date')[0]).text());
			}
		}else{
			if($(this).find("button[title='包含最新出種的磁力連結']").text()=='本週新種'){
				今天和昨天的新上车架的车.push({
					bango: $($(this).find('date')[0]).text(),
					name: $(this).find('img').attr('title'),
					when: "week"
				});
				//console.log('got one: '+$($(this).find('date')[0]).text());
			}
		}
	});

	return(今天和昨天的新上车架的车);
};

module.exports.markdown=function(list=[],urlPrefix=''){
	/*
		URL Prefix example
		------------------------
		http://t.me/HappyPartyBot?start=busdetail-----BANGO-2333

		Return Content
		------------------------
		[bango](urlPrefix+bango)
		title
		[bango](urlPrefix+bango)
		title
		[bango](urlPrefix+bango)
		title
		...
	*/
	let md="";
	list.forEach(function (o){
		md+=`[${o.bango}](${urlPrefix+o.bango}) \r\n`;
		md+=`${o.name} \r\n`;
	});
	return md;
};
