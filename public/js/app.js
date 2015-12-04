'use strict';
console.log('script file loaded');

let socket = io();
let myUser = '';

angular.module('durak', [])
  .controller('GameCtrl', GameCtrl)

  .controller('LoginCtrl', LoginCtrl);

function GameCtrl() {

  hey();

  function hey() {
    console.log('hey game controller');
  }
}


function LoginCtrl(){
  console.log('login');
  let self = this;

//SHOWS:
  this.showLoginForm = true;
  this.showWaitScreen = false;


  this.addUser = function() {
    console.log('adding user!');

    socket.emit('user added', {userName: self.userName})
    self.userName = "";
    self.showLoginForm = false;
    self.showWaitScreen = true;

  }


};
