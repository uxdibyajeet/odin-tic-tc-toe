//game func
const game = (() => {
  // store the gameboard as an array inside of a Gameboard object
  const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    //return
    return { board };
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

  let currentPlayer = players.xPlayer;

  const getCurrentPlayer = () => currentPlayer;

  // swap turn of players
  const swapTurn = () => {
    const firstPlayer = players.xPlayer;
    const secondPlayer = players.oPlayer;

    currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;

    return currentPlayer;
  };

  // System Update Status: tell users turn
  const giveUpdates = () => {
    const message = `${currentPlayer.playerName}'s turn, marker: ${currentPlayer.playerMarker}`;
    return message;
  };

  return { gameBoard, swapTurn, giveUpdates, getCurrentPlayer };
})();

// gameUi
const gameUI = (() => {
  const board = game.gameBoard.board; // gameboard array

  //dom selectors
  const main = document.querySelector("#main");
  const updateMessage = document.createElement("p");
  const updateMessageBox = document.createElement("div");
  const boardContainer = document.createElement("div");
  boardContainer.setAttribute("class", "board-container");
  updateMessageBox.setAttribute("class", "message-box");
  main.appendChild(boardContainer);
  main.appendChild(updateMessageBox);
  updateMessageBox.appendChild(updateMessage);

  // updates
  // bug: at the start of the game first player is not set
  const text = game.giveUpdates();
  updateMessage.textContent = text;

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

    if (!cellClicked.classList.contains("cell")) return;

    const getCellIndex = cellClicked.getAttribute("index-of-cell");

    // updates the board
    if (board.at(getCellIndex) !== "") {
      return;
    }

    const activePlayer = game.getCurrentPlayer();

    board[getCellIndex] = activePlayer.playerMarker;
    cellClicked.textContent = board.at(getCellIndex);
    cellClicked.setAttribute("class", "not-clickable");
    updateMessage.textContent = game.giveUpdates();
    game.swapTurn();
    updateMessage.textContent = game.giveUpdates();
  });
})();
