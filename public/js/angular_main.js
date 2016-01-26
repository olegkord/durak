'use strict';

let angular = require('angular');
let router = require('angular-ui-router');

let LoginController = require('./controllers/logincontroller');
let SignupController = require('./controllers/signupcontroller');
let User = require('./factories/user');
let Navbar = require('./directives/navbar')

angular.module('durak',[
    require('angular-ui-router')
  ])
    .config(require('./angular_app_router'))
    .factory('User', User)
    .directive('navbar', Navbar)
    .controller('LoginController', LoginController)
    .controller('SignupController', SignupController)
    .run(['$rootScope','$state','User', ($rootScope, $state, User) => {
      $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
        User.getLoginState( (res) => {
          console.log(res);
          if (!res.data.success && toState.data.requiresLogin) {
            alert('You need to be logged in to go there!');
            $state.go('home');
          }
        })
      })
  }])
