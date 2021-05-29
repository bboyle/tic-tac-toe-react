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
  grid: TicTacToeBoard;
  player: TicTacToePlayer;
};


// https://stackoverflow.com/a/51077959/287568
class Board extends React.Component<{}, BoardState> {


  constructor(props: any) {
    super(props);
    this.state = {
      grid: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      player: 1
    };
  }


  play(row: number, column: number) {
    if (!Array.isArray(this.state.grid[row]) || this.state.grid[row][column] !== null) return;
    this.setState({
      // TODO find a better way to update a readonly nested array
      grid: this.state.grid.map((rowValues, rowIndex) => rowValues.map((value, columnIndex) =>
        rowIndex === row && columnIndex === column ? this.state.player : value)),
      player: this.state.player === 1 ? 2 : 1
    });
    // this.detectGameOver(row, column);
  }


  render() {
    // https://reactjs.org/docs/lists-and-keys.html#basic-list-component
    const rows = this.state.grid.map((row, rowIndex) => <tr>{row.map((value, colIndex) => {
      // https://flaviocopes.com/react-pass-parameter-event/
      // https://reactjs.org/docs/conditional-rendering.html#inline-if-else-with-conditional-operator
      return <td>{value ? this.renderValue(value) : <button onClick={() => this.play(rowIndex, colIndex)}>{rowIndex}, {colIndex}</button>}</td>;
    })}</tr>);

    return (
      <table>{rows}</table>
    );
  }


  renderValue(value: TicTacToeValue) {
    if (value === 1) {
      return <Naught/>;
    } else {
      return <Cross/>;
    }
  }
}

export default Board;
