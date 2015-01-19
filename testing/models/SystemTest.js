/**
 * Created by: spurcell
 * 1/18/15
 */

"use strict";

var System = require('../../models/System');
var EventEmitter = require('events').EventEmitter;

module.exports['basics'] = {

    "alerts": function (test) {

        var emitter = new EventEmitter();
        var system = new System(emitter);

        test.expect(3);

        emitter.on('alert', function (alert) {

            test.deepEqual(alert, { id: 0,
                service: 'service',
                environment: 'environment',
                name: 'alert-name',
                events: [] });
        });

        system.createAlert('service', 'environment', 'alert-name', []);

        test.deepEqual(system.getAlerts(), [{
            id: 0,
            service: 'service',
            environment: 'environment',
            name: 'alert-name',
            events: []
        }]);

        system.dismissAlert(0);

        test.deepEqual(system.getAlerts(), []);

        test.done();
    }
};