'use strict';

function User($http) {

  let currentUser = {};
  let loginState = false;

  return {
    setCurrentUser: function(user) {
      currentUser = user;
    },

    getCurrentUser: function() {
      return currentUser;
    },

    setLoginState: function(newState) {
      loginState = newState;
    },

    getLoginState: function(callback) {
      console.log('ping server');
      $http({
        method: 'GET',
        url: '/user/auth',
        headers: {'Content-Type': 'application/json'}
      }).then( (response) => {
        callback(response);
      });
    }
  }
}

module.exports = User;
