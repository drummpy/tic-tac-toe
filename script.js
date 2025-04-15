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
    if (board[row][column].getValue() !== 0) {
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

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    console.log(
      `Assigning ${getActivePlayer().name}'s token to ${row}, ${column}`
    );

    board.placeMove(row, column, getActivePlayer().token);

    switchPlayerTurn();
    printNewRound();
  };

  //Initial print out
  printNewRound();

  return { playRound, getActivePlayer };
}

const game = GameController();
