require([ "socketio", "System" ], function (io, System) {
	"use strict";
	
    var socket = io('http://localhost:3000/');

    var system = new System();

    socket.on('config', function (config) {
        system.addConfig(config);
    });

    socket.on('news', function (item) {
        console.log(item);
        system.setError(item.environment, item.service, item.message);
    });

});