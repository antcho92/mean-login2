var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  create: function(req, res) {
    console.log(req.body);
  }
}