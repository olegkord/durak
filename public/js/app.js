'use strict';
console.log('script file loaded');

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
};
