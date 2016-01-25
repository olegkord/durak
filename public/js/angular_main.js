'use strict';

let angular = require('angular');
let router = require('angular-ui-router');

let LoginController = require('./controllers/logincontroller');
let SignupController = require('./controllers/signupcontroller');
let User = require('./factories/user');

angular.module('durak',[
    require('angular-ui-router')
  ])
    .config(require('./angular_app_router'))
    .factory('User', User)
    .controller('LoginController', LoginController)
    .controller('SignupController', SignupController)
    .run(['$rootScope','$state','User', ($rootScope, $state, User) => {
  }])
    .run( ($rootScope, $templateCache) => {
      $rootScope.$on('$viewContentLoaded', () => {
        $templateCache.removeAll();
      });
    });
