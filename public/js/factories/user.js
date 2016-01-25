'use strict';

function User() {

  let currentUser = {};
  let loginState = false;

  return {
    verifyToken: function() {

    },

    setCurrentUser: function(user) {
      currentUser = user;
    },

    getCurrentUser: function() {
      return currentUser;
    },

    setLoginState: function(newState) {
      loginState = newState;
    },

    getLoginState: function() {
      $http({
        method: 'GET',
        url: '/user/auth',
        headers: {'Content-Type': 'application/json'}
      }).then( (response) => {
        if (response.status === 200) {
          return true;
        }
        else {
          return false;
        }
      })
    }
  }
}

module.exports = User;
