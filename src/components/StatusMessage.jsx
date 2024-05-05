// eslint-disable-next-line react/prop-types
const StatusMessage = ({ winner, gamingBoard }) => {
  // eslint-disable-next-line react/prop-types
  const { squares, isXNext } = gamingBoard;
  // eslint-disable-next-line react/prop-types
  const noMovesLeft = squares.every(squareValue => squareValue !== null);
  // eslint-disable-next-line react/prop-types
  const nextPlayer = isXNext ? 'X' : 'O';

  const renderStatusMessage = () => { 
    if (winner){
        return <> winner is <span className={nextPlayer === 'X' ? 'text-orange' : 'text-green'}>{winner}</span>
        </>
    }
    if (!winner && noMovesLeft){
        return <><span className="text-orange">O</span> and <span className="text-green">X</span> Draw </>
    }

    if (!winner && !noMovesLeft){
        return <> Next player is <span className={nextPlayer === 'O' ? 'text-orange' : 'text-green'}>{nextPlayer}</span>
        </>
    }

    return null;
  }

  return (
    <h2 className="status-message">
      {renderStatusMessage()}
    </h2>
  );
};

export default StatusMessage;
