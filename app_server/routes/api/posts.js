var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = function() {
  router.route('/')
    .get(function(req, res) {
      Post.find({}).populate('created_by').exec(function(err, posts) {
        if (err) {
          res.json(err);
          return;
        }
        res.json({
          posts: posts,
          //  user: req.user,
          requestUrl: req.protocol + '://' + req.get('host') + req.originalUrl
        });
      });
    })
    .post(function(req, res) {
      var newPost = new Post();

      newPost.title = req.body.title;
      newPost.content = req.body.content;

      if (req.isAuthenticated()) {
        newPost.created_by = req.user._id;
      }

      // save the post
      newPost.save(function(err) {
        if (err) {
          console.log('Error in Saving user: ' + err);
          throw err;
        }
        console.log('The creation of the new Post "', newPost.title, "' is completed successfully");
        res.json({
          post: newPost,
          postUrl: req.protocol + '://' + req.get('host') + req.originalUrl + '/' + newPost._id,
          requestUrl: req.protocol + '://' + req.get('host') + req.originalUrl
        });
      });
    });

  router.route('/:id')
    .get(function(req, res) {
      Post.findById(req.params.id).populate('created_by').exec(function(err, post) {
        if (err) {
          res.json(err);
          return;
        }
        res.json({post: post});
      });
    })
    .put(function(req, res) {
      Post.findByIdAndUpdate(req.params.id, req.body.post, {new: true}).populate('created_by').exec(function(err, post) {
        if (err) {
          res.json(err);
          return;
        }
        res.json({post: post});
      });
    })
    .delete(function(req, res) {
      Post.findByIdAndRemove(req.params.id).populate('created_by').exec(function(err, post) {
        if (err) {
          res.json(err);
          return;
        }
        res.json({post: post});
      });
    });
  return router;
};
