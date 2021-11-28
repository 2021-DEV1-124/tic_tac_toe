import React from 'react';
import Square from '../Square/Square';
import './Board.scss';

export default function Board({ squares, onClick }) {
  return (
    <div className="board" data-testid="board-container">
      {squares.map((v, i) => <Square key={i} id={i} value={v} onClick={onClick} />)}
    </div>
  );
}
