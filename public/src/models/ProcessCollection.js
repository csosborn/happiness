define(
	['backbone'], 
	function (Backbone) {

	var Process = Backbone.Model.extend({

		getName: function ()  {
			return this.getService().getName() + '-' + this.getEnvironment().getName();
		},

		getService: function () {
			return this.get('service');
		},

		getEnvironment: function () { 
			return this.get('environment');
		}

	});


	return Backbone.Collection.extend({
		model: Process
	});

});