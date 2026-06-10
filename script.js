// UI: game board
// gameboard needs to be stored inside array
const gameBoard = (() => {
  const board = document.querySelector(".board");
  for (let i = 0; i < 9; i++) {
    const squares = document.createElement("div");
    squares.classList.add("square");
    board.appendChild(squares);
    console.log(board);
  }
})();
