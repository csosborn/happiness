/**
 * Created by: spurcell
 * 1/10/15
 */

define([ 'backbone' ], function (Backbone) {
    "use strict";

    /**
     * A model class for configuration objects indexed by name.
     */
    var ConfigObject = Backbone.Model.extend({
        idAttribute: 'name'
    });

    /**
     * A collection class for configuration objects.
     */ 
    var ConfigCollection = Backbone.Collection.extend({
        model: ConfigObject
    });


    var System = Backbone.Model.extend({

        initialize: function (options) {
            this.environments = new ConfigCollection();
            this.services = new ConfigCollection();
        },

        addConfig: function (config) {
            switch (config.type) {
                case 'environment':
                    this.environments.add(config);
                    break;
                case 'service':
                    this.services.add(config);
                    break;
            }

        },

        setError: function (env, service, message) {
            var env = this.environments.get(env);
            var service = this.services.get(service);
        }

    });

    return System;
});
