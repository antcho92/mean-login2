app.factory('usersFactory', ['$http', function($http) {
  console.log('users factory loaded');
  function UsersFactory() {
    var self = this;
    this.register = function(user, callback) {
      $http.post('/users', user).then(function(res) {
        console.log(res.data);
        callback(res);
      });
    }
    this.login = function(user) {
      $http.post('/login', user).then(function(res) {
        console.log(res);
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          console.log('login successful');
        }
      });
    }
  }

  console.log(new UsersFactory());
  return new UsersFactory();
}]);
