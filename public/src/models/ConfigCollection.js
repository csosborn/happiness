define(['underscore', 'backbone'], function (_, Backbone) {

    /**
     * A model class for configuration objects indexed by lowercase name.
     */
    var ConfigObject = Backbone.Model.extend({
        
        initialize: function (attributes) {
            this.set('id', attributes.name.toLowerCase());
        },

        getName: function ()  {
            return this.get('name');
        }
    });

    /**
     * A collection class for configuration objects.
     */ 
    return Backbone.Collection.extend({
        model: ConfigObject
    });

});