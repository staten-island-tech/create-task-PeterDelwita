// Plan:
// Roll three six-sides dice where you have to bet above, equal to, or below a number to win.
// How to go about it: To bet, make a form-like table and allow users to input information. The game starts once the form is submitted and once the game finishes, it will show the dice numbers and the total and if the player won or lost.
// Bettinghistory function: clear card container, use filter to select certain cards by by number, win/loss, and type of bet (maybe use a function), use forEach to add cards to the screen (bets are stored as objects)

const DOMSelectors = {
  diceContainer: document.querySelector(".dice-container"),
  thresholdButton: document.querySelector(".threshold-options"),
  threshold: document.querySelector("#threshold"),
  firstDie: document.querySelector("#die-1"),
  secondDie: document.querySelector("#die-2"),
  thirdDie: document.querySelector("#die-3"),
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
    DOMSelectors.threshold.value > 18 &&
    DOMSelectors.thresholdButton.innerHTML.valueOf === "Above"
  ) {
    DOMSelectors.diceContainer.innerHTML = `<h2 class="placeholder text-green-500 text-[40px]">Bet is unwinnable.</h2>`;
    return false;
  } else {
    DOMSelectors.diceContainer.innerHTML = "";
    for (let i = 0; i <= 2; i++) {
      let rolledNumber = Math.floor(Math.random() * 6);
      const dieHTML = `<div
        class="die h-80 w-[22%] bg-black border-2 border-solid border-green-500 rounded-2xl ml-3 mr-3 flex justify-center items-center"
      >
        <h2 class="text-green-500 text-[150px]">${rolledNumber}</h2>
      </div>`;
      DOMSelectors.diceContainer.insertAdjacentHTML("beforeend", dieHTML);
    }
  }
}

DOMSelectors.submitButton.addEventListener("click", function () {
  rollDice();
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
