// function calculateOnesScore(diceValues) {
//   return diceValues.filter((val) => val === 1).length * 1;
// }

// function calculateTwosScore(diceValues) {
//   return diceValues.filter((val) => val === 2).length * 2;
// }

// function calculateThreesScore(diceValues) {
//   return diceValues.filter((val) => val === 3).length * 3;
// }

// function calculateFoursScore(diceValues) {
//   return diceValues.filter((val) => val === 4).length * 4;
// }

// function calculateFivesScore(diceValues) {
//   return diceValues.filter((val) => val === 5).length * 5;
// }

// function calculateSixesScore(diceValues) {
//   return diceValues.filter((val) => val === 6).length * 6;
// }

// function calculateThreeOfAKind(diceValues) {
//   const counts = Array(7).fill(0);
//   diceValues.forEach((val) => counts[val]++);
//   for (let i = 1; i <= 6; i++) {
//     if (counts[i] >= 3) {
//       return i * 3;
//     }
//   }
//   return 0;
// }

// function calculateFourOfAKind(diceValues) {
//   const counts = Array(7).fill(0);
//   diceValues.forEach((val) => counts[val]++);
//   for (let i = 1; i <= 6; i++) {
//     if (counts[i] >= 4) {
//       return i * 4;
//     }
//   }
//   return 0;
// }

// function calculateFullHouse(diceValues) {
//   const counts = Array(7).fill(0);
//   diceValues.forEach((val) => counts[val]++);
//   let hasThree = counts.some((val) => val === 3);
//   let hasTwo = counts.some((val) => val === 2);
//   return hasThree && hasTwo ? 25 : 0;
// }

// function calculateSmallStraight(diceValues) {
//   const uniqueValues = [...new Set(diceValues)];
//   const straights = [
//     [1, 2, 3, 4],
//     [2, 3, 4, 5],
//     [3, 4, 5, 6],
//   ];
//   for (let straight of straights) {
//     if (straight.every((val) => uniqueValues.includes(val))) {
//       return 30;
//     }
//   }
//   return 0;
// }

// function calculateLargeStraight(diceValues) {
//   const uniqueValues = [...new Set(diceValues)];
//   if (
//     uniqueValues.length === 5 &&
//     ((uniqueValues[0] === 1 && uniqueValues[4] === 5) ||
//       (uniqueValues[0] === 2 && uniqueValues[4] === 6))
//   ) {
//     return 40;
//   }
//   return 0;
// }

// function calculateChance(diceValues) {
//   return diceValues.reduce((acc, curr) => acc + curr, 0);
// }

// function calculateYatzy(diceValues) {
//   if (diceValues.every((val) => val === diceValues[0])) {
//     return 50;
//   }
//   return 0;
// }


// Ensure that diceValues is always an array
function ensureArray(diceValues) {
  return Array.isArray(diceValues) ? diceValues : (diceValues ? [diceValues] : []);
}

function calculateOnesScore(diceValues) {
  diceValues = ensureArray(diceValues);
  return diceValues.filter(val => val === 1).length * 1;
}

function calculateTwosScore(diceValues) {
  diceValues = ensureArray(diceValues);
  return diceValues.filter(val => val === 2).length * 2;
}

function calculateThreesScore(diceValues) {
  diceValues = ensureArray(diceValues);
  return diceValues.filter(val => val === 3).length * 3;
}

function calculateFoursScore(diceValues) {
  diceValues = ensureArray(diceValues);
  return diceValues.filter(val => val === 4).length * 4;
}

function calculateFivesScore(diceValues) {
  diceValues = ensureArray(diceValues);
  return diceValues.filter(val => val === 5).length * 5;
}

function calculateSixesScore(diceValues) {
  diceValues = ensureArray(diceValues);
  return diceValues.filter(val => val === 6).length * 6;
}

function calculateThreeOfAKind(diceValues) {
  diceValues = ensureArray(diceValues);
  const counts = new Array(7).fill(0);
  diceValues.forEach(val => counts[val]++);
  return counts.some(count => count >= 3) ? diceValues.reduce((acc, val) => acc + val, 0) : 0;
}

function calculateFourOfAKind(diceValues) {
  diceValues = ensureArray(diceValues);
  const counts = new Array(7).fill(0);
  diceValues.forEach(val => counts[val]++);
  return counts.some(count => count >= 4) ? diceValues.reduce((acc, val) => acc + val, 0) : 0;
}

function calculateFullHouse(diceValues) {
  diceValues = ensureArray(diceValues);
  const counts = new Array(7).fill(0);
  diceValues.forEach(val => counts[val]++);
  const hasThreeOfAKind = counts.some(count => count === 3);
  const hasPair = counts.some(count => count === 2);
  return hasThreeOfAKind && hasPair ? 25 : 0;
}

function calculateSmallStraight(diceValues) {
  diceValues = ensureArray(diceValues);
  const uniqueValues = [...new Set(diceValues)];
  const straights = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6]
  ];
  return straights.some(straight => straight.every(num => uniqueValues.includes(num))) ? 30 : 0;
}

function calculateLargeStraight(diceValues) {
  diceValues = ensureArray(diceValues);
  const uniqueValues = [...new Set(diceValues)];
  const straights = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6]
  ];
  return straights.some(straight => straight.every(num => uniqueValues.includes(num))) ? 40 : 0;
}

function calculateChance(diceValues) {
  diceValues = ensureArray(diceValues);
  return diceValues.reduce((acc, val) => acc + val, 0);
}

function calculateYatzy(diceValues) {
  diceValues = ensureArray(diceValues);
  const counts = new Array(7).fill(0);
  diceValues.forEach(val => counts[val]++);
  return counts.includes(5) ? 50 : 0;
}


function calculateUpperSum(playerNumber) {
  const upperScoreIds = ["ones", "twos", "threes", "fours", "fives", "sixes"];
  let upperSum = 0;

  upperScoreIds.forEach((scoreId) => {
    const scoreElement = document.getElementById(`${playerNumber}${scoreId}`);
    if (scoreElement && scoreElement.getAttribute("data-locked") === "true") {
      upperSum += parseFloat(scoreElement.textContent) || 0;
    }
  });

  const bonusThreshold = 63;
  const bonus = upperSum >= bonusThreshold ? 35 : 0;

  return upperSum + bonus;
}

function calculateTotal(playerNumber) {
  const scoreIds = [
    "ones",
    "twos",
    "threes",
    "fours",
    "fives",
    "sixes",
    "threeKind",
    "fourKind",
    "fullHouse",
    "smallStraight",
    "largeStraight",
    "chance",
    "yatzy",
  ];

  let totalScore = calculateUpperSum(playerNumber); 
  scoreIds.slice(6).forEach((scoreId) => {
    const scoreElement = document.getElementById(`${playerNumber}${scoreId}`);
    if (scoreElement && scoreElement.getAttribute("data-locked") === "true") {
      totalScore += parseFloat(scoreElement.textContent) || 0;
    }
  });

  return totalScore;
}

module.exports = {
  calculateOnesScore,
  calculateTwosScore,
  calculateThreesScore,
  calculateFoursScore,
  calculateFivesScore,
  calculateSixesScore,
  calculateThreeOfAKind,
  calculateFourOfAKind,
  calculateFourOfAKind,
  calculateFullHouse,
  calculateSmallStraight,
  calculateLargeStraight,
  calculateChance,
  calculateYatzy,
  calculateTotal
};