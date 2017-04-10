/*=============================================
Tianhai Information Technology 2013-2017
-----------------------------------------------
Tianhai Information Technology
	http://tianhai.info/
Soha King
	https://soha.moe/
=============================================*/

var _config=require('./config');
var telegram=require('telegram-bot-api');
var user=require('./user');
var commandsProcess=require('./commands');
var fs=require('fs');
var api=new telegram({
	token: _config.botToken,
	updates: {
		enabled: true
	}
});

console.log('TelegramBot started.');
api.getMe().then(function (data){
	console.log(data);
}).catch(function (err){
    console.log(err);
});

api.on('message',function (message){
	console.log(message);
	if(message && message.hasOwnProperty('text')){
		if(message.text.indexOf('/')==0){
			var atLocation=message.text.indexOf('@');
			if(atLocation==-1){
				var command=message.text.substr(1);
			}else{
				var command=message.text.substr(1,atLocation-1);
			}
			command=command.split(' ')[0];
			console.log(message.from.username+' sent a command: '+command);

			user.flushUserInfo(message,function (){
				commandsProcess(command,message,api);
			});
		}
	}
});

process.on('uncaughtException',function (err){
	console.error(err);
    fs.writeFileSync(('log_unexpected_'+(new Date().getTime().toString())),'Caught exception: '+err);
});