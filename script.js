// game board
// draws the UI of game board
const gameBoard = (() => {
  const boardDiv = document.querySelector(".board");
  let boardData = [];
  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      const squaresDiv = document.createElement("div");
      squaresDiv.classList.add("square");
      boardDiv.appendChild(squaresDiv);
      boardData.push("empty");
    }
  };
  const getBoard = () => {
    return boardData;
  };
  const placeMark = (position, mark) => {
    // this function places player mark in desired position
    boardData[position] = mark;
    return boardData;
  };

  return { getBoard, createBoard, placeMark };
})();

// player manager
// just create player objects
const createPlayer = (name, mark) => {
  const playerName = name;
  const playerMark = mark;
  return { playerName, playerMark };
};

// game controller
// traditionally player X goes first;
const gameController = (() => {
  const playerX = createPlayer("Ajay", "X"); //prompt("Choose player name for X")
  const playerO = createPlayer("Vijay", "O");
  let currentPlayer = playerX;

  const playerIndicator = () => {
    currentPlayer === playerX
      ? console.log(`${playerX.playerName}'s turn..`)
      : console.log(`${playerO.playerName}'s turn..`);
  };

  const turnManager = () => {
    // this function should return either playerX or playerO
    // first player should always be X
    currentPlayer === playerX
      ? (currentPlayer = playerO)
      : (currentPlayer = playerX);
    return currentPlayer;
  };

  const makeMove = (position) => {
    // move validation
    if (gameBoard.getBoard()[position] !== "empty") {
      console.log(`${currentPlayer.playerName}'s turn..`);
    } else {
      // runs when move is valid
      gameBoard.placeMark(position, currentPlayer.playerMark);
      turnManager();
      playerIndicator();
    }
  };

  return { makeMove, playerIndicator };
})();

gameBoard.createBoard();
gameController.playerIndicator();
