/*=============================================
Tianhai Information Technology 2013-2017
-----------------------------------------------
Tianhai Information Technology
	http://tianhai.info/
Soha King
	https://soha.moe/
=============================================*/

var _config=require('./config');
var async=require('async');
var telegram=require('telegram-bot-api');
var bus={
	chats: [
		"@akinabusfield"
	],
	orz: require('./module/bus')
};

var api=new telegram({
	token: _config.botToken
});

console.log('TelegramBot Channel started.');
api.getMe().then(function (data){
	console.log(data);
}).catch(function (err){
    console.log(err);
});

var argv=process.argv.slice(2);

if(argv[0]=='busnew'){
	if(argv[1]=='uncensored'){
		var fakeMessage={
			chat: {},
			text: '/busnew uncensored',
			fake: true
		};
	}else{
		var fakeMessage={
			chat: {},
			text: '/busnew',
			fake: true
		};
	}
	
	async.every(bus.chats,function (chat,callback){
		api.getChat({
			chat_id: chat
		}).then(function (data){
			console.log(data);
			let fakeMessageNow=fakeMessage;
			fakeMessageNow.chat=data;
			bus.orz.busnew(fakeMessageNow,api);
			callback(null);
		});
	},function (err){
		console.log(err);
	});
}