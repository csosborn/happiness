/**
 * Created by: spurcell
 * 1/11/15
 */

"use strict";

var util = require('util');

/**
 * Takes a POST body and processes it into an array of messages.
 *
 * @param body
 * @return {Array}
 */
var process = function (body) {

    var payload = JSON.parse(body.payload);

    return payload.events.map(function (event) {

        console.log("received papertrail event: " + util.inspect(event, {depth: null}));

        return {
            environment: event.facility,
            service: event.program,
            message: event.message
        };
    });
};

module.exports = process;