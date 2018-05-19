/*=============================================
Tianhai Information Technology 2013-2018
-----------------------------------------------
Tianhai Information Technology
	http://tianhai.info/
Soha Jin
	https://sohaj.in/
=============================================*/

const libRequest=require('request-promise');

let baseUrl="https://www.javbus.com";

module.exports=libRequest.defaults({
	headers: {
		'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36',
		'Referer': baseUrl
	},
	forever: true,
	baseUrl: baseUrl,
	resolveWithFullResponse: true
});

module.exports.baseUrl=baseUrl;
