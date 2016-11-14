app.factory('usersFactory', ['$http', function($http) {
  console.log('users factory loaded');
  function UsersFactory() {
    var self = this;
    this.register = function(user, callback, errCallback) {
      $http.post('/users', user).then(function(res) {
        if (res.data.errors) {
          console.log(res.data.message);
          errCallback(res.data.errors);
        } else {
          console.log(res.data._id);
          console.log('no errors registering');
        }
      });
    }
    this.login = function(user, callback) {
      $http.post('/login', user).then(function(res) {
        console.log(res);
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          callback(res.data);
          console.log('login successful');
        }
      });
    }
  }

  console.log(new UsersFactory());
  return new UsersFactory();
}]);
