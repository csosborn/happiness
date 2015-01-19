/**
 * The Happiness dashboard's main process table. 
 *
 * This view expects a System model and creates a table element to view it.
 */

define(
    [ 'underscore', 'backbone', 'jquery', 'views/Process'  ], 
    function (_, Backbone, $, ProcessView) {

        return Backbone.View.extend({

            tagName: 'table',

            initialize: function ()  {
                // bind a few methods for convenience later
                _.bindAll(this, '_addEnvironment', '_addService', '_addProcess');
            },

            render: function () {
                // clean up in case render has already been called
                this.stopListening();

                this.$el.html('<thead><tr><td></td></tr></thead><tbody></tbody>')

                var system = this.model;

                // set up the table for known systems and environments
                system.environments.each(this._addEnvironment);
                system.services.each(this._addService);
                system.processes.each(this._addProcess);

                // listen for future additions of systems and environments
                this.listenTo(system.environments, 'add', this._addEnvironment);
                this.listenTo(system.services, 'add', this._addService);
                this.listenTo(system.processes, 'add', this._addProcess);

                return this.$el;
            },

            _addEnvironment: function (environment) {
                // add a row to the table
                var name = environment.get('name');
                var html = '<tr class="env" data-environment-cid="' + environment.cid + '"><td class="name">' + name + '</td></tr>';
                this.$('tbody').append(html);

                this.model.services.each(
                    function (service) {
                        this._populateIntersection(environment, service);
                    },
                    this
                );
            },

            _addService: function (service) {
                // add a header
                this.$('thead tr').append('<th data-service-cid="' + service.cid + '">' + service.get('glyph') + '</th>');

                this.model.environments.each(
                    function (environment) {
                        this._populateIntersection(environment, service);
                    },
                    this
                );
            },

            _populateIntersection: function (environment, service) {
                var row = this.$('tr[data-environment-cid='+environment.cid+']');
                if (!row.find('td[data-service-cid=' + service.cid + ']').size()) {
                    row.append(
                        '<td class="process" data-service-cid="' + service.cid + '" data-environment-cid="' + environment.cid + '"></td>'
                    );
                }
            },

            _addProcess: function (process) {
                console.log('added process %s', process.getName());
  
                var processView = new ProcessView({
                    model: process
                });

                var intersection = this.$('td[data-service-cid=' + process.getService().cid + 
                    '][data-environment-cid=' + process.getEnvironment().cid + ']');
                intersection.append(processView.render());
            },

        });

    }
);