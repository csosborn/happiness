var when = require('when');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

"use strict";

function System(configOptions) {
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
	this.errors = [];

	this.newsEmitter = new EventEmitter();

	setInterval(_.bind(this._simulateError, this), 100);
};

System.prototype.getServices = function ()  {
	return when(this.services);	
};

System.prototype.getEnvironments = function ()  {
	return when(this.environments);
};

System.prototype.getErrors = function ()  {
	return when(this.errors);
};

System.prototype.getNews = function () {
	return this.newsEmitter;
};

System.prototype._simulateError = function () {
	var envIndex = _.random(50);
	var srvIndex = _.random(50);
	if (envIndex < this.environments.length && srvIndex < this.services.length) {
		var newError = {
			errorId: this.errors.length,
			environment: this.environments[envIndex].name,
			service: this.services[srvIndex].name,
			message: randomErrorMessage()
		};
		this.newsEmitter.emit('serviceError', newError);
		this.errors.push(newError);
		console.log(newError);
	}
};

function randomErrorMessage() {
	var messages = [
		"On fire",
		"Service unresponsive",
		"503 response",
		"NullPointerException"
	];
	return messages[_.random(messages.length-1)];
}


module.exports = System;