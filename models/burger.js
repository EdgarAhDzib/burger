var orm = require('../config/orm.js');

var burgers = {
	//selectAll is the first of three functions imported from the ORM properties defined in orm.js
	all: function(callBack) {
		orm.selectAll('burgers', function(result) {
			callBack(result);
		});
	},
	
	//For the purpose of this app, the column is the 'burger_name' string, and val is passed as an array
	create: function(column, val, callBack) {
		var valToString = String(val);
		orm.insertOne('burgers', column, valToString, function(result) {
			callBack(result);
		});
	},

	//objColVals passes the {devoured:true} object, and the condition is an 'id=NUMERIC' string
	update: function(objColVals, condition, callBack) {
		orm.updateOne('burgers', objColVals, condition, function(result) {
			callBack(result);
		});
	}
};

//Export the burgers object to burgers_controller
module.exports = burgers;