/**
 * Created by: spurcell
 * 1/10/15
 */

define([ 'jquery' ], function ($) {
    "use strict";

    var System = function () {

        this.numEnvs = 0;
        this.numServices = 0;

        this.environments = {};
        this.services = {};
    };

    System.prototype.addConfig = function (config) {

        console.log(config);

        if (config.type == 'environment') {
            this.addEnvironment(config.name);
        }
        else if (config.type == 'service') {
            this.addService(config.name, config.glyph);
        }
    };

    System.prototype.addEnvironment = function (name) {

        if (this.environments[name] !== undefined) {
            return;
        }

        console.log('adding environment ' + name);

        // assign the environment a local ID
        var id = this.numEnvs;
        this.environments[name] = id;
        this.numEnvs++;

        // add a row to the table

        var html = '<tr class="env" id="env-' + id + '"><td class="name">' + name + '</td>';

        for (var key in this.services) {
            html += '<td class="service-' + this.services[key] + '"><span class="errorFlag"></span></td>';
        }

        html += '</tr>';

        $('#checks').find('tbody').append(html);
    };

    System.prototype.addService = function (name, glyph) {

        if (this.services[name] !== undefined) {
            return;
        }

        console.log('adding service ' + name);

        // assign the service a local ID
        var id = this.numServices;
        this.services[name] = id;
        this.numServices++;

        // add a header
        $('#checks').find('thead tr').append('<th>' + glyph + '</th>');

        // add a column to each env
        // factor this so we only do it in one place
        $('.env').each(function () {
            $(this).append('<td class="service-' + id + '"><span class="errorFlag"></span></td>');
        });
    };

    System.prototype.setError = function (env, service, message) {

        var envId = this.environments[env];
        var serviceId = this.services[service];
    };

    return System;
});
