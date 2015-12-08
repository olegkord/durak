'use strict';

let Deck = require('./deck');

module.exports = function Game(player1Name,player2Name){
  //constructor function for a new game object.

  this.deck = new Deck;
  this.trump = '';

  this.numOnField = [];
  //This will be an array of arrays holding pairs of cards in the middle of the field.
  this.fieldCards = [];
  this.players = []

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
      fieldCards: this.fieldCards,
      players: [this.player1, this.player2],
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
    for (let i = 0; i< 6; i++){
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

  this.vetAttackCard = function(attackingCard) {
    //this function evaluates game rules to see if a given card can be played.
    //returns TRUE or FALSE
    let numCheck = this.numOnField.includes(attackingCard.number);

    //user can attack if the card's number is already on the field or if there are 0 cards on the field.
    return (numCheck) || (this.numOnField.length === 0)
  }

  this.makeAttack = function(cardData){
    //This function covers all requirements for an attack
    let handIndex = cardData.handIndex;
    let newPair = [];
    //remove card from player's hand and put into the field.
    let attackingCard = this.players[this.attacking].hand.splice(handIndex,1);

    newPair.push(attackingCard[0]);

    this.fieldCards.push(newPair);
    this.numOnField.push(attackingCard[0].number)
  }

  this.vetDefendCard = function(defendingCard) {
    //This function applies game rules to allow or disallow a played defence card.
    //return TRUE or FALSE

    let numPairs = this.fieldCards.length-1;

    let attackingCard = this.fieldCards[numPairs][0];

    //define booleans for evaluating card.
    let suitCheck = (defendingCard.suit === attackingCard.suit);
    let valCheck  = ((defendingCard.number > attackingCard.number) || (defendingCard.suit === this.trump));

    //both booleans must be true.
    return (suitCheck && valCheck);
  }

  this.makeDefend = function(data){
    //turn off attacking player's click events here
    let handIndex = data.handIndex;

    //remove card from player's hand and put into the field.
    let defendingCard = this.players[this.defending].hand.splice(handIndex,1);
    let numPairs = this.fieldCards.length-1;

    this.fieldCards[numPairs].push(defendingCard);
    this.numOnField.push(defendingCard[0].number);

  }

  this.recover = function() {

    this.nextTurn();
  }

}
///////
//HELPER FUNCTIONS
//////
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  };
}
