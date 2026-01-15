import { useEffect, useState } from 'react'
import './App.css'

const BOARD_SIZE = 20

function createInitialState() {
  const center = Math.floor(BOARD_SIZE / 2)
  const initialSnake = [
    { x: center + 1, y: center },
    { x: center, y: center },
    { x: center - 1, y: center },
  ]

  return {
    snake: initialSnake,
    direction: { x: 1, y: 0 },
    food: generateFood(initialSnake),
    isRunning: true,
    isGameOver: false,
    score: 0,
  }
}

function generateFood(occupied) {
  while (true) {
    const x = Math.floor(Math.random() * BOARD_SIZE)
    const y = Math.floor(Math.random() * BOARD_SIZE)
    const conflict = occupied.some((segment) => segment.x === x && segment.y === y)
    if (!conflict) {
      return { x, y }
    }
  }
}

function App() {
  const [gameState, setGameState] = useState(() => createInitialState())

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key

      if (key === ' ' && gameState.isGameOver) {
        setGameState(createInitialState())
        return
      }

      let nextDirection = null

      if (key === 'ArrowUp' || key === 'w' || key === 'W') {
        nextDirection = { x: 0, y: -1 }
      } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
        nextDirection = { x: 0, y: 1 }
      } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
        nextDirection = { x: -1, y: 0 }
      } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
        nextDirection = { x: 1, y: 0 }
      }

      if (!nextDirection) {
        return
      }

      setGameState((prev) => {
        if (prev.isGameOver) {
          return prev
        }

        const current = prev.direction
        if (nextDirection.x === -current.x && nextDirection.y === -current.y) {
          return prev
        }

        return {
          ...prev,
          direction: nextDirection,
          isRunning: true,
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState.isGameOver])

  useEffect(() => {
    if (!gameState.isRunning || gameState.isGameOver) {
      return
    }

    const intervalId = setInterval(() => {
      setGameState((prev) => {
        if (!prev.isRunning || prev.isGameOver) {
          return prev
        }

        const head = prev.snake[0]
        const newHead = {
          x: head.x + prev.direction.x,
          y: head.y + prev.direction.y,
        }

        const hitWall =
          newHead.x < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= BOARD_SIZE

        const hitSelf = prev.snake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y,
        )

        if (hitWall || hitSelf) {
          return {
            ...prev,
            isRunning: false,
            isGameOver: true,
          }
        }

        const ateFood = newHead.x === prev.food.x && newHead.y === prev.food.y

        const newSnake = ateFood
          ? [newHead, ...prev.snake]
          : [newHead, ...prev.snake.slice(0, -1)]

        const newFood = ateFood ? generateFood(newSnake) : prev.food
        const newScore = ateFood ? prev.score + 1 : prev.score

        return {
          ...prev,
          snake: newSnake,
          food: newFood,
          score: newScore,
        }
      })
    }, 150)

    return () => clearInterval(intervalId)
  }, [gameState.isRunning, gameState.isGameOver])

  function handleRestart() {
    setGameState(createInitialState())
  }

  function togglePause() {
    setGameState((prev) => {
      if (prev.isGameOver) {
        return prev
      }

      return {
        ...prev,
        isRunning: !prev.isRunning,
      }
    })
  }

  const { snake, food, isRunning, isGameOver, score } = gameState

  const cells = []
  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
      const isHead = isSnake && snake[0].x === x && snake[0].y === y
      const isFood = food.x === x && food.y === y

      let className = 'cell'
      if (isSnake) {
        className += ' cell-snake'
      }
      if (isHead) {
        className += ' cell-snake-head'
      }
      if (isFood) {
        className += ' cell-food'
      }

      cells.push(<div key={`${x}-${y}`} className={className} />)
    }
  }

  return (
    <div className="app">
      <h1 className="app-title">贪吃蛇</h1>
      <div className="info">
        <div className="score-label">
          分数：
          <span className="score-value">{score}</span>
        </div>
        <div className="status">
          状态：
          <span
            className={`status-badge ${
              isGameOver ? 'status-badge-danger' : isRunning ? 'status-badge-running' : 'status-badge-paused'
            }`}
          >
            {isGameOver ? '游戏结束' : isRunning ? '进行中' : '暂停'}
          </span>
        </div>
      </div>
      <div className="game-container">
        <div className="board">{cells}</div>
        {isGameOver && (
          <div className="overlay">
            <div className="overlay-card">
              <div className="overlay-title">游戏结束</div>
              <div className="overlay-score">
                本局得分：
                <span className="score-value">{score}</span>
              </div>
              <div className="overlay-hint">按空格键或点击下方按钮重新开始</div>
              <button type="button" className="primary-button restart-button" onClick={handleRestart}>
                重新开始
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="controls">
        {!isGameOver && (
          <>
            <button type="button" className="primary-button" onClick={togglePause}>
              {isRunning ? '暂停' : '继续'}
            </button>
            <div className="hint">使用方向键或 WASD 控制方向，空格在结束后重开</div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
