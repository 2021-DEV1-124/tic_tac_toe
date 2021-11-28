import React, { useEffect, useState } from 'react';
import Board from '../Board/Board';
import './Game.scss';
import calculateWinner from '../../services/calculateWinner';

export default function Game() {
  const [playerTurn, setPlayerTurn] = useState({ playerX: false, playerO: false });
  const [winner, setWinner] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(null));

  useEffect(() => {
    if (calculateWinner(squares) === 'X') {
      setWinner('X');
    }
    if (calculateWinner(squares) === 'O') {
      setWinner('O');
    }
  }, [squares]);

  const startGameAction = () => {
    if (!playerTurn.playerO && !playerTurn.playerX) {
      setPlayerTurn({ playerX: true, playerO: false });
    }
    if (playerTurn.playerO || playerTurn.playerX) {
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

    if (playerTurn.playerX) {
      setSquares((prevState) => {
        const newState = prevState.map((value, index) => {
          if (index === i && value === null) {
            return 'X';
          }
          return value;
        });

        if (JSON.stringify(prevState) === JSON.stringify(newState)) {
          return prevState;
        }

        setPlayerTurn({ playerX: false, playerO: true });
        return newState;
      });
    }

    if (playerTurn.playerO) {
      setSquares((prevState) => {
        const newState = prevState.map((value, index) => {
          if (index === i && value === null) {
            return 'O';
          }
          return value;
        });

        if (JSON.stringify(prevState) === JSON.stringify(newState)) {
          return prevState;
        }

        setPlayerTurn({ playerX: true, playerO: false });
        return newState;
      });
    }
  };

  return (
    <div className="game">
      <div className="title-container">
        <h1>
          {!playerTurn.playerO && !playerTurn.playerX && 'Welcome to Tic Tac Toe'}
          {playerTurn.playerO && !playerTurn.playerX && !winner && 'Player O turn'}
          {!playerTurn.playerO && playerTurn.playerX && !winner && 'Player X turn'}
          {winner && `${winner} player Won`}
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
