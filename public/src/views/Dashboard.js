/**
 * The Happiness dashboard view.
 */

define(
    [   'backbone', 
        'hbs!templates/dashboard', 
        'views/HappinessSummary', 'views/ProcessTable'
    ], 
    function (
        Backbone, 
        dashboard, 
        HappinessSummaryView, ProcessTableView
    ) {
        "use strict";

        return Backbone.View.extend({

            render: function () {
                // clean up in case render has already been called
                this.stopListening();

                // add html skeleton and establish subviews
                this.$el.html(dashboard());
                this._makeSummaryView();
                this._makeTableView();

                // set overall happiness and listen for future changes
                this._setHappy();
                this.listenTo(this.model, 'change:happy', this._setHappy);

                return this.$el;
            },

            /**
             * Update the class on the dashboard root element according to happiness.
             */
            _setHappy: function (ishappy) {
                this.$el
                    .removeClass('happy unhappy')
                    .addClass(this.model.get('happy') ? 'happy' : 'unhappy');
            },

            _makeSummaryView: function ()  {
                if (this.summaryView) {
                    this.summaryView.remove();
                }
                this.summaryView = new HappinessSummaryView({
                    model: this.model
                });
                this.$('.summary').html(this.summaryView.render());
            },

            _makeTableView: function () {
                if (this.tableView) {
                    this.tableView.remove();
                }
                this.tableView = new ProcessTableView({
                    model: this.model
                });
                this.$('.processTable').html(this.tableView.render());
            }

        });

    }
);