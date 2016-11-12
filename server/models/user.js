console.log('users model');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true});

//hashes my password
userSchema.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}
//checks if input password's hash matches the stored hash
userSchema.methods.validatePassword = function(input) {
  return bcrypt.compareSync(input, this.password);
}
// checks to see if the password and confirm password match
userSchema.methods.confirmPassword = function(input) {
  return !(this.password === input);
}
// runs hash password before saving
userSchema.pre('save', function(done) {
  this.password = this.hashPassword(this.password);
  done();
});

mongoose.model('User', userSchema);
