var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = function(passport) {
  router.route('/')
    .get(function(req, res) {
      var per_page = Math.max(req.params.per_page||req.query.per_page||10, 0);
      var page = Math.max((req.params.page||req.query.page||0)-1, 0);
      Post.find({})
        .limit(per_page)
        .skip(page)
        .sort([['updated_at', 'descending']]).populate('created_by').exec(function(err, posts) {
          if (err) {
            res.json({err: err});
            return;
          }
          res.json({
            posts: posts,
            //  user: req.user,
            requestUrl: req.protocol + '://' + req.get('host') + req.originalUrl
          });
      });
    })
    .post(isLoggedIn, function(req, res) {
      var newPost = new Post();

      newPost.title = req.body.title;
      newPost.content = req.body.content;

      if (req.isAuthenticated()) {
        newPost.created_by = req.user._id;
      }

      // save the post
      newPost.save(function(err, post) {
        if (err) {
          console.log('Error in Saving user: ' + err);
          res.json({err: err});
        }
        console.log('The creation of the new Post "', newPost.title, "' is completed successfully");
        res.json({
          post: post,
          postUrl: req.protocol + '://' + req.get('host') + req.originalUrl + '/' + newPost._id,
          requestUrl: req.protocol + '://' + req.get('host') + req.originalUrl
        });
      });
    });

  router.use('/:id', isLoggedIn);
  router.route('/:id')
    .get(function(req, res) {
      console.log('2');
      Post.findById(req.params.id).populate('created_by').exec(function(err, post) {
        if (err) {
          res.json({err: err});
          return;
        }
        res.json({post: post});
      });
    })
    .put(function(req, res) {
      Post.findByIdAndUpdate(req.params.id, req.body.post, {new: true}).populate('created_by').exec(function(err, post) {
        if (err) {
          res.json({err: err});
          return;
        }
        res.json({post: post});
      });
    })
    .delete(function(req, res) {
      Post.findByIdAndRemove(req.params.id).populate('created_by').exec(function(err, post) {
        if (err) {
          res.json({err: err});
          return;
        }
        res.json({post: post});
      });
    });
  return router;
};

function isLoggedIn(req, res, next) {
  console.log(req.isAuthenticated(), "test");
  if (req.isAuthenticated() || req.method == "OPTIONS"){
    return next();
  }
  res.status(401).json({err: {message: "You must authenticate to access this resource"}});
}
