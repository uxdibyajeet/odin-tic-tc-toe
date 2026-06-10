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
  let currentPlayer;
  //Write code for turn
  const playerTurn = () => {
    // this function should return either playerX or playerO
    currentPlayer = playerX; //first player
    return currentPlayer;
  };
  const makeMove = (position) => {
    // code to place mark via gameBoard.placeMark()
    // position can be derived via eventlistner
    gameBoard.placeMark(position, currentPlayer.playerMark);
  };
  // player will populate gameBoard.getBoard() with their mark;
  return { playerTurn, makeMove };
})();

gameBoard.createBoard();
gameController.playerTurn();
console.log(gameController.playerTurn());
console.log(gameController.makeMove(9));
