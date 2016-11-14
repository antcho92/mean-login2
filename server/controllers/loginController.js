var mongoose = require('mongoose');
var User = mongoose.model('User');

// immediate invoked function returns the object with methods we want to use in the routes.js file
module.exports = (function() {
  return {
    index: function(req, res) {
      User.find({}, function(err, data) {
        if (err) {
          console.log('error');
          res.json(err)
        } else {
          res.json(data);
        }
      })
    },
    register: function(req, res) {
      var userInstance = new User(req.body);
      userInstance.save(function(err, newUser) {
        //check for password confirmation
        if (req.body.password !== req.body.confirm) {
          err.errors.confirm = {
            message: 'Password must match password confirmation',
            name: 'Validator Error'
          };
        }
        if (err) {
          res.json(err)
        } else {
          res.json({
            _id: newUser._id
          });
        }
      });
    },
    login: function(req, res) {
      User.findOne({
        email: req.body.email
      }, function(err, user) {
        if (err) {
          res.json(err);
        } else {
          if (user.validatePassword(req.body.password)) {
            res.json({
              '_id': user._id,
              'message': 'sucessfully logged in'
            });
          } else {
            res.json({
              errors: 'Invalid email and/or username'
            });
          }
        }
      });
    }
  }
})();
