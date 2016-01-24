'use strict';

module.exports = function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './templates/home.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: './templates/signup.html'
    })
}
