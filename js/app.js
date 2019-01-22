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

document.addEventListener("DOMContentLoaded", function () {
  let redGamePath = [90, 91, 92, 93, 94, 95,
    81, 66, 51, 36, 21, 6, 7,
    8, 23, 38, 53, 68, 83, 99,
    100, 101, 102, 103, 104, 119,
    134, 133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218,
    217, 216, 201, 186, 171, 156,
    141, 125, 124, 123, 122, 121, 120, 105,
    106, 107, 108, 109, 110, 111
  ]
  let blueGamePath = [
    8, 23, 38, 53, 68, 83, 99,
    100, 101, 102, 103, 104, 119,
    134, 133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218,
    217, 201, 186, 171, 156,
    141, 126, 125, 124, 123, 122, 121, 120,
    105, 90, 91, 92, 93, 94, 95,
    81, 66, 51, 36, 21, 6, 7, 22, 37,
    52, 67, 82, 97
  ]
  let greenGamePath = [
    134, 133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218,
    217, 201, 186, 171, 156,
    141, 126, 125, 124, 123, 122, 121, 120, 105,
    90, 91, 92, 93, 94, 95, 81, 66,
    51, 36, 21, 6, 7, 8, 23, 38, 53, 68,
    83, 99, 100, 101, 102, 103, 104, 119,
    118, 117, 116, 115, 114, 113
  ]
  let yellowGamePath = [
    216, 201, 186, 171, 156,
    141, 125, 124, 123, 122, 121, 120, 105,
    90, 91, 92, 93, 94, 95, 81, 66,
    51, 36, 21, 6, 7, 8, 23, 38, 53, 68,
    83, 99, 100, 101, 102, 103, 104, 119,
    134, 133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218,
    217, 202, 187, 172, 157, 142, 127
  ]
  const winner = ""
  const players = ["red", "blue", "yellow", "green"]
  const currentPlayer = "red";
  const playingPlayers = [];
  let diceRollValue;

  //Red Counter Variables
  let redCountersYard = ["red-one", "red-two", "red-three", "red-four"];
  let redCountersPlaying = [];
  let redCountersPos = [];

  //Blue Counter Variables
  let blueCountersYard = ["red-one", "red-two", "red-three", "red-four"];
  let blueCountersPlaying = [];
  let blueCountersPos = [];

  //Yellow Counter Variables
  let yellowCountersYard = ["yellow-one", "yellow-two", "yellow-three", "yellow-four"];
  let yellowCountersPlaying = [];
  let yellowCountersPos = [];

  //Green Counter Variables
  let greenCountersYard = ["green-one", "green-two", "green-three", "green-four"];
  let greenCountersPlaying = [];
  let greenCountersPos = [];


  //  Asks user how many players are playing and appends the players to the game board on the left.
  var numOfPlayers = prompt("How many players in this game? (2 - 4 players)");
  for (let i = 0; i < parseInt(numOfPlayers); i++) {
    var name = document.getElementsByClassName("player-name");
    playingPlayers.push(players[i]);
    if (i === 0) {
      name[i].innerHTML = players[i] + " it's your turn";
    } else {
      name[i].innerHTML = players[i]
    }
  }

  console.log(playingPlayers + playingPlayers.length);

  //On click of the dice button
  var diceBtn = document.getElementsByClassName("dice-btn")[0];
  diceBtn.addEventListener("click", function () {

    var name = document.getElementsByClassName("player-name");
    //If its Red Players Turn
    if (name[0].innerHTML === "red it's your turn") {
      console.log("reds turn");
      playerTurn("red");
    }
    else if (name[1].innerHTML === "blue it's your turn") {
      console.log("blues turn");
      playerTurn("blue");
    }
    else if (name[2].innerHTML === "yellow it's your turn") {
      console.log("yellows turn");
      playerTurn("yellow");
    }
    else {
      console.log("greens turn");
      playerTurn("green");
    }
  });



  function playerTurn(color) {
    //If red players has rolled a 6 and still got counters in the yard.
    let counterYard;
    let countersInPlay;
    let gridBox = document.getElementsByClassName("grid-item");
    var rd = rollDice()
    let gamePath

    if (color == "red") {
      counterYard = redCountersYard;
      countersInPlay = redCountersPlaying;
      gamePath = redGamePath;
    }
    else if (color == "blue") {
      counterYard = blueCountersYard;
      countersInPlay = blueCountersPlaying;
      gamePath = blueGamePath;
    }
    else if (color == "yellow") {
      counterYard = yellowCountersYard;
      countersInPlay = yellowCountersPlaying;
      gamePath = yellowGamePath;
    }
    else {
      counterYard = greenCountersYard;
      countersInPlay = greenCountersPlaying;
      gamePath = greenGamePath;
    }

    if (rd === 6 && counterYard.length > 0 && gridBox[gamePath[0]].innerHTML == "") {
      alert("you rolled a six");
      countersInPlay.push(counterYard[countersInPlay.length]);
      var yardCounter = document.getElementsByClassName(counterYard[countersInPlay.length - 1])[0];
      document.getElementsByClassName("grid-item")[gamePath[0]].innerHTML = `<div class='${color}-counter ${counterYard[countersInPlay.length - 1]}'></div>`; // Places counter to start position
      yardCounter.removeAttribute("class", `${color}-counter`); // Removes a counter from yard
      changePlayer();
      // Loops through each grid item and places an event listener on it
      for (let i = 0; i < 225; i++) {
        gridBox[i].addEventListener("click", function () {
          // if a counter is found in a grid
          if (gridBox[i].innerHTML != "") {
            if (gridBox[i].hasAttributes("class", `${color}-counter`)) {
              //  loops through game path array
              for (let j = 0; j < gamePath.length; j++) {
                //  if the grid location is found in the array move the counter x amount of spaces from that position according to the value of the dice roll.
                if (gamePath[j] == i) {
                  let counterLoc = gamePath.indexOf(i);
                  if ((diceRollValue + counterLoc) < gamePath.length) {
                    if (gridBox[gamePath[counterLoc + diceRollValue]].innerHTML == `<div class="${color}-counter"></div>`) {
                      console.log("You already have a counter in the position you want to move to.");
                    } else if (gridBox[gamePath[counterLoc + diceRollValue]].innerHTML != `<div class="${color}-counter"></div>` && gridBox[gamePath[counterLoc + diceRollValue]].innerHTML != "") {
                      console.log("someone else's counter is in this square.");
                    } else {
                      gridBox[gamePath[counterLoc + diceRollValue]].innerHTML = `<div class="${color}-counter"></div>`;
                      gridBox[i].innerHTML = ""; //clear grid item
                      if (playingPlayers.indexOf(color) != playingPlayers.length) {
                        var newPlayer = playingPlayers[playingPlayers.indexOf(color) + 1]
                        console.log(newPlayer);
                      }
                    }
                  } else {
                    console.log("you dont have enough space.")
                  }
                }
              }
            }
          }
        });
      }
    }
    else if (rd < 6 && counterYard.length > 0) {
      changePlayer()
    }
    else if (rd === 6 && counterYard.length == 0) {
      alert("please select what counter you'll like to move.");
      gridEventListener("red");
    }
    function changePlayer() {
      if (playingPlayers.indexOf(color) != playingPlayers.length - 1) {
        var newPlayer = playingPlayers[playingPlayers.indexOf(color) + 1]
        if (newPlayer == "blue") {
          name[0].innerHTML = "red";
          name[1].innerHTML = "blue it's your turn"
        }
        else if (newPlayer == "yellow") {
          name[1].innerHTML = "blue";
          name[2].innerHTML = "yellow it's your turn"
        }
        else {
          name[2].innerHTML = "yellow";
          name[3].innerHTML = "green it's your turn"
        }
      }
      else {
        console.log("last player")
        newPlayer = playingPlayers[0];
        name[0].innerHTML = "red it's your turn"
        for (let l = 1; l < name.length; l++) {
          name[l].innerHTML = name[l];
        }
      }
    }
  }


  function gridEventListener(color) {
    let gridBox = document.getElementsByClassName("grid-item");
    for (let i = 0; i < 255; i++) {
      gridBox[i].addEventListener("click", function () {
        if (gridBox[i].innerHTML == `<div class="${color}-counter"></div>`) {
          console.log("fount counter");
        }
      });
    }
  }

  function rollDice() {
    var randomNumber = Math.floor(Math.random() * 6) + 1;
    console.log(randomNumber);
    diceRollValue = randomNumber;
    return randomNumber;
  }



}); //  END OF DOMContentLoaded