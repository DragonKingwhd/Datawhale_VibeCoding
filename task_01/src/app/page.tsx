'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Position {
  x: number
  y: number
}

interface Word {
  id: number
  word: string
  position: Position
}

const GRID_SIZE = 20
const CELL_SIZE = 20
const WORD_POOL = [
  '晨', '曦', '梦', '想', '星', '光', '海', '洋',
  '山', '峰', '春', '风', '秋', '月', '夏', '雨',
  '冬', '雪', '花', '开', '鸟', '语', '云', '雾',
  '露', '珠', '草', '木', '天', '空', '夜', '晚'
]

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 })
  const [nextDirection, setNextDirection] = useState<Position>({ x: 0, y: 0 })
  const [words, setWords] = useState<Word[]>([])
  const [collectedWords, setCollectedWords] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'gameover' | 'poem' | 'image'>('idle')
  const [score, setScore] = useState(0)
  const [poem, setPoem] = useState('')
  const [generatedImage, setGeneratedImage] = useState('')
  const [loading, setLoading] = useState(false)

  // ✅ 使用 useRef 存储当前的游戏状态，避免闭包问题
  const gameStatusRef = useRef(gameStatus)

  const generateWord = useCallback(() => {
    const randomWord = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)]
    let newPosition: Position
    let validPosition = false

    do {
      newPosition = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
      // 检查是否与蛇的位置重叠
      validPosition = !snake.some(s => s.x === newPosition.x && s.y === newPosition.y)
      // 检查是否与其他单词重叠
      validPosition = validPosition && !words.some(w => w.position.x === newPosition.x && w.position.y === newPosition.y)
    } while (!validPosition)

    return {
      id: Date.now(),
      word: randomWord,
      position: newPosition
    }
  }, [snake, words])

  const spawnWords = useCallback(() => {
    if (words.length < 3) {
      setWords(prev => [...prev, generateWord()])
    }
  }, [words, generateWord])

  const moveSnake = useCallback(() => {
    if (direction.x === 0 && direction.y === 0) return

    setSnake(prevSnake => {
      const head = prevSnake[0]
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y
      }

      // 检查边界碰撞
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameStatus('gameover')
        return prevSnake
      }

      // 检查自身碰撞
      if (prevSnake.some(s => s.x === newHead.x && s.y === newHead.y)) {
        setGameStatus('gameover')
        return prevSnake
      }

      // 检查是否吃到单词
      const eatenWord = words.find(w => w.position.x === newHead.x && w.position.y === newHead.y)
      if (eatenWord) {
        setWords(prev => prev.filter(w => w.id !== eatenWord.id))
        setCollectedWords(prev => [...prev, eatenWord.word])
        setScore(prev => prev + 10)

        // 检查是否收集了8个单词
        if (collectedWords.length + 1 >= 8) {
          setGameStatus('poem')
          generatePoem([...collectedWords, eatenWord.word])
          return [newHead, ...prevSnake]
        }

        return [newHead, ...prevSnake]
      }

      // 没吃到单词，移除尾部
      const newSnake = [newHead, ...prevSnake.slice(0, -1)]
      return newSnake
    })

    setDirection(nextDirection)
  }, [direction, nextDirection, words, collectedWords])

  const generatePoem = async (wordList: string[]) => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ words: wordList })
      })
      const data = await response.json()
      setPoem(data.poem)
    } catch (error) {
      console.error('Error generating poem:', error)
    }
    setLoading(false)
  }

  const remixPoem = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/remix-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poem, words: collectedWords })
      })
      const data = await response.json()
      setPoem(data.poem)
    } catch (error) {
      console.error('Error remixing poem:', error)
    }
    setLoading(false)
  }

  const generateImageFromPoem = async () => {
    setLoading(true)
    setGameStatus('image')
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poem })
      })
      const data = await response.json()
      setGeneratedImage(data.image)
    } catch (error) {
      console.error('Error generating image:', error)
    }
    setLoading(false)
  }

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setDirection({ x: 1, y: 0 })  // ✅ 改为向右移动
    setNextDirection({ x: 1, y: 0 })  // ✅ 改为向右移动
    setWords([])
    setCollectedWords([])
    setGameStatus('playing')
    setScore(0)
    setPoem('')
    setGeneratedImage('')
  }

  const resetGame = () => {
    startGame()
  }

  useEffect(() => {
    if (gameStatus === 'playing') {
      spawnWords()
    }
  }, [gameStatus, words.length, spawnWords])

  // ✅ 分离的 effect：只负责更新 ref
  useEffect(() => {
    gameStatusRef.current = gameStatus
  }, [gameStatus])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ✅ 使用 ref 获取最新的游戏状态，避免闭包问题
      if (gameStatusRef.current !== 'playing') return

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          setNextDirection(prev => prev.y === 1 ? prev : { x: 0, y: -1 })
          break
        case 'ArrowDown':
          e.preventDefault()
          setNextDirection(prev => prev.y === -1 ? prev : { x: 0, y: 1 })
          break
        case 'ArrowLeft':
          e.preventDefault()
          setNextDirection(prev => prev.x === 1 ? prev : { x: -1, y: 0 })
          break
        case 'ArrowRight':
          e.preventDefault()
          setNextDirection(prev => prev.x === -1 ? prev : { x: 1, y: 0 })
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])  // ✅ 空依赖数组，事件监听器只注册一次

  useEffect(() => {
    if (gameStatus === 'playing') {
      const gameLoop = setInterval(moveSnake, 200)
      return () => clearInterval(gameLoop)
    }
  }, [gameStatus, moveSnake])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl">🐍 贪吃蛇诗歌游戏</CardTitle>
            <p className="text-center text-muted-foreground">收集8个汉字，AI将为你创作一首诗</p>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 游戏区域 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>游戏区域</CardTitle>
                  <Badge variant="outline">分数: {score}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {gameStatus === 'idle' && (
                  <div className="text-center py-12">
                    <p className="text-lg mb-4">准备开始收集单词</p>
                    <Button onClick={startGame} size="lg">开始游戏</Button>
                    <p className="text-sm text-muted-foreground mt-4">使用方向键控制蛇的移动</p>
                  </div>
                )}

                {gameStatus === 'playing' && (
                  <div className="flex justify-center">
                    <div
                      className="relative bg-white dark:bg-gray-800 rounded-lg border-4 border-gray-300 dark:border-gray-600"
                      style={{
                        width: GRID_SIZE * CELL_SIZE,
                        height: GRID_SIZE * CELL_SIZE
                      }}
                    >
                      {/* 绘制网格 */}
                      <div className="absolute inset-0 grid" style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
                        gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`
                      }}>
                        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
                          <div key={i} className="border border-gray-100 dark:border-gray-700" />
                        ))}
                      </div>

                      {/* 绘制单词 */}
                      {words.map(word => (
                        <div
                          key={word.id}
                          className="absolute flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400"
                          style={{
                            left: word.position.x * CELL_SIZE,
                            top: word.position.y * CELL_SIZE,
                            width: CELL_SIZE,
                            height: CELL_SIZE
                          }}
                        >
                          {word.word}
                        </div>
                      ))}

                      {/* 绘制蛇 */}
                      {snake.map((segment, index) => (
                        <div
                          key={index}
                          className="absolute flex items-center justify-center text-lg"
                          style={{
                            left: segment.x * CELL_SIZE,
                            top: segment.y * CELL_SIZE,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            backgroundColor: index === 0 ? '#22c55e' : '#4ade80',
                            borderRadius: '4px'
                          }}
                        >
                          {index === 0 && '🐍'}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {gameStatus === 'gameover' && (
                  <div className="text-center py-12">
                    <p className="text-2xl mb-4">游戏结束！</p>
                    <p className="text-lg mb-4">收集了 {collectedWords.length} 个汉字</p>
                    <Button onClick={resetGame} size="lg">重新开始</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 右侧面板 */}
          <div className="space-y-6">
            {/* 收集的单词 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📦</span>
                  <span>单词收集盒</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-32 pr-4">
                  <div className="flex flex-wrap gap-2">
                    {collectedWords.map((word, index) => (
                      <Badge key={index} variant="secondary" className="text-lg px-3 py-1">
                        {word}
                      </Badge>
                    ))}
                    {collectedWords.length === 0 && (
                      <p className="text-sm text-muted-foreground">还没有收集到单词</p>
                    )}
                  </div>
                </ScrollArea>
                <div className="mt-2 text-sm text-muted-foreground">
                  进度: {collectedWords.length}/8
                </div>
              </CardContent>
            </Card>

            {/* 诗歌区域 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>✨</span>
                  <span>AI诗歌</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {gameStatus === 'poem' && !loading && !poem && (
                  <p className="text-center text-muted-foreground">正在创作中...</p>
                )}

                {loading && (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-sm text-muted-foreground">AI正在创作中...</p>
                  </div>
                )}

                {poem && !loading && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg">
                      <p className="text-center text-lg leading-loose whitespace-pre-line">{poem}</p>
                    </div>
                    <div className="space-y-2">
                      <Button onClick={remixPoem} className="w-full" disabled={loading}>
                        🔄 重新混合诗歌
                      </Button>
                      <Button onClick={generateImageFromPoem} className="w-full" disabled={loading}>
                        🎨 根据诗歌生成图像
                      </Button>
                      <Button onClick={resetGame} variant="outline" className="w-full">
                        🔄 再玩一次
                      </Button>
                    </div>
                  </div>
                )}

                {gameStatus === 'image' && !loading && generatedImage && (
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden border-2">
                      <img src={generatedImage} alt="AI生成的图像" className="w-full" />
                    </div>
                    <Button onClick={resetGame} className="w-full">
                      🔄 再玩一次
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
