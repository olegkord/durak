'use strict';

function Game(){
  //constructor function for a new game object.

  this.deck = undefined;
  this.trump = undefined;

  this.numOnField = [];
  this.numPairs = 0;

  this.player1 = {};
  this.player2 = {};

  this.attacking = undefined;
  this.defending = undefined;


///Object functions

  this.start = funtion() {
    this.makeDeck();
    this.deal();

    this.attacking = 0;
    this.defending = 1;
  }

  this.makeDeck = function() {
    //start a game: build the deck and shuffle
    let myDeck = new Deck();
    myDeck = myDeck.build();
    myDeck = myDeck.shuffle();
  }

  this.giveCard = function(player) {
    //expected input: player object
    player.hand.push(this.deck.pop);
  }

  this.deal = function() {
    //deal cards to players.
    for (var i = 0; i< 6; i++){
      this.giveCard(this.player1);
      this.giveCard(this.player2);
    }
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
    let cardRank = parseInt($card.attr('data-value'));
    if (_.isEmpty(this.numOnField)|| _.contains(this.numOnField, cardRank)) {
      //if the field is empty OR has a card of the same number

      //add card to collection of cards.
      this.numOnField.push(cardRank);

      //create a new field to play on.
      let cardSuit = $card.attr('class');
      cardSuit = _.last(cardSuit.split(' '));

    }
    else {

    }
  }

  this.makeDefend = function($card){

  }
  this.recover = function() {

    this.nextTurn();
  }




}
