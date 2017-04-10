/*=============================================
Tianhai Information Technology 2013-2017
-----------------------------------------------
Tianhai Information Technology
	http://tianhai.info/
Soha King
	https://soha.moe/
=============================================*/

var async=require('async');
var request=require('request');
var cheerio=require('cheerio');
var magnetUri=require('magnet-uri');

var 公交车调度中心="https://www.javbus.com";

function htmlStringFilter(str){
	var s=str;
	if(str.length==0){
		return "";
	}
	s=s.replace(/&/g,"&gt;");
	s=s.replace(/</g,"&lt;");
	s=s.replace(/>/g,"&gt;");
	s=s.replace(/\"/g,"&quot;");
	return s;
}

module.exports={
	busnew: function (message,api){
		// console.log(message)
		var isCensored=(message.text.split(' ')[1]) ? false : true;
		if(!message.fake){
			api.sendMessage({
				chat_id: message.chat.id,
				text: '稍等，我正在搞的事情需要请求互联网数据，可能会有点慢。'
			}).catch(function (err){
				console.log(err);
			});
		}
		request({
			uri: 公交车调度中心+'/en'+(isCensored?'':'/uncensored'),
			headers: {
				'User-Agent': 'SohaGaoShi/6.66.6666 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
			}
		},function (err,res,body){
			var $=cheerio.load(body);
			var 今天和昨天的新上车架的车=[];
			$('body').find('div.container-fluid').find('div#waterfall').children('div.item').each(function (num,element){
				if(isCensored){
					if($(this).find("button[title='Containing Magnet Links of Newest Torrent']").text()=='Today'){
						今天和昨天的新上车架的车.push({
							id: $($(this).find('date')[0]).text(),
							name: $(this).find('img').attr('title'),
							when: "today"
						});
						//console.log('got one: '+$($(this).find('date')[0]).text());
					}else if($(this).find("button[title='Containing Magnet Links of Newest Torrent']").text()=='Yesterday'){
						今天和昨天的新上车架的车.push({
							id: $($(this).find('date')[0]).text(),
							name: $(this).find('img').attr('title'),
							when: "yesterday"
						});
						//console.log('got one: '+$($(this).find('date')[0]).text());
					}
				}else{
					if($(this).find("button[title='Containing Magnet Links of Newest Torrent']").text()=='This Week'){
						今天和昨天的新上车架的车.push({
							id: $($(this).find('date')[0]).text(),
							name: $(this).find('img').attr('title'),
							when: "week"
						});
						//console.log('got one: '+$($(this).find('date')[0]).text());
					}
				}
			});
			
			var 发车时刻表="下面是"+(isCensored?'今天和昨天':'本周')+"新上车架号的车次哦~ ";
			for(var key in 今天和昨天的新上车架的车){
				if(今天和昨天的新上车架的车.hasOwnProperty(key)){
					var 一辆车=今天和昨天的新上车架的车[key];
					发车时刻表+="\r\n<i>"+htmlStringFilter(一辆车.id)+"</i>  <b>"+htmlStringFilter(一辆车.name)+"</b>\r\n";
				}
			}
			// console.log(发车时刻表)
			if(今天和昨天的新上车架的车.length<1){
				api.sendMessage({
					chat_id: message.chat.id,
					text: '最近看起来没有新车的样子。'
				}).catch(function (err){
					console.log(err);
				});
			}else{
				// console.log(message)
				api.sendMessage({
					chat_id: message.chat.id,
					parse_mode: "HTML",
					text: 发车时刻表+htmlStringFilter("\r\n要获取车子的详细信息，请"+(message.fake?'私聊机器人 @MoeSoaho_bot 并':'')+"使用“/busdetail <车次>”")
				}).catch(function (err){
					console.log(err);
				});
			}
		});
	},
	busdetail: function (message,api){
		var 车次=message.text.split(' ')[1];
		if(车次){
			if(!message.fake){
				api.sendMessage({
					chat_id: message.chat.id,
					text: '稍等，我正在搞的事情需要请求互联网数据，可能会有点慢。'
				});
			}
			request({
				uri: 公交车调度中心+"/"+车次,
				headers: {
					'User-Agent': 'SohaGaoShi/6.66.6666 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
				}
			},function (err,res,body){
				if(err || res.statusCode!=200){
					api.sendMessage({
						chat_id: message.chat.id,
						text: "完了！搞出事情了！"+(res.statusCode==404?"找不到这个车次！":("服务器返回了 "+res.statusCode))
					}).catch(function (err){
						console.log(err);
					});
				}else{
					var $=cheerio.load(body);
					var 车子的信息=$('.row.movie');
					var htmlRAW=$.html();
					var 返回="";
					var tags=[];
					api.sendPhoto({
						chat_id: message.chat.id,
						photo: 车子的信息.find('img').attr('src'),
						caption: 车子的信息.find('h3').text()
					}).catch(function (err){
						console.log(err);
					});
					
					车子的信息.find('.genre').each(function (num,element){
						tags.push($(this).children('a').text());
					});
					返回+="<b>"+htmlStringFilter($('.container').find('h3').text())+"</b>\r\n标签："+htmlStringFilter(tags.join(', '));

					获取车架号的URI="/ajax/uncledatoolsbyajax.php?gid="+htmlRAW.match(/var gid = (.+?);/)[1]+"&lang=en&uc="+htmlRAW.match(/var uc = (.+?);/)[1];
					// console.log(获取车架号的URI);
					request({
						uri: 公交车调度中心+获取车架号的URI,
						headers: {
							'User-Agent': 'SohaGaoShi/6.66.6666 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36',
							'Referer': 公交车调度中心+"/en/"+车次
						}
					},function (err2,res2,body2){
						//console.log(body2);
						if(body2.match(/There is no magnet link for this video at the moment\, please wait for others to share it\!/)){
							api.sendMessage({
								chat_id: message.chat.id,
								text: 返回+"\r\n\r\n<i>可惜现在没有能发车的车架号</i>",
								parse_mode: "HTML"
							}).catch(function (err){
								console.log(err);
							});
						}else{
							var $=cheerio.load(body2);
							var 所有可发车的车架号=[];
							$('tr').each(function (num,element){
								if($($(this).find('a')[0]).attr('href') && $($(this).find('a')[0]).attr('href').match(/magnet/)){
									所有可发车的车架号.push({
										url: $($(this).find('a')[0]).attr('href'),
										name: ($($(this).find('a')[0]).text()).replace(/ /g,''),
										date: ($($(this).find('a')[2]).text()).replace(/ /g,''),
										size: ($($(this).find('a')[1]).text()).replace(/ /g,'')
									});
								}
							});
							//console.log(所有可发车的车架号);

							var 车架号和友善的名字们="\r\n";
							for(var key in 所有可发车的车架号){
								if(所有可发车的车架号.hasOwnProperty(key)){
									车架号和友善的名字们+="<b>"+htmlStringFilter(所有可发车的车架号[key].name)+"</b> [<i>"+htmlStringFilter(所有可发车的车架号[key].size)+"</i>, <i>"+htmlStringFilter(所有可发车的车架号[key].date)+"</i>]: "+htmlStringFilter(magnetUri.decode(所有可发车的车架号[key].url).infoHash)+"\r\n";
								}
							}

							api.sendMessage({
								chat_id: message.chat.id,
								text: 返回+"\r\n"+车架号和友善的名字们,
								parse_mode: "HTML"
							}).catch(function (err){
								console.log(err);
							});
						}
					});
				}
			});
		}else{
			api.sendMessage({
				chat_id: message.chat.id,
				text: "想获取车次的具体信息，请用“/busdetail <车次>”进行查询。"
			});
		}
	}
};