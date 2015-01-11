var when = require('when');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

"use strict";

var __ = function (configOptions) {

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

//	setInterval(_.bind(this._simulateError, this), 100);
};

__.prototype.getServices = function ()  {
	return when(this.services);	
};

__.prototype.getEnvironments = function ()  {
	return when(this.environments);
};

__.prototype.getErrors = function ()  {
	return when(this.errors);
};

__.prototype.getNews = function () {
	return this.newsEmitter;
};

/**
 * Ingests an array of events.
 *
 * @param events
 */
__.prototype.ingest = function (event) {

    this.newsEmitter.emit('serviceError', event);
    this.errors.push(event);
    console.log(event);
};

// Singleton :-(
module.exports = new __();