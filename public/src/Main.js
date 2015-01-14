define([ "socketio", "System", "views/Dashboard" ], function (io, System, Dashboard) {
	"use strict";
	
    var system = new System();

    var dashboard = new Dashboard({
        el: '#checks',
        model: system
    })

    var socket = io('http://localhost:3000/');

    socket.on('config', function (config) {
        system.addConfig(config);
    });

    socket.on('news', function (item) {
        console.log(item);
        system.setError(item.environment, item.service, item.message);
    });

});