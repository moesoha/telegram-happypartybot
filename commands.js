/*=============================================
Tianhai Information Technology 2017
-----------------------------------------------
Tianhai Information Technology(T.H.I.T.)
	http://tianhai.info/
Soha King
	https://soha.moe/
=============================================*/

var db=require('./db').connDatabase.conn.Mongo;
var bus=require('./module/bus');

var commands={
	helloWorld: function (message,api){
		api.sendMessage({
			chat_id: message.chat.id,
			text: 'Hello, World.'
		});
	},
};

for(var key in bus){
	if(bus.hasOwnProperty(key)){
		commands[key]=bus[key];
	}
}

var processCommand=function (command,message,api){
	if(commands.hasOwnProperty(command)){
		commands[command](message,api);
	}
}

module.exports=processCommand;
