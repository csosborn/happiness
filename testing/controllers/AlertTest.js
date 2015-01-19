/**
 * Created by: spurcell
 * 1/18/15
 */

"use strict";

var AlertController = require('../../controllers/Alert');
var System = require('../../models/System');
var KeyStore = require('../../models/KeyStore');
var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;

module.exports['create alert'] = {

    "throws 404 on bad key and doesn't create alert": function (test) {

        var system = new System(new EventEmitter());
        var keyStore = new KeyStore({});
        var controller = new AlertController(system, keyStore);

        test.expect(3);

        var req = {
            url: '/snork',
            method: 'post',
            params: {
                key: 'snork'
            }
        };

        var res = {

            status: function (code) {
                test.equal(code, 404);
                return res;
            },

            send: function (val) {
                test.equal(val, 'invalid key, bro');
            }
        };

        controller.createAlert(req, res);

        test.deepEqual(system.getAlerts(), []);

        test.done();
    },

    "creates alert with good key": function (test) {

        var emitter = new EventEmitter();
        var system = new System(emitter);
        var keyStore = new KeyStore({snork: 'papertrail'});

        var controller = new AlertController(system, keyStore);

        test.expect(3);

        var req = {
            url: '/snork',
            method: 'post',
            params: {
                key: 'snork'
            },
            query: {
                service: 'frisk'
            },
            body: {
                payload: '{   "events":[     {"hostname":"abc","received_at":"2011-05-18T20:30:02-07:00","severity":"Info","facility":"Staging","source_id":2,"message":"message body","program":"Yorkie","source_ip":"208.75.57.121","display_received_at":"May 18 20:30:02","id":7711561783320576,"source_name":"abc"},     {"hostname":"def","received_at":"2011-05-18T20:30:02-07:00","severity":"Info","facility":"Demo","source_id":19,"message":"A short event","program":"Torii","source_ip":"208.75.57.120","display_received_at":"May 18 20:30:02","id":7711562567655424,"source_name":"server1"}   ],   "saved_search":{     "id":42,     "name":"Important stuff",     "query":"cron OR server1",     "html_edit_url":"https://papertrailapp.com/searches/42/edit",     "html_seach_url":"https://papertrailapp.com/searches/42"   },   "max_id":7711582041804800,   "min_id":7711561783320576 }'
            }
        };

        var res = {

            status: function (code) {
                test.equal(code, 404);
                return res;
            },

            send: function (val) {
                test.equal(val, 'ok, thanks');
            }
        };

        var expectedAlert = { id: 0,
            service: 'frisk',
            environment: undefined,
            name: undefined,
            events:
                [ { hostname: 'abc',
                    received_at: '2011-05-18T20:30:02-07:00',
                    severity: 'Info',
                    facility: 'Staging',
                    source_id: 2,
                    message: 'message body',
                    program: 'Yorkie',
                    source_ip: '208.75.57.121',
                    display_received_at: 'May 18 20:30:02',
                    id: 7711561783320576,
                    source_name: 'abc' },
                    { hostname: 'def',
                        received_at: '2011-05-18T20:30:02-07:00',
                        severity: 'Info',
                        facility: 'Demo',
                        source_id: 19,
                        message: 'A short event',
                        program: 'Torii',
                        source_ip: '208.75.57.120',
                        display_received_at: 'May 18 20:30:02',
                        id: 7711562567655424,
                        source_name: 'server1' } ]
        };

        // should emit an event
        emitter.on('alert', function (alert) {
            test.deepEqual(alert, expectedAlert);
        });

        controller.createAlert(req, res);

        test.deepEqual(system.getAlerts(), [expectedAlert]);

        test.done();
    }
};