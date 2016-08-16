var express = require('express');
var router = express.Router();

module.exports = function() {
    var pjson = require('../../package');
    router.get('/', function(req, res){
        res.json({
            name: pjson.name,
            description: pjson.description,
            author: pjson.author,
            version: pjson.version,
            license: pjson.license,
            root: req.protocol + '://' + req.get('host') + req.originalUrl
        });
    });
    router.options('/', function(req, res){
        res.json({
            root: req.protocol + '://' + req.get('host') + req.originalUrl,
            endPoints: router.stack
        });
    });
    return router;
};