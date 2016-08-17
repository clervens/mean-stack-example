var express = require('express');
var router = express.Router();

module.exports = function() {
    router.route('/')
      .get(function(req, res) {
        //TODO: List posts
        res.json({posts: []});
      })
      .post(function(req, res) {
        //TODO: Add a new post
        res.json({
          post: {
            id: 0,
            title: "abc",
            content: 'adsd',
            created_by: {},
            created_at: new Date(),
            updated_at: new Date()
          }
        });
      });

    router.route('/:id')
      .get(function(req, res) {
        //TODO: Show the specified post
        res.json({
          post: {
            id: req.params.id,
            title: "abc",
            content: 'adsd',
            created_by: {},
            created_at: new Date(),
            updated_at: new Date()
          }
        });
      })
      .put(function(req, res) {
        //TODO: Update the specified post
        res.json({
          post: {
            id: req.params.id,
            title: "abc",
            content: 'adsd',
            created_by: {},
            created_at: new Date(),
            updated_at: new Date()
          }
        });
      })
      .delete(function(req, res) {
        //TODO: Delete the specified post
        res.json({
          post: {
            id: req.params.id,
            title: "abc",
            content: 'adsd',
            created_by: {},
            created_at: new Date(),
            updated_at: new Date()
          }
        });
      })
    return router;
};
