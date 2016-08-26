var express = require('express');
var router = express.Router();

module.exports = function(passport) {
  var pjson = require('../../package');

  router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
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

  router.use('/posts', require('./api/posts')(passport));

  return router;
};
