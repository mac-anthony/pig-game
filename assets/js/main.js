

//getting scores for each player and also getting the player round scores

let scores, roundScore, activePlayer,isGamePlaying;




function innitGame (){
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; /* to keep track of the player that is actively playing*/
  isGamePlaying = true;


  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  document.querySelector('#name--0').textContent = 'Player 1';
  document.querySelector('#name--1').textContent = 'Player 2';

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');

  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');

  document.querySelector('.player--0').classList.add('player--active');
}
innitGame();


let lastScore ;//variable to store the last score


//To get the roll btn to do something when clicked
document.querySelector('.btn--roll').addEventListener('click', function () {

  if (isGamePlaying){
    //1.make a RANDOM NUMBER
  let dice1 = Math.floor(Math.random() * 6) + 1;
  let dice2 = Math.floor(Math.random() * 6) + 1; /*the addition of one is to make sure that the values we get are from 1 to 6 instead of 0 to 6*/
   /*the addition of one is to make sure that the values we get are from 1 to 6 instead of 0 to 6*/

  //2.Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';

    document.getElementById('dice-1').src = '/assets/images/dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = '/assets/images/dice-' + dice2 + '.png'; //to get the dice images to change from 1-6 when btn(roll-dice is clicked)
    


  //3. Update the round IF the rolled number was NOT a 1

  if (dice1 !== 1 && dice2 !== 1) {
    //Add scores
    roundScore += dice1 + dice2; // this can also be written as roundScore = roundScore + dice

    document.querySelector('#current--' + activePlayer).textContent = roundScore; //Updating the score for active player
  } else {
    //Next players turn
    nextPlayer();
  }
  }
})

//HOLD BTN FUNCTIONALITY
document.querySelector('.btn--hold').addEventListener('click', function(){

  if (isGamePlaying){
    //Add CURRENT score to the GLOBAL score
  scores[activePlayer] += roundScore;

  //Update the score to the UI(screen)
  document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

  let userInputWinningScore = document.querySelector('.final-score').value;
  let winningScore;

  //if there's Undefined,0,null,"" in the input it is coerced to false,and anything else is coerced to true.
  if(userInputWinningScore){
    winningScore = userInputWinningScore;
  }

  //Check if player won the game
  if (scores[activePlayer] >= winningScore){
    document.querySelector('#name--' + activePlayer).textContent = 'YOU WIN!';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.querySelector('.player--' + activePlayer).classList.add('player--winner');
    document.querySelector('.player--' + activePlayer).classList.remove('player--active');
    isGamePlaying = false;

  }else{
    //Next players turn
   nextPlayer();
  }
   
  
  }
  
});

function nextPlayer(){
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  roundScore = 0; //to set the next players score to zero

  /* Resetting current scores to 0 */
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  /* Changing the active player background from the current player to the next player */
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');

  /* Resetting the dice display to NONE after the current player gets 1 */
  document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

// FOR NEXT GAME BTN FUNCTIONALITY
document.querySelector('.btn--new').addEventListener('click', innitGame);

