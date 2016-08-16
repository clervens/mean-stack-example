var express = require('express');
var router = express.Router();

module.exports = function() {
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