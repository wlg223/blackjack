/*
 * This files holds all the code to for your card game
 */

//Run once broswer has loaded everything



window.onload = function () {
var obj;

document.body.style.backgroundColor = "green"; //sets background color to green


//document.getElementById("p2").innerHTML = "100";

$('.ui.modal') 
  .modal('show')  //displays the inital modal 
  .click(function() {
    $('.ui.green.button').hide() //hides the modal button when the button is pushed
    $('.ui.modal').modal('hide') //hides the modal when the button is pushed
    });
;


var pScore = 0;
var dScore = 0;
var changeTurns = 0;
var deckID = 0;


function shuffle(){ //function fetches a shuffled deck and sets the deck id to a global variable
  return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(response => response.json())
  .then(function(data){
    obj = data;
    deckID = obj.deck_id; //sets deck id to a global variable
    
  })
  .catch(error =>{
    console.error(error)
  });
  
}

async function func1(){
  await shuffle(); //shuffles the deck
  return fetch('https://deckofcardsapi.com/api/deck/'+deckID+'/draw/?count=20',{method: 'GET'})//gets the first 20 cards out of the deck, there's no particular reason why 20 cards was selected just felt like a good number
  .then(response => response.json())
  .then(function(data){
    obj = data;

    //creates the 4 initial cards for player and dealer
    var x1 = document.createElement("IMG");
    var x2 = document.createElement("IMG");
    var y1 = document.createElement("IMG");
    var y2 = document.createElement("IMG");
    var deck = document.createElement("IMG");
    
    deck.setAttribute("src", "https://i.pinimg.com/originals/46/2e/78/462e78405e5ef0dcb0b6f2fc091ff594.jpg"); //gets the back of the card image and sets it as the deck picture
    deck.setAttribute("height", "210");
    
   
    
    var carddeck = document.getElementById('carddeck');
    deck.style.width = "150px";
    carddeck.appendChild(deck);


    //gets the images of the player's cards
    x1.setAttribute("src", obj.cards[0].image);
    x2.setAttribute("src", obj.cards[1].image);
    x1.style.width = "150px";  //sets the width of the card elements
    x2.style.width = "150px";
    var div1 = document.getElementById('playerhand');

    //sends the images to the playerhand
    div1.appendChild(x1);
    div1.appendChild(x2);

    //gets the images of the dealer's cards
    y1.setAttribute("src", obj.cards[2].image);
    y2.setAttribute("src", "https://i.pinimg.com/originals/46/2e/78/462e78405e5ef0dcb0b6f2fc091ff594.jpg");
    y2.setAttribute("height", "210");
    
    y1.style.width = "150px";
    y2.style.width = "150px";
    var div2 = document.getElementById('dealerhand');

    //sends elements to dealerhand
    div2.appendChild(y1);
    div2.appendChild(y2);

    //updates the player and dealer score
    pScore += getCardNumber(0);
    pScore += getCardNumber(1);
    dScore += getCardNumber(2);
    //dScore += getCardNumber(3);
    document.getElementById("p1").innerHTML = pScore;
    document.getElementById("p2").innerHTML = dScore;

    if(pScore == 21) //checks if the player has a blackjack
      determineWin();


  //initializes 5 more cards for player and dealer
   var x3 = document.createElement("IMG");
   var x4 = document.createElement("IMG");
   var x5 = document.createElement("IMG");
   var x6 = document.createElement("IMG");
   var x7 = document.createElement("IMG");
   var y3 = document.createElement("IMG");
   var y4 = document.createElement("IMG");
   var y5 = document.createElement("IMG");  
   var y6 = document.createElement("IMG");  
   var y7 = document.createElement("IMG");  

   var hit = document.getElementById('hitBtn')//sets the hit button to a variable
   var i = 0;
   var j = 0;
   var k = 0;

   hit.addEventListener('click', e =>{
     
     if(changeTurns == 0){ // if changeTurns equals 0, it's the player's turn
     k=i+4;

     //if statements adds upto 5 cards to the player hand, there's no particular reason why it's only 5 cards except that it's unlikely that selecting more than 5 cards will be under 21
     if(i==0){
      x3.setAttribute("src", obj.cards[k].image);
      x3.style.width = "150px";
      div1.appendChild(x3);
     }
     else if(i==1){
      x4.setAttribute("src", obj.cards[k].image);
      x4.style.width = "150px";
      div1.appendChild(x4);
     }
     else if(i==2){
      x5.setAttribute("src", obj.cards[k].image);
      x5.style.width = "150px";
      div1.appendChild(x5);
     }
     else if(i==3){
      x6.setAttribute("src", obj.cards[k].image);
      x6.style.width = "150px";
      div1.appendChild(x6);
     }
     else if(i==4){
      x7.setAttribute("src", obj.cards[k].image);
      x7.style.width = "150px";
      div1.appendChild(x7);
     }


     pScore += getCardNumber(k);//adds the value of the card to the total player hand score
     document.getElementById("p1").innerHTML = pScore;
    
    if(pScore > 21){ //checks if the score is over 21, if it is then it ends the game
      changeTurns = 2;
      determineWin(); //determineWin() determines who the winner of the game is
    }
    i++;
    }
    else if(changeTurns == 1){ //changeTurns = 1 starts the dealer turns
      k++;
      //if statements add upto 5 cards to dealer hand
      if(j==0){
      y3.setAttribute("src", obj.cards[k].image);
      y3.style.width = "150px";
      
      div2.appendChild(y3);
      
     }
     else if(j==1){
      y4.setAttribute("src", obj.cards[k].image);
      y4.style.width = "150px";
      div2.appendChild(y4);
     }
     else if(j==2){
      y5.setAttribute("src", obj.cards[k].image);
      y5.style.width = "150px";
      div2.appendChild(y5);
     }
     else if(j==3){
      y6.setAttribute("src", obj.cards[k].image);
      y6.style.width = "150px";
      div2.appendChild(y6);
     }
     else if(j==4){
      y7.setAttribute("src", obj.cards[k].image);
      y7.style.width = "150px";
      div2.appendChild(y7);
     }
     dScore += getCardNumber(k);
     document.getElementById("p2").innerHTML = dScore;


    if(dScore > 21){ //if the dealer's score is over 21 it calls the determineWin() function
      determineWin();
    }
    j++;
    }

    
     

     
   });

   var stay = document.getElementById('stayBtn') //sets the stay button as a variable

   stay.addEventListener('click', e =>{ //this runs when the stay button is hit
     if(changeTurns == 1 && dScore >= 17){ //checks if it's the dealer's turn and if the dealer has a score over 17
      changeTurns = 2; //changes the turn to 2 which is no one's turn
      determineWin();
     } 
     else if(changeTurns == 0){ //checks if it's the players turn
     changeTurns = 1;  //sets changeTurns to 1 which would initialize the dealer's turn

     y2.classList.add('flip'); //adds the flip class to y2 to "flip" the card
     

     y2.setAttribute("src", obj.cards[3].image);  //reveals 2nd dealer card
     dScore += getCardNumber(3); //adds the 2nd dealer card value to the dealer's total score
     document.getElementById("p2").innerHTML = dScore; //sets the score to the page
     }

   });
   

   if(changeTurns == 2){ //if changeTurns is 2 it means the game's over and it determines the winner of the game
    determineWin();
   }

  })
  .catch(error =>{
  console.error(error)});

}

function getCardNumber(num){ //this function returns the numerical value of the card
  
  if(obj.cards[num].value === "2")
    return 2;
  else if(obj.cards[num].value === "3")
    return 3;
  else if(obj.cards[num].value === "4")
    return 4;
  else if(obj.cards[num].value === "5")
    return 5;
  else if(obj.cards[num].value === "6")
    return 6;
  else if(obj.cards[num].value === "7")
    return 7;
  else if(obj.cards[num].value === "8")
    return 8;
  else if(obj.cards[num].value === "9")
    return 9;
  else if(obj.cards[num].value === "10" || obj.cards[num].value === "JACK" || obj.cards[num].value === "KING" || obj.cards[num].value === "QUEEN")
    return 10;
  else if(obj.cards[num].value === "ACE"){ //returns 1 or 11 depending on if the total score is greater than 21 when 11 is added
    if(changeTurns == 0){  
      if(pScore+11 <= 21)
        return 11;
     else return 1;
    }
    else{
      if(dScore+11 <= 21)
        return 11;
     else return 1;
    }
  }
 
  
}


function determineWin(){ //this function checks all the possible win conditions and then determines who wins
  setTimeout(function(){
  if(pScore > 21){
    document.getElementById("p4").innerHTML = "Dealer Wins";
  }
  else if(dScore>21){
    document.getElementById("p4").innerHTML = "Player Wins";
  }
  else if(pScore > dScore){
    document.getElementById("p4").innerHTML = "Player Wins";
  }
  else if(pScore < dScore){
    document.getElementById("p4").innerHTML = "Dealer Wins";
  }else{
    document.getElementById("p4").innerHTML = "Tie";
  }
  gameover(); //gameover function ends the game no matter the win condition
  }, 500);

}

async function gameover(){ //function display the gameover modal 
  
  $('.ui.modal2')
  .modal('show')
  .click(function() { //if the play again button is clicked it resets the game
    pScore = 0;
    dScore = 0;
    changeTurns = 0;
    deckID = 0;

    window.location.reload(false);

    $('.ui.blue.button').hide //button click hides button
    $('.ui.modal2').modal('hide') //button click hides modal
    
    });
;




}



func1();

};


