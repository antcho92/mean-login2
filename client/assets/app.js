console.log('angular routes initiated');
var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      controllerAs: 'LC'
    })
    .otherwise('/');
});
