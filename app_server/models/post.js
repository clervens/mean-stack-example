var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var postSchema = new mongoose.Schema({
	title: String,
	content: String,
	created_by: {type: ObjectId,  ref: 'User'},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});

mongoose.model('Post', postSchema);
