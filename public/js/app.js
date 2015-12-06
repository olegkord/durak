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
  renderDeck(gameObject.deck);

  //Build players' hands with Jquery cards:
  gameObject.player1.hand = createCards(gameObject.player1.hand);
  gameObject.player2.hand = createCards(gameObject.player2.hand);
  //find if you are player one or player 2
  renderPlayers(myUser, gameObject);

  renderField(myUser, gameObject);
  updateCurrentPlayer(gameObject);
}
function updateCurrentPlayer(gameObj) {
  //updates the field with current player.
  $('#current-player').html(gameObj.players[gameObj.attacking].name);
}

function createCards(hand) {
  hand.forEach( (card) => {
    card.$card = $('<a/>').addClass('card').addClass(card.rank).addClass(card.suit).attr('data-value',card.number);
    let rank = card.rank.split('-')[1]
    card.$card.append($('<span/>').addClass('rank').html(rank.toUpperCase()));
    card.$card.append($('<span/>').addClass(card.suit).html(card.suitSym));
  });
  return hand;
}

function renderPlayers(playerName,gameObj) {
  //renders a players hand as face up or face down depending on the current user
  if (playerName === gameObj.player1.name){
    gameObj.player1.hand.forEach( (card) => {
    $('#one > .table').append($('<li/>').append(card.$card))
    $('#two > .table').append($('<li/>').html('<div class=\"card back\">*</div>'));
    });
  }
  else if (playerName === gameObj.player2.name) {
    gameObj.player2.hand.forEach( (card) => {
    $('#two > .table').append($('<li/>').append(card.$card))
    $('#one > .table').append($('<li/>').html('<div class=\"card back\">*</div>'));
    });
  }
  else {
    alert('Something went wrong with the player names!');
  }
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
