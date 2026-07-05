// generates UI
function generateUI() {
  const main = document.querySelector("#main");
  main.innerHTML = "";
  const cellContainer = document.createElement("div");
  cellContainer.setAttribute("class", "cell-container");
  main.appendChild(cellContainer);

  //generates cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("index", [i]);
    cellContainer.appendChild(cell);
  }

  // system update status
  const updateStatus = document.createElement("p");
  updateStatus.innerText = "system update status";
  main.appendChild(updateStatus);

  // restart Game
  const btn = document.createElement("button");
  btn.setAttribute("class", "cta");
  btn.textContent = "Restart";
  main.appendChild(btn);

  // event listner
  cellContainer.addEventListener("click", handleClick);
  btn.addEventListener("click", restartGame);
}

// manage turns
function handleClick(cell) {
  const target = cell.target; //.getAttribute("index")
  swapPlayer();
  target.textContent = currPlayer.marker;
}

// restart game
function restartGame() {
  generateUI();
}

// create player
function createPlayer(marker) {
  return { marker };
}

// players
const players = (() => {
  const firstPlayer = createPlayer("X");
  const secondPlayer = createPlayer("O");

  return { firstPlayer, secondPlayer };
})();

// swap players
let currPlayer = "";

function swapPlayer() {
  const firstPlayer = players.firstPlayer;
  const secondPlayer = players.secondPlayer;
  currPlayer = currPlayer === firstPlayer ? secondPlayer : firstPlayer;
  return currPlayer;
}

// initialize game
const initGame = (() => {
  generateUI();
})();
