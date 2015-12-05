'use strict';

let Deck = require('./deck');

module.exports = function Game(player1Name,player2Name){
  //constructor function for a new game object.

  this.deck = new Deck;
  this.trump = '';

  this.numOnField = [];
  this.numPairs = 0;

  this.player1 = {
    name: player1Name,
    hand: []
  };
  this.player2 = {
    name: player2Name,
    hand: []
  };

  this.attacking = 0;
  this.defending = 1;

///Object functions
  this.state = function() {
    return {
      deck: this.deck,
      trump: this.trump,
      numOnField: this.numOnField,
      numPairs: this.numPairs,
      player1: this.player1,
      player2: this.player2,
      attacking: this.attacking,
      defending: this.defending
    }
  }
  this.start = function() {
    this.makeDeck();
    this.deal();
  }

  this.makeDeck = function() {
    //start a game: build the deck and shuffle
    this.deck.build();
    this.deck.shuffle();
  }

  this.giveCard = function(player) {
    //expected input: player object
    player.hand.push(this.deck.cards.pop());
  }

  this.deal = function() {
    //deal cards to players.
    for (var i = 0; i< 6; i++){
      this.giveCard(this.player1);
      this.giveCard(this.player2);
    }

    this.trump = this.deck.cards[this.deck.cards.length-1].suit;
    this.deck.cards.push(this.deck.cards.pop());
  }

  this.nextTurn = function() {
    if (this.attacking === 0){
      this.attacking = 1;
      this.defending = 0;
    }
    else {
      this.attacking = 0;
      this.defending = 1;
    }
  }

  this.makeAttack = function($card){
    //expected input: jquery selector representing a card.
    //attacking player plays a card.
    //field must be empty OR have a card of the same number as this card.

//Turn off defending player's click events here

    /////
    let cardRank = parseInt($card.attr('data-value'));
    if (_.isEmpty(this.numOnField)|| _.contains(this.numOnField, cardRank)) {
      //if the field is empty OR has a card of the same number

      //add card to collection of cards.
      this.numOnField.push(cardRank);

      //create a new field to play on.
      let cardSuit = $card.attr('class');
      cardSuit = _.last(cardSuit.split(' '));

      $newField = this.generateNewField($card);

      //new card is on the field to attack. The opponent must now defend.

      this.makeDefend($card)

    }
    else {
      //Turn off click events on attacking player's cards
      alert('Card can\'t be played!');
      //Prompt defending player to defend.
      //pass in attacking card for validation of defence.

    }
  }

  this.makeDefend = function($card){
    //turn off attacking player's click events here



    //get suit and value of card first
  }
  this.recover = function() {

    this.nextTurn();
  }
  //helper functions not directly related to gameplay:
  this.generateNewField = function($card) {
    let $newField = $('<div/>').addClass('player').addCLass('field').attr('id',this.numPairs.toString());
    $('.player#center').append($newField);
    $newField = $newField.children().eq(this.numPairs);
    $newField = $newField.append($('<ul/>').addClass('hand').append($card.parent()));
  }

}
