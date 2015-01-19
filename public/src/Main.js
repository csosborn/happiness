define([ "socketio", "System", "views/Dashboard" ], function (io, System, Dashboard) {
	"use strict";
	
    var system = new System();

    var dashboard = new Dashboard({
        el: 'body',
        model: system
    });
    dashboard.render();

    var socket = io();

    socket.on('config', function (config) {
        system.addConfig(config);
    });

    socket.on('alert', function (item) {
        console.log(item);
        system.addAlert(item.environment, item.service, item.message);
    });

});