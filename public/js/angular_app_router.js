'use strict';

module.exports = function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './templates/login.html',
      data: {
        requiresLogin: false
      },
    })
    .state('signup', {
      url: '/signup',
      templateUrl: './templates/signup.html',
      data: {
        requiresLogin: false
      }
    })
    .state('profile', {
      url: '/profile',
      templateUrl: './templates/profile.html',
      data: {
        requiresLogin: true
      }
    })
}
