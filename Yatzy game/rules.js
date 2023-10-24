const rollButton = document.getElementById('roll-button');
const dice = [
    document.getElementById('die1'),
    document.getElementById('die2'),
    document.getElementById('die3'),
    document.getElementById('die4'),
    document.getElementById('die5'),
];

let rollsLeft = 3;
const selectedDice = [];
var value;
var total;
const values = []; 
let onesScore = 0;

rollButton.addEventListener('click', () => {
    if (rollsLeft > 0) {
        rollDice();
        total = 0;
        rollsLeft--;
        document.getElementById('rollsLeft').textContent = rollsLeft;
        onesScore = 0;
    }
});

function rollDice() {
    for (const die of dice) {
        if (!die.classList.contains('selected')) {
            startAnimation(die);
        }
    }

    setTimeout(() => {
        for (const die of dice) {
            if (!die.classList.contains('selected')) {
                value = stopAnimation(die);
                values.push(value);
                console.log("value check: "+value);
            

                if (selectedDice.indexOf(die) === -1) {
                    selectedDice.push(die);
                }
            }
            total = total + value;
            document.getElementById('total').textContent = total;
            calculateOnesScore(values);

        }
    }, 1000);

}

function startAnimation(die) {
    die.style.animation = 'roll 1s steps(6) 3';
}

function stopAnimation(die) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    die.style.animation = 'none';
    die.style.backgroundPosition = -100 * (randomNumber - 1) + '% 0';
    return randomNumber;
}

function selectDie(index) {
    const die = dice[index];
    // When you use die.classList.toggle('selected'), it checks if the CSS class named "selected" is 
    // already added to the HTML element if not added and already exists, then it removes it..
    // If "selected" is not already added, it will add it.
    // If "selected" is already added, it will remove it.
    die.classList.toggle('selected');
    if(!die.classList.contains('selected')){
    die.style.backgroundColor = "#005000";
    } else {
        die.style.backgroundColor = "yellow";
    }
}

function calculateOnesScore(diceValues) {
    let one = 0;

    for (const value1 of diceValues) {
        console.log("Ones Check: " + value1);

        if (value1 === 1) {
            one += 1;
        }
    }

    onesScore =1 * one;
    console.log("Score check: "+onesScore);
    document.getElementById('ones').textContent = onesScore;
}
