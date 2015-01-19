/**
 * Created by: spurcell
 * 1/11/15
 *
 * todo use the extra content in the papertrail message - link to context etc.
 */

"use strict";

var util = require('util');

/**
 * Takes a POST body and processes it into an array of messages.
 *
 * @param body
 * @return {Array}
 */
var process = function (req) {

    var payload = JSON.parse(req.body.payload);

    return payload.events;
};

module.exports = process;