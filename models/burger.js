var orm = require('../config/orm.js');

var burgers = {
	all: function(callBack) {
		orm.selectAll('burgers', function(result) {
			callBack(result);
		});
	},
	// cols and vals are arrays
	create: function(columns, vals, callBack) {
		orm.insertOne('burgers', columns, vals, function(result) {
			callBack(result);
		});
	},
	update: function(objColVals, condition, callBack) {
		orm.updateOne('burgers', objColVals, condition, function(result) {
			callBack(result);
		});
	}
};

module.exports = burgers;