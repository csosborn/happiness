/**
 * Created by: csosborn
 * 1/11/15
 */

"use strict";

var when = require('when');
var _ = require('underscore');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param emitter
 * @private
 */
var __ = function (emitter) {

    this.emit = emitter.emit.bind(emitter);
    this.numAlerts = 0;
    this.alerts = {};

	this.services = [
		{ type: "service", name: "Glaze", glyph: "&#x1F369;" },
		{ type: "service", name: "Frisk", glyph: "&#x1F52B;" },
		{ type: "service", name: "Yorkie", glyph: "&#x1F415;" },
		{ type: "service", name: "Torii", glyph: "&#x1F6A7;" }
	];

  	this.environments = [
  		{ type: "environment", name: "Production" },
		{ type: "environment", name: "Demo" },
		{ type: "environment", name: "Staging" },
		{ type: "environment", name: "Integration" },
		{ type: "environment", name: "Investor" },
		{ type: "environment", name: "Corral" }
	];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.getServices = function ()  {
	return when(this.services);	
};

__.prototype.getEnvironments = function ()  {
	return when(this.environments);
};

__.prototype.getAlerts = function ()  {
	return _.values(this.alerts);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates an alert.
 *
 * @param service
 * @param env
 * @param name
 * @param events
 */
__.prototype.createAlert = function (service, env, name, events) {

    var id = this.numAlerts;
    this.numAlerts++;

    var alert = {
        id: id,
        service: service,
        environment: env,
        name: name,
        events: events
    };

    this.alerts[id] = alert;
    this.emit('alert', alert);

    console.log(alert);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Dismisses the specified alert.
 *
 * @param id
 */
__.prototype.dismissAlert = function (id) {

    delete this.alerts[id];
};


module.exports = __;