const dice = [
    document.getElementById('die1'),
    document.getElementById('die2'),
    document.getElementById('die3'),
    document.getElementById('die4'),
    document.getElementById('die5'),
];

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
    return diceValues; 
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
    }
}

function resetDice() {
    for (const die of dice) {
        die.classList.remove('selected');
        die.style.backgroundColor = "#146400";
        
        die.style.backgroundPosition = '0% 0';
    }
}
