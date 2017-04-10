/*=============================================
Tianhai Information Technology 2013-2017
-----------------------------------------------
Tianhai Information Technology
	http://tianhai.info/
Soha King
	https://soha.moe/
=============================================*/

var database={
	lib: {
		Mongo: {

		}
	},
	conn: {
		Mongo: {

		}
	}
};
database.lib.Mongo=require('mongoskin');
database.conn.Mongo=new database.lib.Mongo.db('mongodb://127.0.0.1:27017/HappyPartyTrain');
database.conn.Mongo.ObjectID=require('mongodb').ObjectID;

exports.connDatabase=database;
