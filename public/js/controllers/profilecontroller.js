'use strict';

function ProfileController(User, $state, Socket){
  let self = this;

  self.currentUser = User.getCurrentUser();

  self.searchUsers = function() {
    //a user searches for another user's email and can alert them.

  }

  self.selectGame = function() {
    //a user clicks on a game, and it sends a notification to another user.

  }

  self.startGame = function() {
    //a user can start a new game instance

  }

  self.editUser = function() {
    //a user can choose to edit profile --> maybe make this a ui-sref
    
  }
}

module.exports = ProfileController;
