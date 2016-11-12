app.controller('loginController', ['$scope', 'usersFactory', function($scope, uF) {
  console.log('login controller loaded');
  var self = this;
  var errCallback = function(errors) {
    self.errors = errors;
  }
  var successCallback = function(data) {
    self.success = data.message;
  }


  this.register = function() {
    // Client side password matching
    // if (this.registration.password !== this.registration.confirm) {
    //   console.log('Password must match confirmation.')
    //   return;
    // }
    uF.register(this.registration, function(res) {
      if (res.data.errors) {
        self.errors = res.data.errors;
      }
      self.registration = {};
    }, errCallback);
  }
  this.login = function() {
    uF.login(this.userLogin, successCallback);
  }
}])
