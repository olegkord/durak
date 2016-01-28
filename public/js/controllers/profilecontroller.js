'use strict';

function ProfileController(User, $state, Socket){
  let self = this;

  self.currentUser = User.getCurrentUser();

  // self.getCurrentUser = function() {
  //   return User.getCurrentUser();
  // }

}

module.exports = ProfileController;
