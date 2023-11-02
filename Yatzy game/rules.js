const rollButton = document.getElementById('roll-button');
const dice = [
    document.getElementById('die1'),
    document.getElementById('die2'),
    document.getElementById('die3'),
    document.getElementById('die4'),
    document.getElementById('die5'),
];

let rollsLeft = 3;

rollButton.addEventListener('click', () => {
    if (rollsLeft > 0) {
        rollDice();
        rollsLeft--;
        document.getElementById('rollsLeft').textContent = rollsLeft;
    }
});

function rollDice() {
    const diceValues = [];
    for (const die of dice) {
        if (!die.classList.contains('selected')) {
            startAnimation(die);
            const value = stopAnimation(die);
            diceValues.push(value);
        } else {
            diceValues.push(Number(die.getAttribute('data-value')));
        }
    }
    updateScores(diceValues);
}

function startAnimation(die) {
    die.style.animation = 'roll 1s steps(6) 3';
}

function stopAnimation(die) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    die.style.animation = 'none';
    die.style.backgroundPosition = -100 * (randomNumber - 1) + '% 0';
    die.setAttribute('data-value', randomNumber);
    return randomNumber;
}

function selectDie(index) {
    const die = dice[index];
    die.classList.toggle('selected');
    if(!die.classList.contains('selected')){
        die.style.backgroundColor = "#146400";
    } else {
        die.style.backgroundColor = "yellow";

    }}

function updateScores(diceValues) {
    document.getElementById('total').textContent = diceValues.reduce((acc, val) => acc + val, 0);
    if (!document.getElementById('ones').getAttribute('data-locked')) {
        document.getElementById('ones').textContent = calculateOnesScore(diceValues);
    }    
    if (!document.getElementById('twos').getAttribute('data-locked')) {
        document.getElementById('twos').textContent = calculateTwosScore(diceValues);
    }
    if (!document.getElementById('threes').getAttribute('data-locked')) {
        document.getElementById('threes').textContent = calculateThreesScore(diceValues);
    }
    if (!document.getElementById('fours').getAttribute('data-locked')) {
        document.getElementById('fours').textContent = calculateFoursScore(diceValues);
    }
    if (!document.getElementById('fives').getAttribute('data-locked')) {
        document.getElementById('fives').textContent = calculateFivesScore(diceValues);
    }
    if (!document.getElementById('sixes').getAttribute('data-locked')) {
        document.getElementById('sixes').textContent = calculateSixesScore(diceValues);
    }
    if (!document.getElementById('threeKind').getAttribute('data-locked')) {
        document.getElementById('threeKind').textContent = calculateThreeOfAKind(diceValues);
    }
    if (!document.getElementById('fourKind').getAttribute('data-locked')) {
        document.getElementById('fourKind').textContent = calculateFourOfAKind(diceValues);
    }
    if (!document.getElementById('fullHouse').getAttribute('data-locked')) {
        document.getElementById('fullHouse').textContent = calculateFullHouse(diceValues);
    }
    if (!document.getElementById('smallStraight').getAttribute('data-locked')) {
        document.getElementById('smallStraight').textContent = calculateSmallStraight(diceValues);
    }
    if (!document.getElementById('largeStraight').getAttribute('data-locked')) {
        document.getElementById('largeStraight').textContent = calculateLargeStraight(diceValues);
    }
    if (!document.getElementById('chance').getAttribute('data-locked')) {
        document.getElementById('chance').textContent = calculateChance(diceValues);
    }
    if (!document.getElementById('yatzy').getAttribute('data-locked')) {
        document.getElementById('yatzy').textContent = calculateYatzy(diceValues);
    }
}


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
    return hasThree && hasTwo ? 25 : 0; // 25 points for full house in standard rules
}

function calculateSmallStraight(diceValues) {
    const uniqueValues = [...new Set(diceValues)];
    const straights = [[1,2,3,4], [2,3,4,5], [3,4,5,6]];
    for (let straight of straights) {
        if (straight.every(val => uniqueValues.includes(val))) {
            return 30; // 30 points for small straight in standard rules
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
        return 40; // 40 points for large straight in standard rules
    }
    return 0;
}

function calculateChance(diceValues) {
    return diceValues.reduce((acc, curr) => acc + curr, 0);
}

function calculateYatzy(diceValues) {
    if (diceValues.every(val => val === diceValues[0])) {
        return 50; // 50 points for Yatzy in standard rules
    }
    return 0;
}


// Add this function to your code
function checkAllScoresLocked() {
    const scoreIds = [
        'ones', 'twos', 'threes', 'fours', 'fives', 'sixes', 
        'threeKind', 'fourKind', 'fullHouse', 'smallStraight', 
        'largeStraight', 'chance', 'yatzy'
    ];

    // Check if all scores are locked
    const allLocked = scoreIds.every(id => document.getElementById(id).getAttribute('data-locked') === 'true');

    if (allLocked) {
        const total = calculateTotal();
        document.getElementById("sum").textContent = calculateUpperSum();
        document.getElementById("totalPoints").textContent = total;
        alert('Your total score is: ' + total);
    }
    
}

// Modify the lockScore function to call checkAllScoresLocked at the end
function lockScore(scoreId) {
    const scoreElement = document.getElementById(scoreId);

    if (scoreElement) {
        const scoreValueNumeric = parseFloat(scoreElement.textContent);
        console.log(scoreId + " Check: " + scoreValueNumeric);

        scoreElement.removeAttribute('onclick');
        scoreElement.style.backgroundColor = 'lightgray';
        scoreElement.style.cursor = 'default';
        scoreElement.setAttribute('data-locked', 'true');

        rollsLeft = 3;
        document.getElementById('rollsLeft').textContent = rollsLeft;
        document.getElementById('total').textContent = 0;  
        resetDice();

        // Check if all scores are locked and show total if they are
        checkAllScoresLocked();
    }
}



function resetDice() {
    for (const die of dice) {
        // Remove selected class and reset styles
        die.classList.remove('selected');
        die.style.backgroundColor = "#146400";
        
        // Reset to initial background position (assuming initial position is the first face of the dice)
        die.style.backgroundPosition = '0% 0';
    }
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
