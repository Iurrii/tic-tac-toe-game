import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(9).fill(null),
      count: 0,
      victoryСounterX: 0,
      victoryСounterO: 0,
    }
  }

  clickCell = (event) => {
    let cellClicked = event.target.getAttribute('data');
    let updatedCells = this.state.cells;
    let symbol = (this.state.count % 2 === 0) ?
      'X' :
      'O';
    
    if (updatedCells[cellClicked] === null) {
      updatedCells[cellClicked] = symbol;

      this.setState({ count: this.state.count + 1 });
      this.setState({ cells: updatedCells });
    }

    this.isWinner(symbol);
    this.isDraw (this.state.count);

  }

  isWinner = (symbol) => {
    let winningСombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    winningСombinations.forEach((item, index) => {
      let combination = winningСombinations[index];
      if (this.state.cells[combination[0]] === symbol
        && this.state.cells[combination[1]] === symbol
        && this.state.cells[combination[2]] === symbol) {
        
        if (symbol === 'X') {
          this.setState({ victoryСounterX: (this.state.victoryСounterX + 1) }, () =>
            this.writeToStorage('victoryСounterX', this.state.victoryСounterX))

        }
        if (symbol === 'O') {
          this.setState({ victoryСounterO: (this.state.victoryСounterO + 1) }, () =>
            sessionStorage.setItem('victoryСounterO', this.state.victoryСounterO));
        }

        alert(`Win "${symbol}"`);
        this.resetField();
      }
    }
    )
  };

  isDraw = (count) => {
    if (count === 8) {
      alert('Ничья')
    }
  };

  /*storage*/

  writeToStorage = (key, stateName) => {
    sessionStorage.setItem(key, stateName)
  };

  deleteFromStorage = (key) => {
    sessionStorage.removeItem(key);
  };

  readFromStorage = (key) => {
    let isExite = sessionStorage.getItem(key) !== null;
    let countFromStorage = isExite ? sessionStorage.getItem(key) : 0;
    this.setState({ [key]: countFromStorage });

  }

  /*storage-end*/
  /*resets*/

  resetField = () => {
    this.setState({ count: 0 });
    this.setState({ cells: Array(9).fill(null) });
    console.clear();
  };

  resetGameScore = () => {
    this.setState({ victoryСounterX: 0 });
    this.setState({ victoryСounterO: 0 });
    this.deleteFromStorage('victoryСounterX');
    this.deleteFromStorage('victoryСounterO');
  };

/*resets-end*/

  componentDidMount() {

    this.readFromStorage('victoryСounterX');
    this.readFromStorage('victoryСounterO');
  
  }

  render() {
    return (
      <div>

        <section className="b-tic-tac-toe">
          <div className="b-tic-tac-toe__cell" onClick={this.clickCell} data="0">{this.state.cells[0]}</div>
          <div className="b-tic-tac-toe__cell" onClick={this.clickCell} data="1">{this.state.cells[1]}</div>
          <div className="b-tic-tac-toe__cell" onClick={this.clickCell} data="2">{this.state.cells[2]}</div>
          <div className="b-tic-tac-toe__cell" onClick={this.clickCell} data="3">{this.state.cells[3]}</div>
          <div className="b-tic-tac-toe__cell" onClick={this.clickCell} data="4">{this.state.cells[4]}</div>
          <div className="b-tic-tac-toe__cell" onClick={this.clickCell} data="5">{this.state.cells[5]}</div>
          <div className="b-tic-tac-toe__cell" onClick={this.clickCell} data="6">{this.state.cells[6]}</div>
          <div className="b-tic-tac-toe__cell" onClick={this.clickCell} data="7">{this.state.cells[7]}</div>
          <div className="b-tic-tac-toe__cell" onClick={this.clickCell} data="8">{this.state.cells[8]}</div>
        </section>
        <button onClick={this.resetField}>Очистить поле</button>
        <p>Win X - {this.state.victoryСounterX}</p>
        <p>Win O - {this.state.victoryСounterO}</p>
        <button onClick={this.resetGameScore}>Очистить счёт</button>
      </div>
    )

  }

}

export default App;

