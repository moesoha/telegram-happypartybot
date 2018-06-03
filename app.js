/*=============================================
Tianhai Information Technology 2013-2018
-----------------------------------------------
Tianhai Information Technology
	http://tianhai.info/
Soha Jin
	https://sohaj.in/
=============================================*/

require('colors');
var _config=require('./config');
var Telegraf=require('telegraf');
var Telegram=require('telegraf/telegram');
var fs=require('fs'),path=require('path');

const bot=new Telegraf(_config.botToken),tg=new Telegram(_config.botToken);

let me;
let commandList={};

tg.getMe().then(function (data){
	me=data;
	console.log(me);

	// 注册所有 command
	fs.readdirSync(path.join(__dirname,"module/command")).forEach(function(file){
		if((file.split('.')[1].toLowerCase())!=='js'){
			return;
		}
		let fun=require("./module/command/"+file);
		let cmd=file.split('.')[0];
		commandList[cmd]=fun;

		let regFunc=function (context){
			context.botBasicInfo=me;
			fun(context);
		};
		bot.command(`/${cmd}`,regFunc);
		bot.command(`/${cmd}@${me.username}`,regFunc);
	});

	bot.on('inline_query',function ({inlineQuery,answerInlineQuery}){
		// console.log(inlineQuery);
		if(inlineQuery.query.trim().length>0){
			answerInlineQuery([{
				type: 'article',
				id: 'url',
				title: inlineQuery.query,
				description: `发送一个搜索 ${inlineQuery.query} 的链接。`,
				input_message_content: {
					message_text: ` [点击来搜索 ${inlineQuery.query}](https://t.me/${me.username}?start=busdetail-----${inlineQuery.query}) `,
					parse_mode: 'Markdown'
				}
			}]);
		}
	});

	bot.on('chosen_inline_result',function ({chosenInlineResult}){
		console.log(chosenInlineResult);
	})

	bot.start(function (context){
		context.botBasicInfo=me;
		let {message}=context;
		if(message){
			let cmd="";
			message.entities.forEach(function (o){
				if(o.type=='bot_command'){
					cmd=message.text.substr(o.offset+o.length).trim().split('-----');
				}
			});
			if(commandList[cmd[0]]){
				let fakeNews=message;
				fakeNews.text='/'+cmd.join(' ');
				fakeNews.entities=[{
					offset: 0,
					length: 1+cmd[0].length,
					type: 'bot_command'
				}];
				context.message=fakeNews;
				commandList[cmd[0]](context);
			}
		}
	});

	bot.startPolling();
	console.log('TelegramBot started.');	
}).catch(function (e){
	console.error(e);
});
