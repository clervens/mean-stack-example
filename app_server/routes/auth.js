var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = function(passport) {
  router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
  });

  router.get('/', function(req, res) {
    res.redirect("/auth/me");
  });

  router.get('/me', passport.authenticate('jwt', { session: false }), function(req, res) {
    if (req.isAuthenticated()) {
      return res.json({ user: req.user });
    }
    res.json({err: {message: "Unauthorized"}});
  });

  router.post('/signin', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' : username }).exec(
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return res.json({err: err});
        // Username does not exist, log the error and redirect back
        if (!user){
          var msg = 'User Not Found with username '+username;
          console.log(msg);
          return res.json({err: {message: msg}}, false);
        }
        // User exists but wrong password, log the error
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (!isMatch){
            var msg = 'Invalid Password';
            console.log(msg);
            return res.json({err: {message: msg}}, false); // redirect back to login page
          }

          var token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET || 'secret', {
            expiresIn: "14d"
          });

          // User and password both match, return user from done method
          // which will be treated like success
          return res.json({user: user, token: token});
        });
      }
    );
  });

  router.post('/signup', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // find a user in mongo with provided username
    User.findOne({ 'username' : username }, function(err, user) {
      // In case of any error, return using the done method
      if (err){
        console.log('Error in SignUp: '+err);
        return res.json({err: err});
      }
      // already exists
      if (user) {
        var msg = 'User already exists with username: '+username;
        console.log(msg);
        return res.json({err: {message: msg}});
      } else {
        // if there is no user, create the user
        var newUser = new User();

        // set the user's local credentials
        newUser.username = username;
        newUser.password = password;

        // save the user
        newUser.save(function(err) {
          if (err){
            console.log('Error in Saving user: '+err);
            return res.json({err: err});
          }

          var token = jwt.sign({_id: newUser._id, username: newUser.username}, process.env.SECRET || 'secret', {
            expiresIn: "14d"
          });

          console.log(newUser.username + ' Registration succesful');
          return res.json({user: newUser, token: token});
        });
      }
    });
  });

  router.get('/signout', function(req, res) {
    req.logout();
    res.send();
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
function isValidPassword(user, password){
  return bCrypt.compareSync(password, user.password);
};
