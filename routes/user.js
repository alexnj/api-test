
var db = require('../lib/db');

exports = module.exports = {};

exports.findAll = function(req, res) {
    db.query('select * from users', function(err,rows){
        res.send({'users':rows});
    });
};

exports.findById = function(req, res, next) {
    res.send('{"user":{"id":"123","email":"test@test.com"}');
    next();
};