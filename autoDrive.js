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
		"@akinabusfield",
		"@happypartytrain"
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

	let i=0;
	async.whilst(function (){
		return(i<bus.chats.length);
	},function (callback){
		console.log(data);
		api.getChat({
			chat_id: bus.chats[i]
		}).then(function (data){
			let fakeMessageNow=fakeMessage;
			fakeMessageNow.chat=data;
			bus.orz.busnew(fakeMessageNow,api,function (){
				callback(null);
			});
		});
		i++;
	},function (err){
		if(err){
			console.error(err);
		}
		process.exit();
	});
}
