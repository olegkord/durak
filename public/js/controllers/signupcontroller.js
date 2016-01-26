'use strict';
function SignupController($http, $state) {
  console.log('signup ctrl');
  let self = this;

  self.signupUser = {
    email: '',
    password: ''
  }

  self.sendUser = function(user) {
    $http({
      method: 'POST',
      url: '/user/new',
      data: user,
      headers: {'Content-Type' : 'application/json'}
    }).then( (user) => {
      console.log(user);
      if (user.data.success === true) {
        $state.go('home');
      }
      else {
        //handle the error!!
        $state.go('signup');
      }
    });
  }
}

module.exports = SignupController;
