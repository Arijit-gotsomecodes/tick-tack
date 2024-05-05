import './style.scss';
import { useState } from 'react';
import Board from './components/Board';
import { calculateWinner } from './winner';
import History from './components/History';
import StatusMessage from './components/StatusMessage';

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: false }];

function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  const gamingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);
  // console.log('winner', winner);
  // console.log('winningSquares', winningSquares);  

  const handleClick = position => {
    if (gamingBoard.squares[position] || winner) {
      return;
    }

    setHistory(currentHistory => {
      const isTraversing = currentMove + 1 !== currentHistory.length;
      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : history[history.length - 1];

      const nextSquaresState = lastGamingState.squares.map((square, index) => {
        if (index === position && !square) {
          return lastGamingState.isXNext ? 'X' : 'O';
        }
        return square;
      });

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;
      return base.concat({
        squares: nextSquaresState,
        isXNext: !lastGamingState.isXNext,
      });
    });

    setCurrentMove(prev => prev + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };


  return (
    <div className="app">
      <h1>Tic <span className='text-green'>Tac</span> Toe</h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleClick={handleClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={onNewGame}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Start New Game
      </button>
      <h2 style={{
        fontWeight: 'normal',
        color: '#fff',
        fontSize: '20px',
        marginTop: '20px'
      
      }}> Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />

      <div className="bg-balls" />
    </div>
  );
}

export default App;