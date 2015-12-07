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

socket.on('player defend', (gameState) => {
  console.log('player must defend');

  refresh();
  renderGame(gameState);

  disallowAttack(myUser, gameState);
  allowDefence(myUser, gameState);

});


///////////
///FRONT END DOM FUNCTIONS BELOW:
//////////

function refresh() {
  //refreshes game before re-rendering it.
  $('#2 > .table').children().remove();
  $('#1 > .table').children().remove();
  $('#field > .hand').children().remove();
  $('#draw').children().remove();
  $('#discard').children().remove();
}

function renderGame(gameObject) {
  //renders the full game through a combination of subfunctions
  console.log('render game');
  renderDeck(gameObject.deck);

  //Build players' hands with Jquery cards:
  gameObject.player1.hand = createHandCards(gameObject.player1.hand);
  gameObject.player2.hand = createHandCards(gameObject.player2.hand);
  gameObject.players = [gameObject.player1, gameObject.player2];
  //find if you are player one or player 2

  renderField(myUser, gameObject);

  renderPlayers(myUser, gameObject);
  updateCurrentPlayer(gameObject);

  allowAttack(myUser, gameObject);
}

function allowAttack(userName, gameObj) {
  //allows for click events on the attacking player side.
  console.log('registering click events for attack');

  let $attackCards = $('#'+ (gameObj.attacking+1) + ' > ul > li');
  if (userName === gameObj.players[gameObj.attacking].name) {


    for (let i = 0; i < $attackCards.length; i++) {
      $attackCards.eq(i).click( (event) => {

        event.preventDefault();
        event.stopPropagation();
        //Append jquery card representation and emit an event that a player attacked.
        let attackingCard = gameObj.players[gameObj.attacking].hand[i];

        socket.emit('player attack', {
          attackingCard: attackingCard,
          handIndex: i
        });
      });
    }
  }
}

function disallowAttack(userName, gameObj) {
  //remove click events from all cards in hand.
  console.log('deauthorize player from attacking while opponent defends.')
  let $attackCards = $('#'+ (gameObj.attacking+1) + ' > ul > li');

  if (userName === gameObj.players[gameObj.attacking].name) {
    for (let i = 0; i < $attackCards.length; i++) {
      $attackCards.eq(i).off();
    }
  }
}

//Very similar to function above, can be abstracted.
function allowDefence(userName, gameObj) {
  //allows for click events on the defending player side.
  //however the user must WAIT until an attack event has occured to defend.
  let $defendingCards = $('#' + (gameObj.defending + 1) + '> ul > li');
  console.log('registering click events for defence.');
  if (userName === gameObj.players[gameObj.defending].name) {

    for (let i = 0; i < $defendingCards.length; i++) {
      $defendingCards.eq(i).click( (event) => {
        console.log('Clicked on card ' + i);
        event.preventDefault();
        event.stopPropagation();
        //activate the defending player's cards for clicks.
        let defendingCard = gameObj.players[gameObj.defending].hand[i];

        socket.emit('player defend', {
          defendingCard: defendingCard,
          handIndex: i
        });

        $defendingCards.eq(i).off();
      });
    }
  }
  else {
    $defendingCards.off();
  }
}


function appendAttackingCard(card, index) {
  card = createJQcard(card);
  let $newField = $('.player#field').append($('<div/>').attr('id', index));
  $newField.append($('<ul/>').addClass('hand').append($('<li/>').append(card.$card)));
}

function updateCurrentPlayer(gameObj) {
  //updates the field with current player.
  $('#current-player').html(gameObj.players[gameObj.attacking].name);
}

function createHandCards(hand) {
  hand.forEach( (card) => {
    card = createJQcard(card);
  });
  return hand;
}

function createJQcard(card) {
  card.$card = $('<a/>').addClass('card').addClass(card.rank).addClass(card.suit).attr('data-value',card.number);
  let rank = card.rank.split('-')[1]
  card.$card.append($('<span/>').addClass('rank').html(rank.toUpperCase()));
  card.$card.append($('<span/>').addClass(card.suit).html(card.suitSym));

  return card;
}

function renderPlayers(playerName,gameObj) {
  //renders a players hand as face up or face down depending on the current user
  if (playerName === gameObj.player1.name){
    gameObj.player1.hand.forEach( (card) => {
      $('#1 > .table').append($('<li/>').append(card.$card))
    });
    gameObj.player2.hand.forEach( (card) => {
      $('#2 > .table').append($('<li/>').html('<div class=\"card back\">*</div>'));
    });
  }
  else if (playerName === gameObj.player2.name) {
    gameObj.player2.hand.forEach( (card) => {
      $('#2 > .table').append($('<li/>').append(card.$card))
    });
    gameObj.player1.hand.forEach( (card) => {
      $('#1 > .table').append($('<li/>').html('<div class=\"card back\">*</div>'));
    });
  }
  else {
    alert('Something went wrong with the player names!');
  }
}

function renderField(playerName, gameObj){
  //renders the cards on the field following an update in game
  console.log('rendering field cards');

  $.each(gameObj.fieldCards, (index, pair) => {
    appendAttackingCard(pair[0][0], index);
  })
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
