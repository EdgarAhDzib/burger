var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function(req, result) {
	result.redirect('/burgers');
});

router.get('/burgers', function(req, result){
	burger.all(function(data) {
		var handleObj = { burgers: data };
		console.log(handleObj);
		result.render('index', handleObj);
	});
});

router.post('/burgers/create', function (req, result) {
	burger.create(['burger_name'], [req.body.name], function (err) {
		if (err) throw err;
		result.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function (req, result) {
	var condition = 'id = ' + req.params.id;
	console.log('condition', condition);
	burger.update({ devoured: req.body.devoured }, condition, function () {
		result.redirect('/burgers');
	});
});

module.exports = router;
