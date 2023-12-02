const rollButton = document.getElementById("roll-button");
let rollsLeft = [3, 3];
let diceRolled = [false, false];
let currentPlayer = 1;

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".die").forEach(function (die) {
    die.setAttribute("data-value", 1);
    die.innerHTML =
      '<div class="dot" style="top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>';
  });
  const playerTurnDisplay = document.createElement("div");
  playerTurnDisplay.id = "playerTurn";
  playerTurnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  document.body.insertBefore(playerTurnDisplay, document.body.firstChild);
});

document.getElementById("roll-button").addEventListener("click", function() {
  let playerIndex = currentPlayer - 1;
  if (rollsLeft[playerIndex] > 0) {
    rollDice() 
      .then(diceValues => {
        updateDice(diceValues);
        rollsLeft[playerIndex]--;
        document.getElementById("rollsLeft").textContent = rollsLeft[playerIndex];

        var audio = document.getElementById("diceSound");
        audio.play();
        diceRolled[playerIndex] = true;
        fetchScoresAndUpdate(diceValues);
        document.getElementById("total").textContent = diceValues.reduce(
          (acc, val) => acc + val, 0);
      })
      .catch(error => {
        console.error('Error during dice roll:', error);
      });
  }
});

function getDiceStatus() {
  const diceElements = document.querySelectorAll(".die");
  let diceStatus = [];

  diceElements.forEach((die) => {
    const isSelected = die.classList.contains("selected");
    const value = parseInt(die.getAttribute("data-value"));
    diceStatus.push({ value, isSelected });
  });

  return diceStatus;
}

async function rollDice() {
  let diceStatus = getDiceStatus();
  console.log("Sending dice status:", diceStatus);
  const serverEndpoint = 'http://localhost:3000/rollDice'; 

  try {
    const response = await fetch(serverEndpoint, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ diceStatus })
    });

    if (!response.ok) { 
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const diceValues = await response.json();
    return diceValues;
  } catch (error) {
    console.error('Error during rollDice:', error);
    throw error;
  }
}

function fetchScoresAndUpdate(diceValues) {
  fetch('/calculate-scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ diceValues })
  })
  .then(response => response.json())
  .then(scores => {
    updateScores(scores);
  })
  .catch(error => console.error('Error:', error));
}

function updateScores(scores) {
  const scoreIds = [
    "ones", "twos", "threes", "fours", "fives", "sixes",
    "threeKind", "fourKind", "fullHouse", "smallStraight",
    "largeStraight", "chance", "yatzy"
  ];

  scoreIds.forEach(scoreId => {
    if (!document.getElementById(currentPlayer + scoreId).getAttribute("data-locked")) {
      document.getElementById(currentPlayer + scoreId).textContent = scores[scoreId];
    }
  });
}

function lockScore(scoreId) {
  let playerIndex = currentPlayer - 1;
  if (!diceRolled[playerIndex]) {
    alert("Roll the dice first!");
    return;
  } else {
    const scoreElement = document.getElementById(scoreId);
    const scoreValueNumeric = parseFloat(scoreElement.textContent);
    console.log(scoreId + " Check: " + scoreValueNumeric);

    scoreElement.setAttribute("data-locked", "true");

    scoreElement.style.backgroundColor = "lightgray";
    scoreElement.style.cursor = "default";

    rollsLeft[playerIndex] = 3;
    document.getElementById("rollsLeft").textContent = rollsLeft[playerIndex];
    document.getElementById("total").textContent = 0;
    resetDice();

    checkAllScoresLocked();
    diceRolled[playerIndex] = false;
    resetUnselectedScores();
    switchPlayer();
  }
}

