// useState: tic tac toe
// using cusom hook useLocalStorageState
// http://localhost:3000/isolated/exercise/04.extra.js

import * as React from 'react'
import { useLocalStorageState } from '../utils.js'

function Board({ selectSquare, squares }) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {

  const [games, setGames] = useLocalStorageState('games_tic-tac-toe', [{ step: 0, isCurrent: true, squares: Array(9).fill(null) }])

  const currentGame = games.find(game => game.isCurrent)
  const nextValue = calculateNextValue(currentGame.squares)
  const winner = calculateWinner(currentGame.squares)
  const status = calculateStatus(winner, currentGame.squares, nextValue)

  function selectSquare(square) {
    if (winner || currentGame.squares[square]) return

    const copySquares = [...currentGame.squares]
    copySquares[square] = nextValue

    const copyGames = games.map(game => {
      game.isCurrent = false
      return structuredClone(game)
    })
    setGames([...copyGames, { step: copyGames.length, isCurrent: true, squares: copySquares }])
  }

  function restart() {
    setGames([{ step: 0, isCurrent: true, squares: Array(9).fill(null) }])
  }

  function handleOnClickButtonMove(gameStep) {
    const copyGames = games.map(game => {
      game.isCurrent = game.step === gameStep
      return structuredClone(game)
    })
    setGames(copyGames)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board selectSquare={selectSquare} squares={currentGame.squares} />
        <button className="restart" onClick={restart}>restart</button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          {games.map(game =>
            <li key={game.step}>
              <button disabled={game.isCurrent} type="button" onClick={() => { handleOnClickButtonMove(game.step) }}>
                {`${game.step === 0 ? 'Go to game start' : `Go to move #${game.step}`}  ${game.isCurrent ? '(current)' : ''}`}
              </button>
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
