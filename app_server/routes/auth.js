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
    if (req.isAuthenticated()) {
      return res.json({user: {_id: 0, name: ""}});
    }
    res.json({err: {message: "Unauthorized"}});
  });

  router.post('/signin', passport.authenticate('signin', {
    failureRedirect: '/auth/failure'
  }), function(req, res) {
    res.json({state: 'success', user: req.user ? req.user : null});
  });

  router.post('/signup', passport.authenticate('signup', {
    failureRedirect: '/auth/failure'
  }), function(req, res) {
    res.json({state: 'success', user: req.user ? req.user : null});
  });

  router.get('/signout', function(req, res) {
    req.logout();
    // res.status(401).redirect('/');
  });

  //sends successful login state back to angular
	router.get('/success', function(req, res){
		res.json({state: 'success', user: req.user ? req.user : null});
	});

	//sends failure login state back to angular
	router.get('/failure', function(req, res){
		res.json({state: 'failure', user: null, message: "Invalid username or password"});
	});

  return router;
};
