/**
 * Created by: spurcell
 * 1/18/15
 */

"use strict";

var KeyStore = require('../../models/KeyStore');

module.exports = {

    "lookup fails": function (test) {

        var keyStore = new KeyStore({});

        test.equal(keyStore.lookup('snork'), undefined);

        test.done();
    },

    "lookup succeeds": function (test) {

        var keyStore = new KeyStore({snork: 'papertrail'});

        test.equal(keyStore.lookup('snork'), 'papertrail');

        test.done();
    }
};