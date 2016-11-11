var connection = require('./connection.js');

//If multiple columns would be updated in a row, their names and values should be pushed into an empty array
//and then converted to a string for the SQL query statement.
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
		//SELECT all data from the designated table
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			callBack(result);
		});
	},
	//
	insertOne: function(tableName,column,val, callBack) {
		//INSERT into table (column name) VALUE ?, whose value is referenced in the connection.query method
		var queryString = 'INSERT INTO ' + tableName + ' (' + column + ') VALUE (?)';
		connection.query(queryString, val, function(result) { //Removing the err parameter makes the query work
			//if (err) throw err;
			callBack(result);
		});
	},
	updateOne: function(tableName,colToVals,condition,callBack){
		//UPDATE table SET params=vals (string from object) WHERE condition column=value
		var queryString = 'UPDATE ' + tableName + ' SET ' + objIntoSql(colToVals) + ' WHERE ' + condition + '';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			callBack(result);
		});
	}
};

//Export to models/burger.js the functions defined with the ORM object properties
module.exports = orm;
