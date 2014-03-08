
var mysql      = require('mysql');
var connection = null;

module.exports.open = function(callback) {
    connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'test'
    });

    connection.connect(function(err) {
        if(err) throw err;

        console.log("Database connection established.");
        callback();
    });
};

module.exports.query = function(query, callback) {
    connection.query(query, function(err, rows, fields) {
        if(err) throw err;
        callback(err,rows,fields);
    });
};

module.exports.close = function() {
    connection.end();
}