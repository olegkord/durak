'use strict';

let angular = require('angular');
let router = require('angular-ui-router');

angular.module('durak',[require('angular-ui-router')])
    .config( require('./angular_app_router'))
    .factory('User', require('./factories/user'))
    .factory('Socket', require('./factories/socket'))
    .directive('navbar', require('./directives/navbar'))
    .controller('LoginController', require('./controllers/logincontroller'))
    .controller('SignupController', require('./controllers/signupcontroller'))
    .controller('ProfileController', require('./controllers/profilecontroller'))
    .run(['$rootScope','$state','User', ($rootScope, $state, User) => {
      $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
        User.getLoginState( (res) => {
          if (!res.data.success && toState.data.requiresLogin) {
            alert('You need to be logged in to go there!');
            $state.go('home');
          }
        })
      })
  }])
