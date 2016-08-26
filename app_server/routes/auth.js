var express = require('express');
var router = express.Router();

module.exports = function(passport) {
  router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
  });

    router.get('/', function(req, res) {
        res.redirect("/auth/me");    
    });
    
    router.get('/me', function(req, res) {
        res.json({user_id: 0, name: ""});
    });
    
    router.post('/signin', function(req, res) {
        res.json({message: "success"});
    });
    
    router.post('/signup', function(req, res) {
        res.json({message: "success"});
    });
    
    router.get('/signout', function(req, res) {
        res.json({message: "success"});
    });
    
    router.options('/', function(req, res){
        res.json({
            root: req.protocol + '://' + req.get('host') + req.originalUrl,
            endPoints: router.stack
        });
    });
    
    return router;
};