import React from 'react';
import uuid from 'react-uuid';
import Square from '../Square/Square';
import './Board.scss';

export default function Board({ squares, onClick }) {
  return (
    <div className="board" data-testid="board-container">
      {squares.map((v, i) => <Square key={uuid()} id={i} value={v} onClick={onClick} />)}
    </div>
  );
}
