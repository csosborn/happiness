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
        jquery: 'libs/jquery'
    }
};