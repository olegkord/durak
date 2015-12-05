'use strict';
$(function() {
console.log('script file loaded');

let socket = io();
let myUser = '';

$('#user-login').click( (event) => {
  console.log('clicked login');
  let userName = $('input').val();
  myUser = userName;
  socket.emit('user added', userName);
})

socket.on('two players', (players) => {
  console.log('response received');
  console.log(players);
  $('.login').hide();
  $('#your-user').html(myUser)


})


});
