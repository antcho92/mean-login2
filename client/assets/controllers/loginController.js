app.controller('loginController', ['$scope', 'usersFactory', function($scope, uF) {
  console.log('login controller loaded');
  var self = this;
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
    });
  }
  this.login = function() {
    uF.login(this.userLogin);
  }
}])
