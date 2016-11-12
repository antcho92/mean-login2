var mongoose = require('mongoose');
var User = mongoose.model('User');

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
      var confirmPw = userInstance.confirmPassword(req.body.confirm)
      if (confirmPw.errors) {
        res.json(confirmPw);
      } else {
        userInstance.save(function(err, newUser) {
          if (err) {res.json(err)}
          else {
            res.json({
              _id: newUser._id
            });
          }
        });
      }
    },
    login: function(req, res) {
      User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
          res.json(err);
        } else {
          if (user.validatePassword(req.body.password)) {
            res.json({'_id': user._id, 'message': 'sucessfully logged in'});
          } else {
            res.json({errors: 'Invalid email and/or username'});
          }
        }
      });
    }
  }
})();
