var mongoose = require('mongoose');
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use('signin', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username }).populate('posts').exec(
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done({err: err});
        // Username does not exist, log the error and redirect back
        if (!user){
          var msg = 'User Not Found with username '+username;
          console.log(msg);
          return done({err: {message: msg}}, false);
        }
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)){
          var msg = 'Invalid Password';
          console.log(msg);
          return done({err: {message: msg}}, false); // redirect back to login page
        }
        // User and password both match, return user from done method
        // which will be treated like success
        return done(null, user);
      }
    );
  }));

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {
    console.log(username, password);
    // find a user in mongo with provided username
    User.findOne({ 'username' :  username }, function(err, user) {
      // In case of any error, return using the done method
      if (err){
        console.log('Error in SignUp: '+err);
        return done({err: err});
      }
      // already exists
      if (user) {
        var msg = 'User already exists with username: '+username;
        console.log(msg);
        return done({err: {message: msg}}, false);
      } else {
        // if there is no user, create the user
        var newUser = new User();

        // set the user's local credentials
        newUser.username = username;
        newUser.password = createHash(password);

        // save the user
        newUser.save(function(err) {
          if (err){
            console.log('Error in Saving user: '+err);
            return done({err: err});
          }
          console.log(newUser.username + ' Registration succesful');
          return done(null, newUser);
        });
      }
    });
  }));

  passport.serializeUser(function(user, done) {
    console.log('serializing user:',user.username);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('deserializing user:',user.username);
      done(err, user);
    });
  });

  function isValidPassword(user, password){
    return bCrypt.compareSync(password, user.password);
  };
  // Generates hash using bCrypt
  function createHash(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
}
