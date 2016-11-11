var mysql = require('mysql');

var source = {
	localhost: {
		port: 3306,
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'burgers_db'
	},
	jawsDB: {
		port: 3306,
		host: 'ehc1u4pmphj917qf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
		user: 'pz2gwy79xd0ibuz5',
		password: 'a9oiop585yh5tzav',
		database: 'o75ge8yq4ijl75cu'
	}
}

var connection = mysql.createConnection(source.jawsDB);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;