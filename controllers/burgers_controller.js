var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

//The default path is redirected to the /burgers route
router.get('/', function(req, response) {
	response.redirect('/burgers');
});

//After redirection to the /burgers route, the default display shows all burgers from the database
router.get('/burgers', function(req, response){
	burger.all(function(data) {
		var handleObj = { burgers: data };
		response.render('index', handleObj);
	});
});

//Create a route for posting a new burger name, to be inserted to the table with the create() function
//defined from the burger model
router.post('/burgers/create', function (req, response) {
	burger.create('burger_name', [req.body.name], function (err) {
		if (err) throw err;
		response.redirect('/burgers');
	});
});

//Update THIS burger by changing its "devoured" condition from false to true (i.e., 0 to 1)
//with the condition set by the :id request parameter
router.put('/burgers/update/:id', function (req, response) {
	var condition = 'id = ' + req.params.id;
	burger.update({ devoured: req.body.devoured }, condition, function () {
		response.redirect('/burgers');
	});
});

//Export to server.js all of the functions associated with the router object
module.exports = router;