function checkAllScoresLocked() {
  const player1ScoreIds = [
    "1ones",
    "1twos",
    "1threes",
    "1fours",
    "1fives",
    "1sixes",
    "1threeKind",
    "1fourKind",
    "1fullHouse",
    "1smallStraight",
    "1largeStraight",
    "1chance",
    "1yatzy",
  ];

  const player2ScoreIds = [
    "2ones",
    "2twos",
    "2threes",
    "2fours",
    "2fives",
    "2sixes",
    "2threeKind",
    "2fourKind",
    "2fullHouse",
    "2smallStraight",
    "2largeStraight",
    "2chance",
    "2yatzy",
  ];

  const allLockedPlayer1 = player1ScoreIds.every(
    (id) => document.getElementById(id).getAttribute("data-locked") === "true"
  );

  const allLockedPlayer2 = player2ScoreIds.every(
    (id) => document.getElementById(id).getAttribute("data-locked") === "true"
  );

  if (allLockedPlayer1 && allLockedPlayer2) {
    const totalPlayer1 = calculateTotal(1);
    const totalPlayer2 = calculateTotal(2);

    document.getElementById("1Sum").textContent = calculateUpperSum(1);
    document.getElementById("2Sum").textContent = calculateUpperSum(2);

    document.getElementById("1TotalPoints").textContent = totalPlayer1;
    document.getElementById("2TotalPoints").textContent = totalPlayer2;

    let winnerMessage =
      "Player 1's total score is: " +
      totalPlayer1 +
      "\nPlayer 2's total score is: " +
      totalPlayer2;

    if (totalPlayer1 > totalPlayer2) {
      winnerMessage += "\nPlayer 1 is the Winner!!";
    } else if (totalPlayer1 < totalPlayer2) {
      winnerMessage += "\nPlayer 2 is the Winner!!";
    } else {
      winnerMessage += "\nIt's a tie!";
    }

    alert(winnerMessage);
  }
  sendFinalScores();
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;

  const playerTurnDisplay = document.getElementById("playerTurn");
  playerTurnDisplay.textContent = `Player ${currentPlayer}'s Turn`;

  const player1Scores = document.getElementById("player1");
  const player2Scores = document.getElementById("player2");

  if (currentPlayer === 1) {
    player1Scores.classList.add("activePlayer");
    player2Scores.classList.remove("activePlayer");
  } else {
    player2Scores.classList.add("activePlayer");
    player1Scores.classList.remove("activePlayer");
  }

  rollsLeft[currentPlayer - 1] = 3;
  document.getElementById("rollsLeft").textContent =
    rollsLeft[currentPlayer - 1];
  diceRolled[currentPlayer - 1] = false;
  resetDice();
}

function isScoreSelected(scoreElementId) {
  const scoreElement = document.getElementById(scoreElementId);
  return scoreElement.getAttribute("data-locked") === "true";
}

function resetUnselectedScores() {
  const scoreIds = [
    "1ones",
    "1twos",
    "1threes",
    "1fours",
    "1fives",
    "1sixes",
    "1threeKind",
    "1fourKind",
    "1fullHouse",
    "1smallStraight",
    "1largeStraight",
    "1chance",
    "1yatzy",
    "2ones",
    "2twos",
    "2threes",
    "2fours",
    "2fives",
    "2sixes",
    "2threeKind",
    "2fourKind",
    "2fullHouse",
    "2smallStraight",
    "2largeStraight",
    "2chance",
    "2yatzy",
  ];

  scoreIds.forEach((id) => {
    if (!isScoreSelected(id)) {
      document.getElementById(id).textContent = "";
    }
  });
}

function sendFinalScores() {
  const player1Scores = retrieveLockedScores(1);
  const player2Scores = retrieveLockedScores(2);

  fetch('/finalScore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ player1Scores, player2Scores })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(({ totalScorePlayer1, totalScorePlayer2 }) => {
    console.log(`Player 1 Total Score: ${totalScorePlayer1}`);
    console.log(`Player 2 Total Score: ${totalScorePlayer2}`);
  })
  .catch(error => {
    console.error('Error sending final scores:', error);
  });
}

function retrieveLockedScores(playerNumber) {
  const scores = {};
  const scoreIds = [
    'ones', 'twos', 'threes', 'fours', 'fives', 'sixes',
    'threeKind', 'fourKind', 'fullHouse', 'smallStraight',
    'largeStraight', 'chance', 'yatzy'
  ];

  scoreIds.forEach(scoreId => {
    const scoreElement = document.getElementById(`${playerNumber}${scoreId}`);
    if (scoreElement && scoreElement.getAttribute('data-locked') === 'true') {
      scores[scoreId] = parseInt(scoreElement.textContent) || 0;
    }
  });

  return scores;
}

