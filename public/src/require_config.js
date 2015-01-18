var require = {
    shim: {
        'socketio': {
            exports: 'io'
        },
        'jquery': {
            exports: '$'
        }
    },
    wrap: false,
    paths: {
        socketio: '/socket.io/socket.io',
        jquery: 'libs/jquery',
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        handlebars: 'libs/handlebars-v2.0.0',
        hbs: 'libs/hbars',
        text: 'libs/text'
    },
    hbars: {
        extension: '.hbs'
    }
};