define([ 'backbone', 'jquery', 'hbs!templates/dashboard' ], 
    function (Backbone, $, dashboard) {
        "use strict";

        return Backbone.View.extend({

            initialize: function (options) {
                this.listenTo(this.model.environments, 'add', this.onAddEnvironment);
                this.listenTo(this.model.services, 'add', this.onAddService);
            },

            onAddEnvironment: function (environment) {

                console.log('adding environment ' + environment.get('name'));

                // add a row to the table
                var id = environment.cid;
                var name = environment.get('name');

                var html = '<tr class="env" id="env-' + id + '"><td class="name">' + name + '</td>';

                this.model.services.each(
                    function (service) {
                        html += '<td class="service-' + service.cid + '"><span class="errorFlag"></span></td>';
                    }
                );

                html += '</tr>';

                $('#checks').find('tbody').append(html);
            },

            onAddService: function (service) {

                console.log('adding service ' + service.get('name'));

                // add a header
                $('#checks').find('thead tr').append('<th>' + service.get('glyph') + '</th>');

                // add a column to each env
                // factor this so we only do it in one place
                $('.env').each(function () {
                    $(this).append('<td class="service-' + service.cid + '"><span class="errorFlag"></span></td>');
                });
            },

            render: function () {
                return this.$el.html(dashboard());
            }

        });

    }
);