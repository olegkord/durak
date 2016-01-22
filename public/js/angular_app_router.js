'use strict';

angular.module('durak').config(AppRouter)

module.exports = function AppRouter($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'js/templates/home.html'
    })
}
