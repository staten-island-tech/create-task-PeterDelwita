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

function rollDice(betNumber) {
  if (betNumber > 18 || betNumber < 0) {
    DOMSelectors.diceContainer.innerHTML = `<h2 class="placeholder text-green-500 text-[40px]">Please bet a reasonable number.</h2>`;
  } else if (
    DOMSelectors.thresholdButton.innerHTML != "Above" &&
    DOMSelectors.thresholdButton.innerHTML != "Below" &&
    DOMSelectors.thresholdButton.innerHTML != "Exact"
  ) {
    DOMSelectors.diceContainer.innerHTML = `<h2 class="placeholder text-green-500 text-[40px]">Select bet type.</h2>`;
  } else if (
    (betNumber === "18" &&
      DOMSelectors.thresholdButton.innerHTML === "Above") ||
    (betNumber === "0" && DOMSelectors.thresholdButton.innerHTML === "Below")
  ) {
    DOMSelectors.diceContainer.innerHTML = `<h2 class="placeholder text-green-500 text-[40px]">Bet is unwinnable.</h2>`;
  } else if (betNumber === "") {
    DOMSelectors.diceContainer.innerHTML = `<h2 class="placeholder text-green-500 text-[40px]">Please type a number.</h2>`;
  } else {
    DOMSelectors.diceContainer.innerHTML = "";
    let total = 0;
    for (let i = 0; i <= 2; i++) {
      let rolledNumber = Math.floor(Math.random() * 7);
      total = total += rolledNumber;
      const dieHTML = `<div
        class="die h-80 w-[22%] bg-black hover:bg-gray-900 border-2 border-solid border-green-500 rounded-2xl ml-3 mr-3 flex justify-center items-center"
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
      (total > parseInt(betNumber) &&
        DOMSelectors.thresholdButton.innerHTML === "Above") ||
      (total === parseInt(betNumber) &&
        DOMSelectors.thresholdButton.innerHTML === "Exact") ||
      (total < parseInt(betNumber) &&
        DOMSelectors.thresholdButton.innerHTML === "Below")
    ) {
      console.log("you win");
      outcome = "win";
    } else {
      console.log("you lose");
      outcome = "loss";
    }
    const bet = {
      bettedNumber: betNumber,
      betType: DOMSelectors.thresholdButton.innerHTML.trim(),
      betTotal: total,
      betOutcome: outcome,
    };
    bettingHistory.push(bet);
    console.log(bet);
  }
}

const bettingHistory = [];

function loadHistory() {
  DOMSelectors.historyContainer.innerHTML = "";
  bettingHistory.forEach((bet) => {
    const cardHTML = `<div
        class="card h-80 w-[22%] bg-black hover:bg-gray-900 border-2 border-solid border-green-500 rounded-2xl m-2 flex justify-center items-center"
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
  rollDice(DOMSelectors.threshold.value), loadHistory();
});
