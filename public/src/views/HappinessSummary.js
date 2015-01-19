/**
 * The one-bit summary component of the Happiness dashboard.
 *
 * The model for this view is expected to be a System (although all we 
 * really care about is the boolean attribute "happy").
 */

define(
	[ 'backbone' ],
	function (Backbone) {

		return Backbone.View.extend({

			initialize: function () {
                this.listenTo(this.model, 'change:happy', this.render);
			},

			render: function () {
				var happyText = this.model.get('happy') ? "OK" : "ALERT";
				return this.$el.html(happyText);
			}

		});

	}
);