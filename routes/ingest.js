var express = require('express');
var router = express.Router();
var ingestors = require('../ingestors');
var System = require('../models/System.js');

router.post('/:type/:key', function(req, res) {

    var ingestor = ingestors[req.params.type];

    if (ingestor === undefined) {
        res.status(404).send("no ingestor found for type '" + req.params.type + "'");
        return;
    }

    ingestor(req).forEach(System.ingest.bind(System));

    res.send(req.params);
});

module.exports = router;
