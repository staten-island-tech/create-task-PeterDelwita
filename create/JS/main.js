// Plan:
// Roll three six-sides dice where you have to bet above, equal to, or below a number to win.
// How to go about it: To bet, make a form-like table and allow users to input information. The game starts once the form is submitted and once the game finishes, it will show the dice numbers and the total and if the player won or lost.
// Bettinghistory function: clear card container, use filter to select certain cards by number, win/loss, and type of bet (maybe use a function), use forEach to add cards to the screen (bets are stored as objects)

const DOMSelectors = {
  diceContainer: document.querySelector(".dice-container"),
  thresholdButton: document.querySelector(".threshold-options"),
  threshold: document.querySelector("#threshold"),
  form: document.querySelector("form"),
  historyContainer: document.querySelector(".history-container"),
  btn: document.querySelectorAll(".btn"),
  aboveButton: document.querySelector("#above"),
  belowButton: document.querySelector("#below"),
  exactButton: document.querySelector("#exact"),
  submitButton: document.querySelector("#dice-roll"),
};

const bettingHistory = [];

function filterAbove() {
  DOMSelectors.thresholdButton.innerHTML = "Above";
}

DOMSelectors.aboveButton.addEventListener("click", function () {
  filterAbove();
});

function filterBelow() {
  DOMSelectors.thresholdButton.innerHTML = "Below";
}

DOMSelectors.belowButton.addEventListener("click", function () {
  filterBelow();
});

function filterExact() {
  DOMSelectors.thresholdButton.innerHTML = "Exact";
}

DOMSelectors.exactButton.addEventListener("click", function () {
  filterExact();
});

function rollDice() {
  if (DOMSelectors.threshold.value > 18 || DOMSelectors.threshold.value < 0) {
    DOMSelectors.diceContainer.innerHTML = `<h2 class="placeholder text-green-500 text-[40px]">Please bet a reasonable number.</h2>`;
  } else if (
    DOMSelectors.thresholdButton.innerHTML != "Above" &&
    DOMSelectors.thresholdButton.innerHTML != "Below" &&
    DOMSelectors.thresholdButton.innerHTML != "Exact"
  ) {
    DOMSelectors.diceContainer.innerHTML = `<h2 class="placeholder text-green-500 text-[40px]">Select bet type.</h2>`;
  } else if (
    (DOMSelectors.threshold.value === "18" &&
      DOMSelectors.thresholdButton.innerHTML === "Above") ||
    (DOMSelectors.threshold.value === "0" &&
      DOMSelectors.thresholdButton.innerHTML === "Below")
  ) {
    DOMSelectors.diceContainer.innerHTML = `<h2 class="placeholder text-green-500 text-[40px]">Bet is unwinnable.</h2>`;
  } else if (DOMSelectors.threshold.value === "") {
    DOMSelectors.diceContainer.innerHTML = `<h2 class="placeholder text-green-500 text-[40px]">Please type a number.</h2>`;
  } else {
    DOMSelectors.diceContainer.innerHTML = "";
    let total = 0;
    for (let i = 0; i <= 2; i++) {
      let rolledNumber = Math.floor(Math.random() * 7);
      total = total += rolledNumber;
      const dieHTML = `<div
        class="die h-80 w-[22%] bg-black border-2 border-solid border-green-500 rounded-2xl ml-3 mr-3 flex justify-center items-center"
      >
        <h2 class="text-green-500 text-[150px]">${rolledNumber}</h2>
      </div>`;
      DOMSelectors.diceContainer.insertAdjacentHTML("beforeend", dieHTML);
    }
    DOMSelectors.diceContainer.insertAdjacentHTML(
      "beforeend",
      `<div
        class="h-20 w-full bg-black flex justify-center items-center"
      >
      <h2 class="text-green-500 text-[25px]">Total: ${total}</h2>
      </div>`
    );

    console.log(total);
    let outcome = "loss";
    if (
      (total > parseInt(DOMSelectors.threshold.value) &&
        DOMSelectors.thresholdButton.innerHTML === "Above") ||
      (total === parseInt(DOMSelectors.threshold.value) &&
        DOMSelectors.thresholdButton.innerHTML === "Exact") ||
      (total < parseInt(DOMSelectors.threshold.value) &&
        DOMSelectors.thresholdButton.innerHTML === "Below")
    ) {
      console.log("you win");
      outcome = "win";
    } else {
      console.log("you lose");
      outcome = "loss";
    }
    const bet = {
      bettedNumber: DOMSelectors.threshold.value,
      betType: DOMSelectors.thresholdButton.innerHTML.trim(),
      betTotal: total,
      betOutcome: outcome,
    };
    bettingHistory.push(bet);
    console.log(bet);
  }
}

function loadHistory() {
  DOMSelectors.historyContainer.innerHTML = "";
  bettingHistory.forEach((bet) => {
    const cardHTML = `<div
        class="card h-80 w-[22%] bg-black border-2 border-solid border-green-500 rounded-2xl m-2 flex justify-center items-center" id="die-1"
      >
        <h2 class="text-green-500 text-[30px]">Number Betted: ${bet.bettedNumber}</h2>
        <h2 class="text-green-500 text-[30px]">Type of Bet: ${bet.betType}</h2>
        <h2 class="text-green-500 text-[30px]">Total: ${bet.betTotal}</h2>
        <h2 class="text-green-500 text-[30px]">Outcome: ${bet.betOutcome}</h2>
      </div>`;
    DOMSelectors.historyContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}

DOMSelectors.submitButton.addEventListener("click", function () {
  rollDice(), loadHistory();
});

// // "abcfed" "cabdfed"
// // Put them in order and compare line by line.
// function findDiff(x, y) {
//   let sortX = [...x].sort(); // Iterates through the string and adds each letter to an array. Added to JS in 2015
//   let sortY = [...y].sort();

//   for(let i = 0; i < sortX.length; i++){ // Selection inside iteration is a good idea
//     if(sortX[i] != sortY[i]) {
//       return sortX[i];
//     }
//   }
//   // SortX = Array.from(x).sort()
// }
