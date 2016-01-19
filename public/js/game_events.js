'use strict';
let $ = require('jquery');
let socket = io();
module.exports = (function() {
  $(function() {

  let myUser = '';

  $('#user-login').click( (event) => {
    let userName = $('input').val();
    myUser = userName;
    socket.emit('user added', userName);
  })

  socket.on('two players', (gameState) => {
    $('.login').hide();
    $('#your-user').html(myUser)

    renderGame(gameState);
    allowAttack(myUser, gameState);
  })

  socket.on('attack again', (gameState) => {
    refresh();
    renderGame(gameState);
    allowAttack(myUser, gameState);
    disallowDefence(myUser, gameState);
  })

  socket.on('player defend', (gameState) => {
    refresh();
    renderGame(gameState);

    disallowAttack(myUser, gameState);
    allowDefence(myUser, gameState);

  });

  socket.on('defence wins', (gameState) => {
    refresh();
    let defendingPlayer = gameState.players[gameState.defending];
    alert(defendingPlayer.name + ' has won!!! Refresh to play again.');
  });

  socket.on('attack wins', (gameState) => {
    refresh();
    let attackingPlayer = gameState.players[gameState.attacking];
    alert(attackingPlayer.name + ' has won!!! Refresh to play again.');
  });


  ///////////
  ///FRONT END DOM FUNCTIONS BELOW:
  //////////

  function refresh() {
    //refreshes game before re-rendering it.
    $('#player2 > .table').children().remove();
    $('#player1 > .table').children().remove();
    $('.player#field').children().remove();
    $('#draw').children().remove();
    $('#discard').children().remove();
  }

  function renderGame(gameObject) {
    //renders the full game through a combination of subfunctions
    renderDeck(gameObject.deck);

    //Build players' hands with Jquery cards:
    gameObject.player1.hand = createHandCards(gameObject.player1.hand);
    gameObject.player2.hand = createHandCards(gameObject.player2.hand);
    gameObject.players = [gameObject.player1, gameObject.player2];
    //find if you are player one or player 2

    renderField(myUser, gameObject);

    renderPlayers(myUser, gameObject);
    updateCurrentPlayer(gameObject);
    updateTrump(gameObject);

  }

  function updateTrump(gameObj) {
    //updates the trump suit field with the current trump suit.
    let $trumpField = $('#trump');
    $trumpField.html(gameObj.trump);
  }

  function allowAttack(userName, gameObj) {
    //allows for click events on the attacking player side.
    let $attackCards = $('#player'+ (gameObj.attacking+1) + ' > ul > li');
    let $endRoundButton = $('#end-round');

    if (userName === gameObj.players[gameObj.attacking].name) {

      $endRoundButton.click( (event) => {
          if (gameObj.numOnField.length != 0) {
            event.preventDefault();
            event.stopPropagation();
            socket.emit('end round', {});
          }
          else {
            alert('You can\'t end the turn right now!');
          }
      });

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
    let $attackCards = $('#player'+ (gameObj.attacking+1) + ' > ul > li');
    let $endRoundButton = $('#end-round');
    $endRoundButton.off();
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
    let $defendingCards = $('#player' + (gameObj.defending + 1) + '> ul > li');
    let $takeCardButton = $('#take-cards');
    if (userName === gameObj.players[gameObj.defending].name) {

      $takeCardButton.click( (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (gameObj.numOnField.length%2 === 1) {
          //player can take if there are an odd number of cards on the field
          socket.emit('take cards', {});
        }
      })

      for (let i = 0; i < $defendingCards.length; i++) {
        $defendingCards.eq(i).click( (event) => {
          event.preventDefault();
          event.stopPropagation();
          //activate the defending player's cards for clicks.
          let defendingCard = gameObj.players[gameObj.defending].hand[i];

          socket.emit('defend card', {
            defendingCard: defendingCard,
            handIndex: i
          });
        });
      }
    }
  }

  function disallowDefence(userName, gameObj) {
    //prevents the defending user from clicking on stuff during attack phase.
    let $defendingCards = $('#player' + (gameObj.defending + 1) + '> ul > li');
    if (userName === gameObj.players[gameObj.defending].name) {

      for (let i = 0; i < $defendingCards.length; i++) {
        $defendingCards.eq(i).off()
      }
    }
  }


  function appendAttackingCard(card, index) {
    card = createJQcard(card);
    let $newField = $('.player#field')
    let $newPairDiv = $('<div>').addClass('player field').attr('id', index);
    $newPairDiv.append($('<ul>').addClass('hand').append($('<li>').append(card.$card)));
    $newField.append($newPairDiv);
  }

  function appendDefendingCard(card, index) {
    card = createJQcard(card);
    $('.field#' + String(index) + '> .hand').append($('<li>').append(card.$card));
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
        $('#player1 > .table').append($('<li/>').append(card.$card))
      });
      gameObj.player2.hand.forEach( (card) => {
        $('#player2 > .table').append($('<li/>').html('<div class=\"card back\">*</div>'));
      });
    }
    else if (playerName === gameObj.player2.name) {
      gameObj.player2.hand.forEach( (card) => {
        $('#player2 > .table').append($('<li/>').append(card.$card))
      });
      gameObj.player1.hand.forEach( (card) => {
        $('#player1 > .table').append($('<li/>').html('<div class=\"card back\">*</div>'));
      });
    }
    else {
      alert('Something went wrong with the player names!');
    }
  }

  function renderField(playerName, gameObj){
    //renders the cards on the field following an update in game

    $.each(gameObj.fieldCards, (index, pair) => {
      if (pair.length > 0)  appendAttackingCard(pair[0], index);
      if (pair.length > 1)  appendDefendingCard(pair[1], index);
    });
  }

  function renderDeck(deck){
    //render the draw deck.
    deck.cards.forEach( (card) => {
      $('.deck#draw').append($('<li/>').html('<div class=\"card back\">*</div>'));

      //removing last card from deck was done the following way:
      //         $('#draw li:last').remove();
    });
   }
  });

})();
