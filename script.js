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
      console.log(`Position occupied! ${currentPlayer.playerName}'s turn..`);
      return;
    }
    // Place mark for current player
    gameBoard.placeMark(position, currentPlayer.playerMark);
    const currentBoard = gameBoard.getBoard();

    // Check game state
    const winnerSymbol = winDetection(currentBoard);
    if (winnerSymbol) {
      console.log(`Game Over! player: ${currentPlayer.playerName} Wins!`);
      return;
    }

    if (drawDetection()) {
      console.log("Game Over! Its a draw!");
      return;
    }
    turnManager();
    playerIndicator();
  };

  const winDetection = (board) => {
    if (!board) return null;
    const winCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of winCombo) {
      const [a, b, c] = line;
      // console.log(line, board[c]);
      // console.log(board[a] && board[a] === board[b] && board[a] === board[c]);
      if (
        board[a] &&
        board[a] !== "empty" &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    return null;
  };

  const drawDetection = () => {
    const currentBoard = gameBoard.getBoard();
    if (winDetection(currentBoard)) return false;
    return currentBoard.every((tile) => tile !== "empty");
  };

  return { makeMove, playerIndicator, winDetection, drawDetection };
})();

gameBoard.createBoard();
gameController.playerIndicator();
