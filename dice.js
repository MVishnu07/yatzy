function updateDice(diceValues) {
  const diceElements = document.querySelectorAll(".die");
  diceElements.forEach((die, index) => {
    if (!die.classList.contains("selected")) {
      const diceValue = diceValues[index];

      die.setAttribute("data-value", diceValue);

      while (die.firstChild) {
        die.removeChild(die.firstChild);
      }

      const dots = createDots(diceValue);
      dots.forEach((dot) => die.appendChild(dot));
    }
  });
}

function createDots(diceValue) {
  const positions = [
    [{ top: 50, left: 50 }],
    [
      { top: 25, left: 25 },
      { bottom: 25, right: 25 },
    ],
    [
      { top: 25, left: 25 },
      { top: 50, left: 50 },
      { bottom: 25, right: 25 },
    ],
    [
      { top: 25, left: 25 },
      { top: 25, right: 25 },
      { bottom: 25, left: 25 },
      { bottom: 25, right: 25 },
    ],
    [
      { top: 25, left: 25 },
      { top: 25, right: 25 },
      { top: 50, left: 50 },
      { bottom: 25, left: 25 },
      { bottom: 25, right: 25 },
    ],
    [
      { top: 25, left: 25 },
      { top: 25, right: 25 },
      { top: 25, left: 46 },
      { bottom: 25, left: 25 },
      { bottom: 25, right: 25 },
      { bottom: 25, left: 46 },
    ],
  ];

  return positions[diceValue - 1].map((pos) => {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.style.position = "absolute";
    if (pos.top) dot.style.top = `${pos.top}%`;
    if (pos.bottom) dot.style.bottom = `${pos.bottom}%`;
    if (pos.left) dot.style.left = `${pos.left}%`;
    if (pos.right) dot.style.right = `${pos.right}%`;
    if (
      diceValue === 1 ||
      (diceValue === 3 && pos.top === 50) ||
      (diceValue === 5 && pos.top === 50) ||
      (diceValue === 6 && pos.left === 50)
    ) {
      dot.style.transform = "translate(-50%, -50%)";
    }
    return dot;
  });
}


function selectDie(index) {
  const die = document.querySelectorAll(".die")[index];

  die.classList.toggle("selected");
  die.style.backgroundColor = die.classList.contains("selected")
    ? "yellow"
    : "";
}

function resetDice() {
  const diceElements = document.querySelectorAll(".die");

  diceElements.forEach((die) => {
    die.classList.remove("selected");
    die.style.backgroundColor = "";

    while (die.firstChild) {
      die.removeChild(die.firstChild);
    }

    const dot = document.createElement("div");
    dot.className = "dot";
    dot.style.top = "50%";
    dot.style.left = "50%";
    dot.style.transform = "translate(-50%, -50%)";
    die.appendChild(dot);
    die.setAttribute("data-value", "1");
  });
}


