
/**
 * Module dependencies.
 */

var express  = require('express'),
    http     = require('http'),
    db       = require('./lib/db');

/**
 * API modules
 */
var user     = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');
app.disable('etag');
app.use(express.json({strict: true}));
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/v1/users', user.findAll);
app.get('/v1/user/:id', user.findById);

db.open(function() {
    http.createServer(app).listen(app.get('port'), function(){
        console.log('API Server listening on port ' + app.get('port'));
    });
});
