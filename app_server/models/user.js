var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
  username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	posts: [{type: ObjectId,  ref: 'Post'}]
});

mongoose.model('User', userSchema);
