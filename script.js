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
      return false;
    }

    //If cell is valid, add token
    board[row][column].addToken(player);
    return true;
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
    if (!isGameOver) {
      console.log(`${getActivePlayer().name}'s turn.`);
    }
  };

  let isGameOver = false;

  const checkWinner = () => {
    const currentBoard = board.getBoard();

    //Check row
    for (let i = 0; i < 3; i++) {
      const firstValue = currentBoard[i][0].getValue();

      const isWinningRow = currentBoard[i].every(
        (cell) => cell.getValue() === firstValue && firstValue !== 0
      );
      if (isWinningRow) {
        console.log("Winner Found!");
        isGameOver = true;
        return;
      }
    }

    //Check column
    for (let i = 0; i < 3; i++) {
      const firstValue = currentBoard[0][i].getValue();

      if (
        firstValue !== 0 &&
        currentBoard[1][i].getValue() === firstValue &&
        currentBoard[2][i].getValue() === firstValue
      ) {
        console.log("Winner Found!");
        isGameOver = true;
        return;
      }
    }

    //Check diagonal top-left to bottom-right
    if (
      currentBoard[0][0].getValue() !== 0 &&
      currentBoard[0][0].getValue() === currentBoard[1][1].getValue() &&
      currentBoard[1][1].getValue() === currentBoard[2][2].getValue()
    ) {
      console.log("Winner Found!");
      isGameOver = true;
      return;
    }

    //Check diagonal top-right to bottom-left
    if (
      currentBoard[0][2].getValue() !== 0 &&
      currentBoard[0][2].getValue() === currentBoard[1][1].getValue() &&
      currentBoard[1][1].getValue() === currentBoard[2][0].getValue()
    ) {
      console.log("Winner Found!");
      isGameOver = true;
      return;
    }
  };

  const checkDraw = () => {
    const isDraw = board
      .getBoard()
      .every((row) => row.every((cell) => cell.getValue() !== 0));

    if (isDraw) {
      console.log("It's a draw!");
      isGameOver = true;
    }
  };

  const playRound = (row, column) => {
    if (isGameOver) {
      return;
    }

    console.log(
      `Assigning ${getActivePlayer().name}'s token to ${row}, ${column}`
    );

    const success = board.placeMove(row, column, getActivePlayer().token);

    if (!success) {
      console.log("That square is already taken.  Try again!");
      printNewRound();
      return;
    }

    checkWinner();
    checkDraw();
    if (!isGameOver) {
      switchPlayerTurn();
      printNewRound();
    }
  };

  //Initial print out
  printNewRound();

  return { playRound, getActivePlayer };
}

const game = GameController();
