var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var _ = require('underscore');
var when = require('when');
var System = require('./src/system.js');

app.listen(1080);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        }
    );
}


var systemConfig = {};
var system = new System(systemConfig);

io.on('connection', function (socket) {
    console.log("connected!");

    when.all([system.getEnvironments(), system.getServices(), system.getErrors()]).spread(
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

system.getNews().on('serviceError', function(obj) {
    io.emit('news', obj);
});



