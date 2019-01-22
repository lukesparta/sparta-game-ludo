/*
          Psuedo Code

const playGame = document.getElementById("playGameBtn");
  playGame.addEventListener("click", function(){
    document.getElementsByClassName("container")[0].setAttribute("class", "container hidden");
    document.getElementsByClassName("players")[0].removeAttribute("class", "hidden")
    console.log( document.getElementsByClassName("container"))

  });

  const startGame = document.getElementById("startGameBtn");
  startGame.addEventListener("click", function(){
    console.log( document.getElementsByClassName("players"))
    document.getElementsByClassName("players")[0].setAttribute("class", "container hidden players");
    document.getElementsByClassName("game-container")[0].removeAttribute("class", "hidden");

  });


*/

document.addEventListener("DOMContentLoaded", function(){
  let gamePath = [90, 91, 92, 93, 94, 95, 
    81, 66, 51, 36, 21, 6, 7, 
    8, 23, 38, 53, 68, 83, 99, 
    100, 101, 102, 103, 104, 119, 
    134, 133,132, 131, 130, 129, 
    143, 158, 173, 188, 203, 218, 
    217, 216, 201, 186, 171, 156, 
    141, 125, 124, 123, 122, 121, 120, 105,
    106, 107, 108, 109, 110, 111]
  const winner = ""
  const players = ["red", "blue", "yellow", "green"]
  const playingPlayers = [];
  let diceRollValue;

  //Red Counter Variables
  let redCountersYard = ["red-one", "red-two", "red-three", "red-four"];
  let redCountersPlaying = [];
  let redCountersPos = [];

  //Blue Counter Variables
  let blueCountersYard = 4;
  let blueCountersPlaying = 0;
  let blueCountersPos = [];

  //Yellow Counter Variables
  let yellowCountersYard = 4;
  let yellowCountersPlaying = 0;
  let yellowCountersPos = [];

  //Green Counter Variables
  let greenCountersYard = 4;
  let greenCountersPlaying = 0;
  let greenCountersPos = [];


  //  Asks user how many players are playing and appends the players to the game board on the left.
  var numOfPlayers = prompt("How many players in this game? (2 - 4 players)");
  for(let i = 0; i < parseInt(numOfPlayers); i++){
    var name = document.getElementsByClassName("player-name");
    playingPlayers.push(players[i]);
    if(i === 0){
      name[i].innerHTML = players[i] + " it's your turn";
    }
    else{
      name[i].innerHTML = players[i]
    }
  }

  //On click of the dice button
  var diceBtn = document.getElementsByClassName("dice-btn")[0];
  diceBtn.addEventListener("click", function(){
    let gridBox = document.getElementsByClassName("grid-item");
    var rd = rollDice()
    var name = document.getElementsByClassName("player-name");
    //If its Red Players Turn
    if(name[0].innerHTML === "red it's your turn"){
      console.log("reds turn")
      //If red players has rolled a 6 and still got counters in the yard.
      if(rd === 6 && redCountersYard.length > 0 && gridBox[gamePath[0]].innerHTML == ""){
        alert("you rolled a six");
        redCountersPlaying.push(redCountersYard[redCountersPlaying.length]);
        var yardCounter = document.getElementsByClassName(redCountersYard[redCountersPlaying.length - 1])[0];
        document.getElementsByClassName("grid-item")[gamePath[0]].innerHTML = `<div class='red-counter ${redCountersYard[redCountersPlaying.length]}'></div>`; // Places counter to start position
        yardCounter.removeAttribute("class", `red-counter ${redCountersYard[redCountersPlaying.length]}`); // Removes a counter from yard

        
        // Loops through each grid item and places an event listener on it
        for(let i = 0; i < 225; i++){
          gridBox[i].addEventListener("click", function(){
            // if a counter is found in a grid
            if(gridBox[i].hasAttributes("class", "red-counter")){
              //  loops through game path array
              for(let j = 0; j < gamePath.length; j++){
                //  if the grid location is found in the array move the counter x amount of spaces from that position according to the value of the dice roll.
                if(gamePath[j] == i){
                  let counterLoc = gamePath.indexOf(i);
                  // if counter can has enough space to move the amount rolled by the dice then move it if not prompt user
                  
                  if(gridBox[gamePath[counterLoc+diceRollValue]].innerHTML == `<div class="red-counter"></div>`){
                    console.log("You already have a counter in the position you want to move to.");
                  }
                  else if(gridBox[gamePath[counterLoc+diceRollValue]].innerHTML != `<div class="red-counter"></div>` && gridBox[gamePath[counterLoc+diceRollValue]].innerHTML != ""){
                    console.log("someone else's counter is in this square.")
                  }
                  else if(diceRollValue + gamePath.indexOf(i) < gamePath.length){
                    gridBox[i].innerHTML = ""; //clear grid item
                    gridBox[gamePath[counterLoc+diceRollValue]].innerHTML = `<div class="red-counter"></div>`;
                  }
                  else{
                    console.log("you dont have enough space.")
                  }
                }
              }
            }
          });
        }
      }
      else if(rd === 6 && redCountersYard == 0){
        alert("please select what counter you'll like to move.");
        gridEventListener("red");
      }
    }
  });


  function gridEventListener(color){
    let gridBox = document.getElementsByClassName("grid-item");
    for(let i = 0; i < 255; i++){
      gridBox[i].addEventListener("click", function(){
        if(gridBox[i].innerHTML == `<div class="${color}-counter"></div>`){
          console.log("fount counter");
        }
      });
    }
  }

  function rollDice(){
    var randomNumber = Math.floor(Math.random()*6) +1;
    console.log(randomNumber);
    diceRollValue = randomNumber;
    return randomNumber;
  }

  
  
  
}); //  END OF DOMContentLoaded