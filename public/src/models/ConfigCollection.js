define(['backbone'], function (Backbone) {

    /**
     * A model class for configuration objects indexed by name.
     */
    var ConfigObject = Backbone.Model.extend({
        idAttribute: 'name',
        
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