let currentPlayer = ""; //need to tuck this inside. Currently in global scope

// store the gameboard as an array inside of a Gameboard object
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""]; //stores the board

  //dom selectors
  const main = document.querySelector("#main");
  const updateMessage = document.createElement("p");
  const boardContainer = document.createElement("div");
  boardContainer.setAttribute("class", "board-container");
  updateMessage.setAttribute("class", "message");
  main.appendChild(boardContainer);
  main.appendChild(updateMessage);

  // updates
  updateMessage.textContent = `${currentPlayer.playerName}'s turn`;

  // creates the UI of the board
  board.forEach((cell, index) => {
    const square = document.createElement("div");
    square.setAttribute("class", "cell");
    square.setAttribute("index-of-cell", [index]);
    boardContainer.appendChild(square);
  });

  //board eventlistner
  boardContainer.addEventListener("click", (e) => {
    // dom element of the board
    const cellClicked = e.target;
    const getCellIndex = cellClicked.getAttribute("index-of-cell");

    // updates the board
    if (board.at(getCellIndex) !== "") {
      cellClicked.setAttribute("class", "not-clickable");
      return;
    }

    const currentPlayerMarker = swapTurn().playerMarker;
    board.splice(getCellIndex, 1, currentPlayerMarker);
    cellClicked.textContent = board.at(getCellIndex);
    giveUpdates();
    console.log(board, currentPlayerMarker);
  });

  //return
  return { main };
})();

// create players
const createPlayers = (name, marker) => {
  const playerName = name;
  const playerMarker = marker;
  return { playerName, playerMarker };
};

//players; to-do get player name from  user input
const players = (() => {
  const xPlayer = createPlayers("Xavier", "X");
  const oPlayer = createPlayers("Oliver", "O");

  return { xPlayer, oPlayer };
})();

// swap turn of players
const swapTurn = () => {
  firstPlayer = players.xPlayer;
  seconndPlayer = players.oPlayer;
  // let currentPlayer = firstPlayer;
  currentPlayer = currentPlayer === firstPlayer ? seconndPlayer : firstPlayer;

  return currentPlayer;
};

// System Update Status: tell users turn
const giveUpdates = () => {};
