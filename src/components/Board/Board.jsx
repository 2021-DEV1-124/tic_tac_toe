import React from 'react';
import Square from '../Square/Square';
import './Board.scss';

export default function Board({ onClick }) {
  return (
    <div className="board" data-testid="board-container">
      {(Array(9).fill(null)).map((v, i) => <Square key={i} id={i} value={i} onClick={onClick} />)}
    </div>
  );
}
