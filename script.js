function Gameboard() {
  //Create Game Board
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  //Returns the board
  const getBoard = () => board;

  const placeMove = (row, column, player) => {
    //Check to see if cell is empty, if not return
    if (board[row][column] !== "") {
      return;
    }

    //If cell is valid, add token
    board[row][column].addToken(player);
  };

  //Prints board into console, joining each value with a |
  const printBoard = () => {
    board.forEach((row) => console.log(row.join(" | ")));
  };

  return { getBoard, placeMove, printBoard };
}
