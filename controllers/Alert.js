/**
 * Handles manipulation of alerts.
 *
 * @type {*}
 */

var express = require('express');
var ingestors = require('../ingestors');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param system
 * @param keyStore
 * @private
 */
var __ = function (system, keyStore) {

    this.system = system;
    this.keyStore = keyStore;
    this.router = express.Router();

    this.router.post('/:key', this.createAlert.bind(this));
    this.router.get('/:id', this.getAlert.bind(this));
    this.router.post('/:id/dismiss', this.dismissAlert.bind(this));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
__.prototype.getRouter = function () {
    return this.router;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param req
 * @param res
 */
__.prototype.createAlert = function (req, res) {

    // expect query params of service=X&env=Y&name=yo&format=papertrail

    var keyHolder = this.keyStore.lookup(req.params.key);

    if (keyHolder === undefined) {
        res.status(404).send("invalid key, bro");
        return;
    }

    console.log('alert from ' + keyHolder);

    // find the proper alert processor
    var ingestor = ingestors[keyHolder];

    if (ingestor === undefined) {
        res.status(404).send("no ingestor found for type '" + req.params.type + "'");
        return;
    }

    // get the service and environment from query string params
    // alternatively, these could be stored with the key if we wanted separate keys for each alert
    this.system.createAlert(req.query.service, req.query.env, req.query.name, ingestor(req));

    res.send('ok, thanks');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param req
 * @param res
 */
__.prototype.getAlert = function (req, res) {

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param req
 * @param res
 */
__.prototype.dismissAlert = function (req, res) {

};

module.exports = __;
