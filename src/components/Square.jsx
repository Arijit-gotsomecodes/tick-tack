// eslint-disable-next-line react/prop-types
const Square = ({ value, onClick, isWinningSquares }) => {
  const colorClassName = value === 'X' ? 'text-green' : 'text-orange';
  const winningClassName = isWinningSquares ? 'winning' : '';

  return (
    // console.log(iswinningSquares),
    <button
      className={`square ${colorClassName} ${winningClassName}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
