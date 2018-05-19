/*=============================================
Tianhai Information Technology 2013-2018
-----------------------------------------------
Tianhai Information Technology
	http://tianhai.info/
Soha Jin
	https://sohaj.in/
=============================================*/

var _config=require('./config');
var Telegraf=require('telegraf');

const bot=new Telegraf(_config.botToken);

bot.use(function ({message}){
	console.log(message);
});

bot.startPolling();
console.log('TelegramBot started.');
