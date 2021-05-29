import React from 'react';
import './Board.css';
import Cross from './Cross';
import Naught from './Naught';

// a tic tac toe board is an array of rows
// each cell can be marked by player 1 or 2, or be null (not yet played)
type TicTacToePlayer = 1 | 2;
type TicTacToeValue = TicTacToePlayer | null;
type TicTacToeBoard = TicTacToeValue[][];

type BoardState = {
  gameOver: boolean;
  grid: TicTacToeBoard;
  player: TicTacToePlayer;
};


const NEW_STATE: BoardState = {
  gameOver: false,
  grid: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  player: 1
};


// https://stackoverflow.com/a/51077959/287568
class Board extends React.Component<{}, BoardState> {


  constructor(props: any) {
    super(props);
    this.state = NEW_STATE;
  }


  detectGameOver(grid: TicTacToeBoard, row: number, column: number): { gameOver: boolean, winner?: TicTacToePlayer } {
    // check for winner on row
    // let winner: TicTacToePlayer = this.getRowWinner(row);
    // if (winner) {
    //   return { gameOver: true, winner };
    // }

    // check for winner on column
    // check for winner on diagonal

    // if grid is filled, game is over
    if (grid.every(rows => rows.every(value => value !== null))) {
      return { gameOver: true };
    }

    return { gameOver: false };
  }


  newGame() {
    this.setState(NEW_STATE);
  }


  play(row: number, column: number) {
    if (!Array.isArray(this.state.grid[row]) || this.state.grid[row][column] !== null) return;

    // TODO find a better way to update a readonly nested array
    const grid = this.state.grid.map((rowValues, rowIndex) => rowValues.map((value, columnIndex) =>
      rowIndex === row && columnIndex === column ? this.state.player : value));

    const { gameOver } = this.detectGameOver(grid, row, column);

    this.setState({
      gameOver,
      grid,
      player: this.state.player === 1 ? 2 : 1
    });
  }


  render() {
    // https://reactjs.org/docs/lists-and-keys.html#basic-list-component
    const rows = this.state.grid.map((row, rowIndex) =>
      <tr key={`tr-${rowIndex}`}>{row.map((value, colIndex) => this.renderCell(value, rowIndex, colIndex))}</tr>);

    let gameOver;
    if (this.state.gameOver) {
      gameOver = <div>
        <h2>Game Over!</h2>
        <p>Stalemate… Tough game!</p>
      </div>;
    }

    return (
      <div className="board">
        <table><tbody>{rows}</tbody></table>
        <button onClick={() => this.newGame()}>New Game</button>
        {gameOver}
      </div>
    );
  }


  renderCell(value: TicTacToeValue, row: number, column: number) {
    return <td key={`td-${row}-${column}`} className={`played-${value}`}>
      {value === null ? <button onClick={() => this.play(row, column)}>{row}, {column}</button> : this.renderPlayed(value)}
    </td>;
  }


  renderPlayed(value: TicTacToePlayer) {
    return value === 1 ? <Naught/> : <Cross/>;
  }
}


export default Board;
