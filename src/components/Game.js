import React, { useState } from "react";
import "./Game.css";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [won,setWon]=useState(null);

  const players = ['Player 1', 'Player 2'];

  

  const handleClick = (index) => {
    const updatedBoard = [...board];

    if(calculateWinner(board) !== null)
    {
        setWon(calculateWinner(board));
        resetGame();
        return;
    }
    if ( updatedBoard[index]) {
      return;
    }

    updatedBoard[index] = xIsNext ? "X" : "O";
    setBoard(updatedBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const calculateWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6] 
    ];
  
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
  
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner is: ${won ==="x" ? "Player 1" : "Player 2"}`
    : `Next player: ${xIsNext ? "X" : "O"}`;
  


  return (
    <div>
      <h2 className="game-title">Tic Tac Toe</h2>
      <div className="game flex-col m-auto">
        <div className="row-1 flex space-x-3 ">
          <div className="game-board w-50">{renderSquare(0)}</div>
          <div className="game-board w-50">{renderSquare(1)}</div>
          <div className="game-board w-50">{renderSquare(2)}</div>
        </div>
        <div className="row-2 flex space-x-3 ">
          <div className="game-board w-50">{renderSquare(3)}</div>
          <div className="game-board w-50">{renderSquare(4)}</div>
          <div className="game-board w-50">{renderSquare(5)}</div>
        </div>
        <div className="row-3 flex space-x-3 ">
          <div className="game-board w-50">{renderSquare(6)}</div>
          <div className="game-board w-50">{renderSquare(7)}</div>
          <div className="game-board w-50">{renderSquare(8)}</div>
        </div>
      </div>
      <div className="game-status">
        <div className={`player-name ${xIsNext ? 'active' : ''}`}>
          {players[0]}
        </div>
        <div className={`player-name ${!xIsNext ? 'active' : ''}`}>
          {players[1]}
        </div>
      </div>
      { 
        <p className="game-status-line">{status}</p>
        }
       <button className="reset-button" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default Game;
