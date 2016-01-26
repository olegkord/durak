'use strict';

function LoginController($http, $state, User) {
  console.log('loginctrl');
  let self = this;

  self.loginSuccess = true;

  self.userForLogin = {
    email: '',
    password: ''
  }

  self.errorMsg = '';

  self.logIn = function(user) {
    $http({
      method: 'POST',
      url: '/user/login',
      data: user,
      headers: {'Content-Type': 'application/json'}
    }).then( (data) => {
      if (data.data.success) {
        User.setCurrentUser(data.data.user);
        User.setLoginState(true);
        $http.defaults.headers.common.Authorization = data.data.token;
        $state.go('profile');
      }
      else {
        //capture the errors if login failed, display them on the form
        $state.go('home');
      }
    })
  }

}

module.exports = LoginController;
