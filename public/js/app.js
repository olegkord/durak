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

socket.on('two players', (gameState) => {
  console.log('response received');
  $('.login').hide();
  $('#your-user').html(myUser)

  renderGame(gameState);

})

function renderGame(gameObject) {
  //renders the full game through a combination of subfunctions
  console.log('render game');
  renderDeck(gameObject.deck)

}

function renderPlayer(playerName,gameObj) {
  //renders a players hand as face up or face down depending on the current user

}

function renderField(fieldCards){
  //renders the cards on the field following an update in game
}

function renderDeck(deck){
  //render the draw deck.
  console.log('rendering deck');
  deck.cards.forEach( (card) => {
    $('.deck#draw').append($('<li/>').html('<div class=\"card back\">*</div>'));

    //removing last card from deck was done the following way:
    //         $('#draw li:last').remove();
  });

}


});
