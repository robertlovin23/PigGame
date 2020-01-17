/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, dice, dice1, gamePlaying;

init();

var lastRoll;
// document.querySelector("#current-" + activePlayer).innerHTML = '<em> ' + dice + ' </em>';
//setter
// document.querySelector('#current-' + activePlayer).textContent = dice;
// // getter
// var x = document.querySelector("#score-0").textContent;
// console.log(x);

//can use anonymous function or callback
//addEventListener
document.querySelector(".btn-roll").addEventListener('click',function() {
    if(gamePlaying){
        // 1. random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;
        // 2. display result
        var diceDOM = document.querySelector(".dice")
        var diceDOM2 = document.querySelector(".dice1")
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png'
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice1 + '.png'
        // 3. update round score, IF rolled number was not a 1
        if(dice === 6 && lastRoll === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }
        if(dice !== 1 && dice1 !== 1){
            //add score
            roundScores += dice + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;

        } else {
            nextPlayer();
        }
    }
});
document.querySelector(".btn-hold").addEventListener('click', function(){
    if(gamePlaying){
          // Add CURRENT score to GLOBAL score
           scores[activePlayer] += roundScores;
          // Update the UI
           document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];   
          //Check if player won game
           var winningScore = document.querySelector('#input-winning-score').value
           if(winningScore){
               winning = winningScore
           } else {
               winning = 100;
           }
           if(scores[activePlayer] >= winningScore){
               document.querySelector('#name-' + activePlayer).textContent = "Winner!";
               document.querySelector('.dice').style.display = "none";
               document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
               document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
               gamePlaying = false;
           } else {
               nextPlayer();
           }       
    }    
})
//Uses a ternary operator to determine the index of the active player
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none'
    document.querySelector('.dice1').style.display = 'none'
}

document.querySelector(".btn-new").addEventListener('click', init);

//Sets the initial values of the game including the round scores, the active player, the total scores, and whether or not the game is being played.
function init(){
    scores = [0,0];
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector(".dice").style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}










