import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     // Controlled component - the board has full control of their content

//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }
//     // this is now handled by Board class, so it is a function component,
//     // as it doesn't have a state

//     render() {
//       return (
//         <button className="square" 
//         onClick=
//         {() => {
//         // this.setState({value: 'X'})
//         this.props.onClick() //onClick prop defined in Board class and passed to Square
//         }}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }

function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    )
}
  
  class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     };
    // } //this is now controlled by the Game class

    // handleClick(i) { //this adds the X to the square clicked on
    //     const squares = this.state.squares.slice();
    //     console.log(this.state);

    //     // If winner already declared or if square was filled
    //     if (calculateWinner(squares) || squares[i]) {
    //         return
    //     }

    //     squares[i] = this.state.xIsNext ? 'X' : 'O'; //if true, x, if false, o
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext, //reset to opposite
    //     });
    // }

    renderSquare(i) {
      console.log(this.props.squares[i]);
      return (
      <Square 
      //passing down props "value" and "onClick" to square class  
      value={this.props.squares[i]}
      //when the square is rendered from the square class and then clicked on, do this
      onClick={
          () => {
              this.props.onClick(i)
          }
      }/>
      );
    }
  
    render() {
    //   const status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //     status = `Winner: ${winner}`;
    // } else {
    //     status = `Next Player ${this.state.xIsNext ? 'X' : 'O'}`
    // }
  
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
            history: [
                {
                    squares: [
                        null, null, null,
                        null, null, null,
                        null, null, null
                    ]
                },
                // After first move
            ],
            stepNumber: 0,
            xIsNext: true,
          }
      }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1); // gets the copy of the history from the current step, so it jumps back and erases future moves
        console.log(this.state.history);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        console.log(squares);

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });

        console.log(this.state.history);
    }
    
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => { //step is for history value, move is for history index
          const desc = move ? `Go to move #${move}` : `Go to game start`;
          return (
            <li key={move}>
              <button onClick={
                () => this.jumpTo(move)
                }>{desc}</button>
            </li>
          )
        })

        let status;

        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares = {current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i=0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          // If the squares line up with either all x's or o's, return that letter   
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  