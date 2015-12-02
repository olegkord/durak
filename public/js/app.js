'use strict';
console.log('script file loaded');

let socket = io();
let myUser = '';

angular.module('durak', [])
  .controller('GameCtrl', GameCtrl)

  .controller('LoginCtrl', LoginCtrl);

function GameCtrl(){
  console.log("GameCtrl");
  this.sayHi = sayHi;
  sayHi();
  function sayHi(){
    console.log("sayHi");
  }
};


function LoginCtrl(){
  console.log('login');
  let self = this;

  this.showLoginForm = true;

  this.addUser = function() {
    console.log('adding user!');

    self.userName = "";
    self.showLoginForm = false;

    socket.emit('user added', self.userName)
  }


};
