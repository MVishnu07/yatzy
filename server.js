const express = require("express");
const cors = require("cors"); 
const app = express();
const port = 3000;
const path = require("path");

app.use(cors());

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "game.html"));
});

app.post("/rollDice", (req, res) => {
  if (!req.body || !Array.isArray(req.body.diceStatus)) {
    return res.status(400).json({ error: "Invalid input for dice roll." });
  }

    const diceStatus = req.body.diceStatus; 
    const diceValues = rollDie(diceStatus);
    res.json(diceValues);

});

app.post('/calculate-scores', (req, res) => {
  const diceValues = req.body.diceValues;
  
  const { 
    calculateOnesScore, 
    calculateTwosScore, 
    calculateThreesScore,
    calculateFoursScore,
    calculateFivesScore,
    calculateSixesScore,
    calculateThreeOfAKind,
    calculateFourOfAKind,
    calculateFullHouse,
    calculateSmallStraight,
    calculateLargeStraight,
    calculateChance,
    calculateYatzy
  } = require('./scoreLogic');

  const scores = {
    ones: calculateOnesScore(diceValues),
    twos: calculateTwosScore(diceValues),
    threes: calculateThreesScore(diceValues),
    fours: calculateFoursScore(diceValues),
    fives: calculateFivesScore(diceValues),
    sixes: calculateSixesScore(diceValues),
    threeKind: calculateThreeOfAKind(diceValues),
    fourKind: calculateFourOfAKind(diceValues),
    fullHouse: calculateFullHouse(diceValues),
    smallStraight: calculateSmallStraight(diceValues),
    largeStraight: calculateLargeStraight(diceValues),
    chance: calculateChance(diceValues),
    yatzy: calculateYatzy(diceValues)
  };

  res.json(scores);
});

app.post('/finalScore', (req, res) => {
  const { player1Scores, player2Scores } = req.body;
  console.log(player1Scores,player2Scores);

  try {
    const totalScorePlayer1 = calculateTotal(player1Scores);
    const totalScorePlayer2 = calculateTotal(player2Scores);

    res.json({ 
      totalScorePlayer1,
      totalScorePlayer2
    });
  } catch (error) {
    console.error('Error calculating total scores:', error);
    res.status(500).send('Error calculating total scores');
  }
});



function rollDie(diceStatus) {
  if (!Array.isArray(diceStatus) || !diceStatus.every(die => typeof die.value === 'number' && typeof die.isSelected === 'boolean')) {
    throw new Error('Invalid diceStatus format');
  }

  let diceValues = [];
  diceStatus.forEach(die => {
    diceValues.push(die.isSelected ? die.value : Math.floor(Math.random() * 6) + 1);
  });

  return diceValues;
}

function calculateTotal(scores) {
  let totalScore = 0;

  for (const category in scores) {
    if (scores.hasOwnProperty(category)) {
      totalScore += scores[category];
    }
  }
  return totalScore;
}


app.listen(port, () => {
  console.log(`Yatzy game server listening at http://localhost:${port}`);
});

// {
//   "diceStatus" = [
//     { "isSelected": false, "value": 1 },
//     { "isSelected": true, "value": 4 },
//     { "isSelected": false, "value": 6 },
//     { "isSelected": false, "value": 3 },
//     { "isSelected": true, "value": 5 }
//   ]
// }
// {
//   "player1Scores": [/* player 1 scores array */],
//   "player2Scores": [/* player 2 scores array */]
// }

