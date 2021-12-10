import React, { useEffect, useState } from 'react';
import Board from '../Board/Board';
import './Game.scss';
import calculateWinner from '../../services/calculateWinner';
import calculateDraw from '../../services/calculateDraw';

export default function Game() {
  const [playerTurn, setPlayerTurn] = useState({ playerX: false, playerO: false });
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));

  useEffect(() => {
    if (calculateWinner(squares) === 'X') {
      setWinner('X');
    }
    if (calculateWinner(squares) === 'O') {
      setWinner('O');
    }
    if (calculateDraw(squares) && winner !== null) {
      setDraw(true);
    }
  }, [squares]);

  const startGameAction = () => {
    if (!playerTurn.playerO && !playerTurn.playerX) {
      setPlayerTurn({ playerX: true, playerO: false });
    }
    if (playerTurn.playerO || playerTurn.playerX) {
      setDraw(false);
      setWinner(null);
      setSquares(Array(9).fill(null));
      setPlayerTurn({ playerX: true, playerO: false });
    }
  };

  const onSquareClick = (i) => {
    if (!playerTurn.playerO && !playerTurn.playerX) {
      return;
    }

    if (winner) {
      return;
    }

    setSquares((prevState) => {
      const newState = prevState.map((value, index) => {
        if (index === i && value === null) {
          return playerTurn.playerX ? 'X' : 'O';
        }
        return value;
      });

      if (JSON.stringify(prevState) === JSON.stringify(newState)) {
        return prevState;
      }

      setPlayerTurn({ playerX: !playerTurn.playerX, playerO: playerTurn.playerX });
      return newState;
    });
  };

  return (
    <div className="game" data-testid="game">
      <div className="title-container">
        <h1>
          {!draw && !playerTurn.playerO && !playerTurn.playerX && 'Welcome to Tic Tac Toe'}
          {!draw && playerTurn.playerO && !playerTurn.playerX && !winner && 'Player O turn'}
          {!draw && !playerTurn.playerO && playerTurn.playerX && !winner && 'Player X turn'}
          {!draw && winner && `${winner} player Won`}
          {draw && 'Its a Draw !!'}
        </h1>
        <button type="button" onClick={() => startGameAction()}>
          {!playerTurn.playerO && !playerTurn.playerX && 'Start'}
          {(playerTurn.playerO || playerTurn.playerX) && 'Reset'}
        </button>
      </div>

      <div className="game-board-wrapper">
        <Board squares={squares} onClick={onSquareClick} />
      </div>
    </div>
  );
}
