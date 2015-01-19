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

    socket.on('alert', function (alert) {
        console.log(alert);
        system.addAlert(alert.environment, alert.service, alert);
    });

});