document.addEventListener("DOMContentLoaded", function () {
  let redGamePath = [33, 34, 48, 49,
    91, 92, 93, 94, 95,
    81, 66, 51, 36, 21, 6, 7,
    8, 23, 38, 53, 68, 83, 99,
    100, 101, 102, 103, 104, 119,
    134, 133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218,
    217, 216, 201, 186, 171, 156,
    141, 125, 124, 123, 122, 121, 120, 105,
    106, 107, 108, 109, 110, 111, 112
  ]
  let blueGamePath = [41, 42, 56, 57,
    23, 38, 53, 68, 83, 99,
    100, 101, 102, 103, 104, 119,
    134, 133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218,
    217, 201, 186, 171, 156,
    141, 126, 125, 124, 123, 122, 121, 120,
    105, 90, 91, 92, 93, 94, 95,
    81, 66, 51, 36, 21, 6, 7, 22, 37,
    52, 67, 82, 97, 112
  ]
  let greenGamePath = [176, 177, 191, 192,
    133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218,
    217, 201, 186, 171, 156,
    141, 126, 125, 124, 123, 122, 121, 120, 105,
    90, 91, 92, 93, 94, 95, 81, 66,
    51, 36, 21, 6, 7, 8, 23, 38, 53, 68,
    83, 99, 100, 101, 102, 103, 104, 119,
    118, 117, 116, 115, 114, 113, 112
  ]
  let yellowGamePath = [167, 168, 182, 183,
    201, 186, 171, 156,
    141, 125, 124, 123, 122, 121, 120, 105,
    90, 91, 92, 93, 94, 95, 81, 66,
    51, 36, 21, 6, 7, 8, 23, 38, 53, 68,
    83, 99, 100, 101, 102, 103, 104, 119,
    134, 133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218,
    217, 202, 187, 172, 157, 142, 127, 112
  ]
  let winner = "";
  let redHomeCount = 0;
  let blueHomeCount = 0;
  let yellowHomeCount = 0;
  let greenHomeCount = 0;

  const players = ["red", "blue", "yellow", "green"]
  const playingPlayers = [];
  let diceRollValue;

  //Red Counter Variables
  let redCountersYard = ["red-one", "red-two", "red-three", "red-four"];
  let redCountersPlaying = [];
  let redCountersPos = [];

  //Blue Counter Variables
  let blueCountersYard = ["blue-one", "blue-two", "blue-three", "blue-four"];
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

  document.getElementsByClassName("dice-btn")[1].disabled = true;

  const playGame = document.getElementById("playGameBtn");
  playGame.addEventListener("click", function () {
    document.getElementsByClassName("container")[0].setAttribute("class", "container hidden");
    document.getElementsByClassName("players")[0].classList.remove("hidden");
  });

  const startGame = document.getElementById("startGameBtn");
  let twoRadio = document.getElementById("twoRadio");
  let threeRadio = document.getElementById("threeRadio");
  let fourRadio = document.getElementById("fourRadio");

  var name = document.getElementsByClassName("player-name");
  startGame.addEventListener("click", function () {
    document.getElementsByClassName("players")[0].setAttribute("class", "container hidden players");
    document.getElementsByClassName("game-container")[0].classList.remove("hidden");
    //  How many players are playing and appends the players to the game board on the left.
    if (twoRadio.checked) {
      createPlayer(2)
    } else if (threeRadio.checked) {
      createPlayer(3);
    } else {
      createPlayer(4);
    }
  });

  function createPlayer(numofP){
    for (let i = 0; i < numofP; i++) {
      playingPlayers.push(players[i]);
      if (i === 0) {
        name[i].innerHTML = players[i] + " it's your turn";
      } else {
        name[i].innerHTML = players[i]
      }
    }
  }

  //On click of the dice button
  var diceBtn = document.getElementsByClassName("dice-btn")[0];
  var nextTurnBtn = document.getElementsByClassName("dice-btn")[1];
  diceBtn.addEventListener("click", function () {
    diceBtn.disabled = true;
    nextTurnBtn.disabled = false;
    var name = document.getElementsByClassName("player-name");
    //If its Red Players Turn
    if (name[0].innerHTML === "red it's your turn") {
      playerTurn("red", 0);
    }
    //If its Blue Players Turn
    else if (name[1].innerHTML === "blue it's your turn") {
      playerTurn("blue", 1);
    }
    //If its Yellow Players Turn
    else if (name[2].innerHTML === "yellow it's your turn") {
      playerTurn("yellow", 2);
    }
    //If its Green Players Turn
    else {
      playerTurn("green", 3);
    }
  });



  function playerTurn(color, index) {
    let counterYard;
    let countersInPlay;
    let gridBox = document.getElementsByClassName("grid-item");
    var rd = rollDice()
    let gamePath;
    let playerName = document.getElementsByClassName("player-name")[index];
    let passBtn = document.getElementsByClassName("dice-btn")[1];

    if (color === "red") {
      counterYard = redCountersYard;
      countersInPlay = redCountersPlaying;
      gamePath = redGamePath;
    } else if (color === "blue") {
      counterYard = blueCountersYard;
      countersInPlay = blueCountersPlaying;
      gamePath = blueGamePath;
    } else if (color === "yellow") {
      counterYard = yellowCountersYard;
      countersInPlay = yellowCountersPlaying;
      gamePath = yellowGamePath;
    } else {
      counterYard = greenCountersYard;
      countersInPlay = greenCountersPlaying;
      gamePath = greenGamePath;
    }

    /*              COUNTER MOVING CONDITIONS             */

    //    Rolled a 6 --- Counters in home --- Counters in play --- Start Empty
    if (rd === 6 && counterYard.length > 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML == "") {
      console.log("User has rolled a 6, has counters in the home AND play AND start");
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. A counter has been taken from your home and is now in play.`;
      countersInPlay.push(counterYard.shift());
      var yardCounter = document.getElementsByClassName(countersInPlay[countersInPlay.length - 1])[0];
      document.getElementsByClassName("grid-item")[gamePath[4]].innerHTML = `<div class='${color}-counter'></div>`; // Places counter to start position
      yardCounter.removeAttribute("class", `${color}-counter`); // Removes a counter from yard
      //changes player when user clicks pass button
      passBtn.addEventListener("click", function () {
        changePlayer();
        document.getElementsByClassName("dice-btn")[0].disabled = false;
        document.getElementsByClassName("dice-btn")[1].disabled = true;
      });
    }

    //    Rolled a 6 --- Counters in home --- No Counters in play --- Start empty
    else if (rd === 6 && counterYard.length > 0 && countersInPlay.length == 0 && gridBox[gamePath[4]].innerHTML == "") {
      console.log("User has rolled a 6, has counters in the home AND start but NONE in play");
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. A counter has been taken from your home and is now in play.`;
      countersInPlay.push(counterYard.shift());
      var yardCounter = document.getElementsByClassName(countersInPlay[countersInPlay.length - 1])[0];
      document.getElementsByClassName("grid-item")[gamePath[4]].innerHTML = `<div class='${color}-counter'></div>`; // Places counter to start position
      yardCounter.removeAttribute("class", `${color}-counter`); // Removes a counter from yard
      //changes player when user clicks pass button
      passBtn.addEventListener("click", function () {
        changePlayer();
        document.getElementsByClassName("dice-btn")[0].disabled = false;
        document.getElementsByClassName("dice-btn")[1].disabled = true;
      });
    }

    //    Rolled a 6 --- No Counters in home -- Counters in play -- Start not empty
    else if (rd === 6 && counterYard.length == 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML != "") {
      console.log("User has rolled a 6, has NO counters in the home, counters in start AND play");
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      loopThroughGrid();
      passBtn.addEventListener("click", function () {
        document.getElementsByClassName("dice-btn")[0].disabled = false;
        document.getElementsByClassName("dice-btn")[1].disabled = true;
      });
    }

    //    Rolled a 6 --- No Counters in home -- Counters in play -- Start empty
    else if (rd === 6 && counterYard.length == 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML == "") {
      console.log("User has rolled a 6, has NO counters in the home, counters in play, start IS empty");
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      loopThroughGrid();
      passBtn.addEventListener("click", function () {
        document.getElementsByClassName("dice-btn")[0].disabled = false;
        document.getElementsByClassName("dice-btn")[1].disabled = true;
      });
    }

    //    Rolled any value --- Counters in home -- Counters in Play --- Start not empty
    else if (counterYard.length > 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML != "") {
      console.log("User has rolled any value, has counters in the home, start AND play");
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      loopThroughGrid();
      passBtn.addEventListener("click", function () {
        document.getElementsByClassName("dice-btn")[0].disabled = false;
        document.getElementsByClassName("dice-btn")[1].disabled = true;
      });
    }

    //    Rolled < 6 --- Counters in home --- Counters in play --- Start Empty
    else if (rd < 6 && counterYard.length > 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML == "") {
      console.log("User has rolled < 6 , ha counters in the home AND play, start IS empty");
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      loopThroughGrid();
      passBtn.addEventListener("click", function () {
        document.getElementsByClassName("dice-btn")[0].disabled = false;
        document.getElementsByClassName("dice-btn")[1].disabled = true;
      });
    }

    //    Rolled < 6 --- Counters in home --- No Counters in play --- Start Empty
    else if (rd < 6 && counterYard.length > 0 && countersInPlay.length == 0 && gridBox[gamePath[4]].innerHTML == "") {
      console.log("User has rolled < 6 , has counters in the home AND NONE in play, start IS empty");
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. You have no counters in play and need to roll a 6 to release a counter from your home. Better luck next time.`;
      passBtn.addEventListener("click", function () {
        document.getElementsByClassName("dice-btn")[0].disabled = false;
        document.getElementsByClassName("dice-btn")[1].disabled = true;
        changePlayer();
      });
    }

    //    Rolled < 6 --- NO counters in home --- Counters in play --- Start Empty
    else if (rd < 6 && counterYard.length == 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML == "") {
      console.log("User has rolled < 6 , no counters in the home, counters in play, start IS empty");
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      passBtn.addEventListener("click", function () {
        document.getElementsByClassName("dice-btn")[0].disabled = false;
        document.getElementsByClassName("dice-btn")[1].disabled = true;
        changePlayer();
      });
    }

    //    Rolled < 6 --- NO counters in home --- Counters in play --- Start Empty
    else if (rd < 6 && counterYard.length == 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML != "") {
      console.log("User has rolled < 6 , no counters in the home, counters in play, start IS NOT empty");
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      passBtn.addEventListener("click", function () {
        document.getElementsByClassName("dice-btn")[0].disabled = false;
        document.getElementsByClassName("dice-btn")[1].disabled = true;
        changePlayer();
      });
    } else {
      debugger;
      alert("no condition");
    }

    function loopThroughGrid() {
      // Loops through each grid item and places an event listener on it
      for (let i = 4; i < 225; i++) {
        gridBox[i].addEventListener("click", function () {
          // if a counter is found in a grid
          if (gridBox[i].innerHTML == `<div class="${color}-counter"></div>`) {
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
                    for (let m = 0; m < playingPlayers.length; m++) {
                      if (playingPlayers[m] != color) {
                        if (gridBox[gamePath[counterLoc + diceRollValue]].innerHTML.includes(playingPlayers[m])) {
                          gridBox[gamePath[counterLoc + diceRollValue]].innerHTML = `<div class="${color}-counter"></div>`;
                          gridBox[i].innerHTML = "";
                          if (playingPlayers[m] == "red") {
                            var setNum = redCountersYard.length + 1;
                            if (redCountersYard.length === 3) {
                              setNum = "one";
                            } else if (redCountersYard.length === 2) {
                              setNum = "two";
                            } else if (redCountersYard.length === 1) {
                              setNum = "three";
                            } else if (redCountersYard.length === 0) {
                              setNum = "four";
                            }
                            redCountersPlaying.shift();
                            redCountersYard.push(redCountersPlaying.shift());
                            elem = document.getElementsByClassName(`red-home-${setNum}`)[0];
                            elem.innerHTML = `<div class="${playingPlayers[m]}-counter red-${setNum}"></div>`; // Places counter to start positions
                          } else if (playingPlayers[m] == "blue") {
                            console.log("blue counter");
                            console.log(blueCountersPlaying);
                            if (blueCountersYard.length === 3) {
                              setNum = "one";
                            } else if (blueCountersYard.length === 2) {
                              setNum = "two";
                            } else if (blueCountersYard.length === 1) {
                              setNum = "three";
                            } else if (blueCountersYard.length === 0) {
                              setNum = "four";
                            }
                            blueCountersPlaying.shift();
                            blueCountersYard.push(blueCountersPlaying.shift());
                            elem = document.getElementsByClassName(`blue-home-${setNum}`)[0];
                            elem.innerHTML = `<div class='${playingPlayers[m]}-counter blue-${setNum}'></div>`; // Places counter to start positions
                            console.log(blueCountersPlaying + " second");
                          } else if (playingPlayers[m] == "yellow") {
                            setNum = yellowCountersYard.length + 1
                            yellowCountersPlaying.shift();
                            elem = document.getElementsByClassName(`yellow-home-${setNum}`)[0];
                            elem.innerHTML = `<div class='${playingPlayers[m]}-counter'></div>`; // Places counter to start positions
                          } else {
                            setNum = greenCountersYard.length + 1
                            greenCountersPlaying.shift();
                            elem = document.getElementsByClassName(`green-home-${setNum}`)[0];
                            elem.innerHTML = `<div class='${playingPlayers[m]}-counter'></div>`; // Places counter to start positions
                          }
                        }
                      }
                    }
                  } else if (gamePath[counterLoc + diceRollValue] == gamePath[gamePath.length - 1]) {
                    console.log()
                    gridBox[i].innerHTML = "";
                    gridBox[gamePath[counterLoc + diceRollValue]].innerHTML = `<div class="${color}-counter"></div>`
                    setTimeout(function () {
                      gridBox[gamePath[counterLoc + diceRollValue]].innerHTML = "";
                      if (color == "red") {
                        redHomeCount++
                        redCountersPlaying.shift();
                        if (redHomeCount === 1) {
                          document.getElementById("winner").innerHTML = "<p>Congratulations Red\n\nYou Won !!\n\n</p><br><br><button>Play Again</button>";
                          document.getElementsByClassName("outer-winner")[0].classList.remove("hidden");
                        }
                      } else if (color = "blue") {
                        blueHomeCount++;
                        blueCountersPlaying.shift();
                        if (blueHomeCount === 1) {
                          document.getElementById("winner").innerHTML = "Congratulations Blue\n\nYou Won !!"
                          document.getElementsByClassName("outer-winner")[0].classList.remove("hidden");
                        }
                      } else if (color = "yellow") {
                        yellowHomeCount++;
                        yellowCountersPlaying.shift();
                        if (yellowHomeCount === 4) {
                          winner = "yellow"
                        }
                      } else {
                        greenHomeCount++;
                        greenCountersPlaying.shift();
                        if (greenHomeCount === 4) {
                          winner = "green"
                        }
                      }
                    }, 2000);

                  } else {
                    gridBox[gamePath[counterLoc + diceRollValue]].innerHTML = `<div class="${color}-counter"></div>`;
                    gridBox[i].innerHTML = ""; //clear grid item
                    changePlayer();
                    document.getElementsByClassName("dice-btn")[1].disabled = true;
                    document.getElementsByClassName("dice-btn")[0].disabled = false;
                  }
                } else {
                  console.log("you dont have enough space.");
                  passBtn.addEventListener("click", function () {
                    document.getElementsByClassName("dice-btn")[0].disabled = false;
                    document.getElementsByClassName("dice-btn")[1].disabled = true;
                    changePlayer();
                  });
                }
              }
            }
          }
        });
      }
    }

    function changePlayer() {
      // console.log("player changed from: " + color)
      if (playingPlayers.indexOf(color) != playingPlayers.length - 1) {
        var newPlayer = playingPlayers[playingPlayers.indexOf(color) + 1]
        if (newPlayer == "blue") {
          for (let l = 0; l < playingPlayers.length; l++) {
            name[l].innerHTML = playingPlayers[l];
          }
          name[1].innerHTML = "blue it's your turn";
        } else if (newPlayer == "yellow") {
          for (let l = 0; l < playingPlayers.length; l++) {
            name[l].innerHTML = playingPlayers[l];
          }
          name[2].innerHTML = "yellow it's your turn";
        } else {
          currentPlayer = "green"
          for (let l = 0; l < playingPlayers.length; l++) {
            name[l].innerHTML = playingPlayers[l];
          }
          name[3].innerHTML = "green it's your turn";
        }
      } else {
        newPlayer = playingPlayers[0];
        for (let l = 0; l < playingPlayers.length; l++) {
          name[l].innerHTML = playingPlayers[l];
        }
        name[0].innerHTML = "red it's your turn";
      }
    }

  }

  function rollDice() {
    var randomNumber = Math.floor(Math.random() * 6) + 1;
    diceRollValue = randomNumber;
    return randomNumber;
  }
}); //  END OF DOMContentLoaded