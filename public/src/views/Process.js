/**
 * The Happiness dashboard's view on a Process (the intersection of a Service and 
 * an Environment). 
 */

define(
	[ 'backbone' ],
	function (Backbone) {

		return Backbone.View.extend({

			render: function () {

				this.$el.html(this.model.getName());

				return this.$el;
			}

		});

	}
);