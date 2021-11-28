import React from 'react';
import Square from '../Square/Square';
import './Board.scss';

export default function Board({ onClick }) {
  return (
    <div className="board">
      {(Array(9).fill(null)).map((v, i) => <Square id={i} value={i} onClick={onClick} />)}
    </div>
  );
}
