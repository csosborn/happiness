/**
 * The Happiness dashboard's view on a Process (the intersection of a Service and 
 * an Environment). 
 */

define(
	[ 'backbone', 'hbs!templates/processCell' ],
	function (Backbone, processCellTemplate) {

		return Backbone.View.extend({

			initialize: function ()  {
				this.listenTo(this.model, "change", this.render);
			},

			render: function () {
				return this.$el.html(processCellTemplate(this.getTemplateData()));
			},

			getTemplateData: function () {
				return {
					eventCount: this.model.getPendingEventCount()
				}
			}

		});

	}
);