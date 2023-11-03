const rollButton = document.getElementById('roll-button');
let rollsLeft = 3;

rollButton.addEventListener('click', () => {
    if (rollsLeft > 0) {
        const diceValues = rollDice();
        rollsLeft--;
        document.getElementById('rollsLeft').textContent = rollsLeft;
        updateScores(diceValues);
    }
});


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

        checkAllScoresLocked();
    }
}

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