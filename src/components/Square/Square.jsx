import React from 'react';
import './Square.scss';

export default function Square({ id, value, onClick }) {
  return (
    <button type="button" data-testid={id} onClick={() => onClick(id)} className="square" id={id}>
      {value}
    </button>
  );
}
