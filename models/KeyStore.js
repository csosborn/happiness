/**
 * Created by: spurcell
 * 1/18/15
 */

"use strict";


var __ = function (keys) {

    // hide the keys!

    this.lookup = function (key) {
        return keys[key];
    }
};

module.exports = __;