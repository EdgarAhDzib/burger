var connection = require('./connection.js');

function printQuestionMarks(len) {
	var questionArr = [];
	for (var i = 0; i < len; i++) {
		questionArr.push('?');
	}
	return questionArr.toString();
}

function objIntoSql(obj){
	var objArray = [];
	for (var key in obj){
		if (obj.hasOwnProperty(key)){
			objArray.push(key + '=' + obj[key]);
		}
	}
	return objArray.toString();
}

var orm = {
	selectAll: function(tableInput, callBack) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			callBack(result);
		});
	},
	insertOne: function(tableName,columns,vals) {
		var queryString = 'INSERT INTO ' + tableName + ' (' + columns.toString() + ') VALUES (' + printQuestionMarks(vals.length) + ');'
		connection.query(queryString, vals, function(err) {
			if (err) throw err;
		});
	},
	updateOne: function(tableName,colToVals,condition,callBack){
		//UPDATE table SET params=vals (array) WHERE condition column=value
		var queryString = 'UPDATE ' + tableName + ' SET ' + objIntoSql(colToVals) + ' WHERE ' + condition + '';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			callBack(result);
		});
	}
};

module.exports = orm;
