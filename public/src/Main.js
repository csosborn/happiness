define([ "socketio", "System", "views/Dashboard" ], function (io, System, Dashboard) {
	"use strict";
	
    var system = new System();

    var dashboard = new Dashboard({
        el: '#checks',
        model: system
    })

    var socket = io();

    socket.on('config', function (config) {
        system.addConfig(config);
    });

    socket.on('alert', function (item) {
        console.log(item);
        system.setError(item.environment, item.service, item.message);
    });

});