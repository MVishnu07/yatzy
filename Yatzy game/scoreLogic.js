function calculateOnesScore(diceValues) {
    return diceValues.filter(val => val === 1).length * 1;
}


function calculateTwosScore(diceValues) {
    return diceValues.filter(val => val === 2).length * 2;
}

function calculateThreesScore(diceValues) {
    return diceValues.filter(val => val === 3).length * 3;
}

function calculateFoursScore(diceValues) {
    return diceValues.filter(val => val === 4).length * 4;
}

function calculateFivesScore(diceValues) {
    return diceValues.filter(val => val === 5).length * 5;
}

function calculateSixesScore(diceValues) {
    return diceValues.filter(val => val === 6).length * 6;
}

function calculateThreeOfAKind(diceValues) {
    const counts = Array(7).fill(0);
    diceValues.forEach(val => counts[val]++);
    for (let i = 1; i <= 6; i++) {
        if (counts[i] >= 3) {
            return i * 3;
        }
    }
    return 0;
}

function calculateFourOfAKind(diceValues) {
    const counts = Array(7).fill(0);
    diceValues.forEach(val => counts[val]++);
    for (let i = 1; i <= 6; i++) {
        if (counts[i] >= 4) {
            return i * 4;
        }
    }
    return 0;
}

function calculateFullHouse(diceValues) {
    const counts = Array(7).fill(0);
    diceValues.forEach(val => counts[val]++);
    let hasThree = counts.some(val => val === 3);
    let hasTwo = counts.some(val => val === 2);
    return hasThree && hasTwo ? 25 : 0; 
}

function calculateSmallStraight(diceValues) {
    const uniqueValues = [...new Set(diceValues)];
    const straights = [[1,2,3,4], [2,3,4,5], [3,4,5,6]];
    for (let straight of straights) {
        if (straight.every(val => uniqueValues.includes(val))) {
            return 30; 
        }
    }
    return 0;
}

function calculateLargeStraight(diceValues) {
    const uniqueValues = [...new Set(diceValues)];
    if (
        (uniqueValues.length === 5) &&
        (uniqueValues[0] === 1 && uniqueValues[4] === 5 || uniqueValues[0] === 2 && uniqueValues[4] === 6)
    ) {
        return 40; 
    }
    return 0;
}

function calculateChance(diceValues) {
    return diceValues.reduce((acc, curr) => acc + curr, 0);
}

function calculateYatzy(diceValues) {
    if (diceValues.every(val => val === diceValues[0])) {
        return 50; 
    }
    return 0;
}
function calculateUpperSum() {
    const onesScore = parseFloat(document.getElementById('ones').textContent);
    const twosScore = parseFloat(document.getElementById('twos').textContent);
    const threesScore = parseFloat(document.getElementById('threes').textContent);
    const foursScore = parseFloat(document.getElementById('fours').textContent);
    const fivesScore = parseFloat(document.getElementById('fives').textContent);
    const sixesScore = parseFloat(document.getElementById('sixes').textContent);

    return onesScore + twosScore + threesScore + foursScore + fivesScore + sixesScore;
}

function calculateTotal() { 
    const threeKindScore = parseFloat(document.getElementById('threeKind').textContent);
    const fourKindScore = parseFloat(document.getElementById('fourKind').textContent);
    const fullHouseScore = parseFloat(document.getElementById('fullHouse').textContent);
    const smallStraightScore = parseFloat(document.getElementById('smallStraight').textContent);
    const largeStraightScore = parseFloat(document.getElementById('largeStraight').textContent);
    const chanceScore = parseFloat(document.getElementById('chance').textContent);
    const yatzyScore = parseFloat(document.getElementById('yatzy').textContent);

    return calculateUpperSum() + threeKindScore + fourKindScore + fullHouseScore + smallStraightScore + largeStraightScore + chanceScore + yatzyScore;
}
