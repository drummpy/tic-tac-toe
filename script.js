function Gameboard() {
  //Create Game Board
  const board = [];

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(Cell());
    }
  }

  //Returns the board
  const getBoard = () => board;

  const placeMove = (row, column, player) => {
    //Check to see if cell is empty, if not return
    if (board[row][column] !== 0) {
      return;
    }

    //If cell is valid, add token
    board[row][column].addToken(player);
  };

  //Prints board into console, joining each value with a |
  const printBoard = () => {
    board.forEach((row) =>
      console.log(row.map((cell) => cell.getValue()).join(" | "))
    );
  };

  return { getBoard, placeMove, printBoard };
}

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}
