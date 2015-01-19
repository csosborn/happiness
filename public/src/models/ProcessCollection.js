define(
    ['backbone'], 
    function (Backbone) {

    var Process = Backbone.Model.extend({

        initialize: function () {
            // construct a compound primary key using the environment and service cids
            this.set('id', this.getEnvironment().cid + '-' + this.getService().cid);
            this.events = new Backbone.Collection();
        },

        getName: function ()  {
            return this.getEnvironment().getName() + '-' + this.getService().getName();
        },

        getService: function () {
            return this.get('service');
        },

        getEnvironment: function () { 
            return this.get('environment');
        },

        addAlert: function (event) {
            this.events.add(event);
            this.trigger('change');
        },

        getPendingEventCount: function () {
            return this.events.length;
        }

    });


    return Backbone.Collection.extend({
        model: Process,

        findProcess: function (environment, service) {
            return this.get(environment.cid + "-" + service.cid);
        }

    });

});