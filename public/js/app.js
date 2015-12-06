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
  gameObject.players = [gameObject.player1, gameObject.player2];
  //find if you are player one or player 2
  renderPlayers(myUser, gameObject);

  renderField(myUser, gameObject);
  updateCurrentPlayer(gameObject);

  allowAttack(myUser, gameObject);
}
function allowAttack(userName, gameObj) {
  //allows for click events on the attacking player side.
  console.log('registering click events for attack');
  if (userName === gameObj.players[gameObj.attacking].name) {
    let $attackCards = $('#'+ (gameObj.attacking+1) + ' > ul > li');
    for (let i = 0; i < $attackCards.length; i++) {
      $attackCards.eq(i).click( (event) => {
        //Append jquery card representation and emit an event that a player attacked.
        let attackingCard = gameObj.players[gameObj.attacking].hand[i];

        appendAttackingCard(attackingCard, gameObj);

      })
    }
  }
}

function appendAttackingCard(card, gameObj) {
  let $newField = $('.player#field')
    .append($('<div/>')
      .addClass('player')
      .addClass('field')
      .attr('id',gameObj.fieldCards.length.toString()));

  $newField = $newField.children().eq(gameObj.fieldCards.length);
  $newField = $newField.append($('<ul/>').addClass('hand').append(card.$card.parent()));
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
    $('#1 > .table').append($('<li/>').append(card.$card))
    $('#2 > .table').append($('<li/>').html('<div class=\"card back\">*</div>'));
    });
  }
  else if (playerName === gameObj.player2.name) {
    gameObj.player2.hand.forEach( (card) => {
    $('#2 > .table').append($('<li/>').append(card.$card))
    $('#1 > .table').append($('<li/>').html('<div class=\"card back\">*</div>'));
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
