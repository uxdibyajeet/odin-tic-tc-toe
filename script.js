// store the gameboard as an array inside of a Gameboard object
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();

// gameController
const gameController = (() => {
  const board = gameBoard.board;
  let gameActive = true;

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
    let roundWon = false;
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
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      console.log(`${getCurrentPlayer().playerName} Won!`);
      gameActive = false;
    }
  };

  return { makeMove };
})();
