var express = require('express');
var router = express.Router();

module.exports = function() {
  var pjson = require('../../package');

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,PUT,DELETE");
    next();
  });

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

  router.use('/posts', require('./api/posts')());

  return router;
};
