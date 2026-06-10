// UI: game board
// const createBoard = (() => {
//   const board = document.querySelector(".board");
//   for (let i = 0; i < 9; i++) {
//     const squares = document.createElement("div");
//     squares.classList.add("square");
//     board.appendChild(squares);
//   }
// })();

const gameBoard = (() => {
  const boardDiv = document.querySelector(".board");
  let boardData = {};
  const createBoardObj = (() => {
    const squares = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
    squares.forEach((item) => {
      boardData[item] = "";
      const squaresDiv = document.createElement("div");
      squaresDiv.classList.add("square");
      boardDiv.appendChild(squaresDiv);
    });
  })();
  const getBoard = () => {
    return boardData;
  };

  return { getBoard };
})();

const createPlayer = () => {
  console.log("uwu");
};
