var mongoose = require('mongoose');
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = function(passport) {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.SECRET || 'secret',
    passReqToCallback: true
  },
  function(req, jwt_payload, done) {
    // check in mongo if a user with username exists or not
    User.findOne({ '_id' : jwt_payload._id }).exec(
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done({err: err});
        // Username does not exist, log the error and redirect back
        if (!user){
          var msg = 'User Not Found with id ' + jwt_payload._id;
          console.log(msg);
          return done({err: {message: msg}}, false);
        }

        // User and password both match, return user from done method
        // which will be treated like success
        return done(null, user);
      }
    );
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
