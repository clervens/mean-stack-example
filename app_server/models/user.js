var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var bCrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true}, //hash created from password
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  posts: [{type: ObjectId,  ref: 'Post'}]
});

userSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bCrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bCrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, done) {
  bCrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return done(err);
    }
    done(null, isMatch);
  });
};

mongoose.model('User', userSchema);
