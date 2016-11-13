console.log('users model');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email cannot be blank'],
    unique: [true, 'email is already in database'],
    validate:[{
      validator: function(email) {
        // email regex
        return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/.test(email);
      },
      message: '{VALUE} is not a valid email'
    }]
  },
  firstName: {
    type: String,
    required: [true, 'First name cannot be blank']
  },
  lastName: {
    type: String,
    required: [true, 'Last name cannot be blank']
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank']
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
  if (this.password !== input) {
    return {
      errors: {
        confirm: {
          message: 'Password must match password confirmation',
          name: 'Validator Error'
        }
      },
      message: "User validation failed"
    }
  } else {
    return {
      success: true,
      message: "Passwords match"
    };
  }
}
// runs hash password before saving
userSchema.pre('save', function(done) {
  this.password = this.hashPassword(this.password);
  done();
});

mongoose.model('User', userSchema);
