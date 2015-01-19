/**
 * Created by: spurcell
 * 1/10/15
 */

define(
    [ 'backbone', 'models/ConfigCollection', 'models/ProcessCollection' ], 
    function (Backbone, ConfigCollection, ProcessCollection) {
    "use strict";

    var System = Backbone.Model.extend({

        initialize: function (options) {
            this.set('happy', true); // we start happy

            this.environments = new ConfigCollection();
            this.services = new ConfigCollection();
            this.processes = new ProcessCollection();
        },

        addConfig: function (config) {
            switch (config.type) {
                case 'environment':
                    this._addEnvironment(config);
                    break;
                case 'service':
                    this._addService(config);
                    break;
            }
        },

        _addEnvironment: function (config) {
            var newEnvironment = this.environments.add(config);
            this.services.each(
                function (service) {
                    this.processes.add({
                        environment: newEnvironment,
                        service: service
                    });
                },
                this
            );
        },

        _addService: function (config) {
            var newService = this.services.add(config);
            this.environments.each(
                function (environment) {
                    this.processes.add({
                        environment: environment,
                        service: newService
                    });
                },
                this
            );
        },

        addAlert: function (env, service, message) {
            var env = this.environments.get(env);
            var service = this.services.get(service);
        }

    });

    return System;
});
