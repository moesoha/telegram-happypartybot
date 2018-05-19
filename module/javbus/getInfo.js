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

module.exports=async function (车次){
	let 车次信息页面;
	try{
		车次信息页面=await 调度台({
			url: 车次,
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

	let $=cheerio.load(车次信息页面.body);
	let 原始HTML=$.html();
	let 车次信息块=$('.row.movie');
	let 车次封面相框=$('.row.movie .screencap');
	let 车次信息告示板=$('.row.movie .info');
	let 车次基本信息={
		title: $($('.container').find('h3')[0]).text(),
		release: {},
		tag: []
	};

	车次基本信息.cover=$(车次封面相框).find('img').attr('src');
	let 获取车架号的相对地址="";
	try{
		获取车架号的相对地址="/ajax/uncledatoolsbyajax.php?gid="+原始HTML.match(/var gid = (.+?);/)[1]+"&lang=en&uc="+原始HTML.match(/var uc = (.+?);/)[1];
	}catch(锅){
		获取车架号的相对地址=null;
	}
	
	$(车次信息告示板).children('p').each(function (index,这一块信息){
		let 这一条=$(这一块信息).children('span.header');
		if(这一条.length==1){
			let 这一条的标题=$(这一条).text();
			$(这一条).empty();
			let 文本=$(这一块信息).text().trim();
			switch(这一条的标题){
				case '識別碼:':
					车次基本信息.bango=文本;
					break;
				case '發行日期:':
					车次基本信息.release.date=new Date(文本);
					break;
				case '製作商:':
					车次基本信息.release.producer=文本;
					break;
				case '發行商:':
					车次基本信息.release.releaser=文本;
					break;
				case '系列:':
					车次基本信息.series=文本;
					break;
			}
		}
	});
	车次基本信息.title=车次基本信息.title.replace(车次基本信息.bango,'').trim();
	$(车次信息告示板).find('span.genre').each(function (index,这一块信息){
		let 标签=$(这一块信息).text().trim();
		if(标签!='' && !$(这一块信息).attr('onmouseover')){
			车次基本信息.tag.push(标签);
		}
	});

	车次基本信息.magnetRequestUrl=获取车架号的相对地址;

	return(车次基本信息);
};
