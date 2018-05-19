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

let args=process.argv.slice(2);
if(args.length<=1){
	console.log('Usage:'.yellow+' node channelPush "/command arg1 arg2" "@happypartytrain" "@akinabusfield"');
	process.exit();
}

let cmd=args[0].split('/').splice(1)[0].split(' ');
args=args.slice(1);

const tg=new Telegram(_config.botToken);
let me;
let commandList={};

tg.getMe().then(async function (data){
	me=data;
	console.log(me);
	console.log('TelegramBot Pusher started.');

	// 注册所有 push
	fs.readdirSync(path.join(__dirname,"module/push")).forEach(function(file){
		if((file.split('.')[1].toLowerCase())!=='js'){
			return;
		}
		let fun=require("./module/push/"+file);
		let cmd=file.split('.')[0];
		commandList[cmd]=fun;
	});

	if(commandList[cmd[0]]){
		let msg=await commandList[cmd[0]]({
			botBasicInfo: me,
			message: cmd.join(' ')
		});
		args.forEach(async function (userid){
			await tg.sendMessage(userid,msg.text,msg.extra);
		});
	}else{
		console.log('Error: '.red+'No such command `'+cmd[0]+'`.');
	}
}).catch(function (e){
	console.error(e);
});

