
module.exports = function Deck() {
 //constructor for a deck of cards.
 //member variables:
 this.cards = [];

 //member functions:
 this.shuffle = function(o){
   //This function will shuffle the cards in the deck.
   //shuffle function taken from memory game.
   console.log('shuffling');
   for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
     return o;
 }
 this.build = function(){
   //This function will populate the deck with cards.
   console.log('building deck');
   var rank = '';
   var suits = ['diams','hearts','spades','clubs'];
   for (var j=0; j < suits.length; j++) {
     for (var i=6; i < 15; i++){
         switch(i) {
           case 11 :
             rank = 'j';
             break;
           case 12 :
             rank = 'q';
             break;
           case 13 :
             rank = 'k';
             break;
           case 14 :
             rank = 'a';
             break;
           default :
             rank = i.toString();
         }

         //Builds the cards using jquery based on the CSS for the cards.

         var rankStr = 'rank-'+rank;
         var suitsSym = '\n&'+suits[j]+';\n';
         var cardOuter = $('<a/>').addClass('card').addClass(rankStr).addClass(suits[j]).attr('data-value',i);
         cardOuter.append($('<span/>').addClass('rank').html(rank.toUpperCase()));
         cardOuter.append($('<span/>').addClass(suits[j]).html(suitsSym));

         var drawDeck = $('.deck#draw').append($('<li/>').html('<div class=\"card back\">*</div>'));

         this.cards.push(new Card(suits[j],i,cardOuter));
       }
     }
   }
}
