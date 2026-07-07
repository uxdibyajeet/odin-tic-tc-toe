// store the gameboard as an array inside of a Gameboard object
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { board, resetBoard };
})();

// gameController: Game logic layer
const gameController = (() => {
  const board = gameBoard.board;
  let gameActive = true;
  let winnerName = null;
  let currentPlayer = null;

  //game status
  const gameActiveStatus = () => gameActive;
  const getWinnerName = () => winnerName;

  // create players
  const createPlayers = (name, marker) => {
    const playerName = name;
    const playerMarker = marker;
    return { playerName, playerMarker };
  };

  //players; to-do get player name from  user input
  const players = {
    xPlayer: null,
    oPlayer: null,
  };

  // initialize player
  const initPlayer = (nameX, nameO) => {
    players.xPlayer = createPlayers(nameX || "Xavier", "X");
    players.oPlayer = createPlayers(nameO || "Olivia", "O");
    currentPlayer = players.xPlayer;
  };

  const getCurrentPlayer = () => currentPlayer;

  // swap turn of players
  const swapTurn = () => {
    const firstPlayer = players.xPlayer;
    const secondPlayer = players.oPlayer;

    currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;

    return currentPlayer;
  };

  // make move
  const makeMove = (index) => {
    if (isValidMove(index) === true && gameActive === true) {
      board[index] = currentPlayer.playerMarker;
      checkWinner();
      swapTurn();
    } else null;

    return board;
  };

  // validate turn
  const isValidMove = (index) => {
    if (board[index] !== "") {
      console.log("invalid Move");
      return false;
    }
    return true;
  };

  // check winning
  const checkWinner = () => {
    let gameWon = false;
    const winCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winCondition.length; i++) {
      const condition = winCondition[i];
      const a = board[condition[0]];
      const b = board[condition[1]];
      const c = board[condition[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        gameWon = true;
        break;
      }
    }

    if (gameWon) {
      console.log(`${getCurrentPlayer().playerName} Won!`);
      winnerName = currentPlayer.playerName;
      gameActive = false;
    } else if (!board.includes("")) {
      console.log("draw!");
      gameActive = false;
    }
  };

  // reset Game
  const resetGame = () => {
    gameBoard.resetBoard();
    gameActive = true;
    winnerName = null;
    currentPlayer = players.xPlayer;
  };

  return {
    initPlayer,
    makeMove,
    getCurrentPlayer,
    gameActiveStatus,
    getWinnerName,
    resetGame,
  };
})();

// User Interface
const UserInterface = (() => {
  const board = gameBoard.board;

  //dom
  const main = document.querySelector("#main");
  const popOver = document.querySelector(".game-over");
  const startScreen = document.querySelector("#startScreen");
  const inputX = document.querySelector("#firstPlayer input");
  const inputO = document.querySelector("#secondPlayer input");
  const playBtn = document.querySelector("#playGame");
  const restartBtn = document.querySelector("#restart");
  const gameContainer = document.createElement("div");
  const boardContainer = document.createElement("div");
  const messageContainer = document.createElement("div");
  boardContainer.setAttribute("class", "board-container");
  gameContainer.setAttribute("class", "game-container");
  messageContainer.setAttribute("class", "message-box");
  gameContainer.appendChild(boardContainer);
  gameContainer.appendChild(messageContainer);

  // handle ui click
  const cellClick = (event) => {
    const currentCell = event.target;
    if (!currentCell.classList.contains("cell")) {
      null;
    }
    const currentCellIndex = parseInt(
      currentCell.getAttribute("index-of-cell"),
    );
    gameController.makeMove(currentCellIndex);
    gameCellsUi();
    systemUpdate();
    gameOverUi();
  };

  // handle restart button
  const restartFunc = () => {
    gameController.resetGame();
    popOver.classList.add("hidden");
    gameCellsUi();
    systemUpdate();
  };

  // generate gameBoard
  const gameCellsUi = () => {
    //clear boardContainer
    boardContainer.innerHTML = "";

    //looping to create 9 cells
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      cell.setAttribute("index-of-cell", [i]);
      boardContainer.appendChild(cell);
      cell.textContent = board[i];
    }
  };

  // generate system update message
  const systemUpdate = () => {
    messageContainer.innerHTML = "";
    //dom
    const text = document.createElement("p");
    text.setAttribute("class", "message");
    messageContainer.appendChild(text);

    //message displayed
    text.textContent = `${gameController.getCurrentPlayer().playerName}'s turn, Marker: ${gameController.getCurrentPlayer().playerMarker}`;
  };

  // game over ui
  const gameOverUi = () => {
    const isActive = gameController.gameActiveStatus();

    const gameOverMessage = document.querySelector("#game-over-msg");
    const winner = gameController.getWinnerName();
    if (!isActive) {
      popOver.classList.remove("hidden");
      if (winner) {
        gameOverMessage.textContent = `🎉 Game Over! ${winner} Wins!`;
      } else {
        gameOverMessage.textContent = "🤝 It's a Draw!";
      }
    }
  };

  // Start game ui
  const startGameUi = () => {
    const nameX = inputX.value.trim();
    const nameO = inputO.value.trim();

    gameController.initPlayer(nameX, nameO);

    startScreen.classList.add("hidden");
    main.appendChild(gameContainer);

    gameCellsUi();
    systemUpdate();
  };

  const play = () => {
    startScreen.classList.add("hidden");
    console.log(startScreen);
  };

  //Event Listners
  boardContainer.addEventListener("click", cellClick);
  restartBtn.addEventListener("click", restartFunc);
  playBtn.addEventListener("click", startGameUi);
})();
