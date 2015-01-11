var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('underscore');
var when = require('when');

var routes = require('./routes/index');
var ingest = require('./routes/ingest');
var update = require('./routes/update');

var System = require('./models/System.js');

var app = express();

// set up socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.set('server', server); // this is backwards and dumb but I don't see an obvious better solution right now

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/ingest', ingest);
app.use('/update', update);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var systemConfig = {};

io.on('connection', function (socket) {
    console.log("connected!");

    when.all([System.getEnvironments(), System.getServices(), System.getErrors()]).spread(
        function (environments, services, errors) {
            _.each(_.flatten([environments, services]), function(object) {
                socket.emit('config', object);
            });
            _.each(_.flatten(errors), function(object) {
                socket.emit('news', object);
            });
        }
    );

});

System.getNews().on('serviceError', function(obj) {
    io.emit('news', obj);
});


module.exports = app;