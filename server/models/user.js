console.log('users model');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password_hash: {type: String, required: true}
}, {timestamps: true});

mongoose.model('User', userSchema);
