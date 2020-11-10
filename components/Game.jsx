import React, { useEffect } from 'react'

import * as Cell from './Cell'
import * as Board from './Board'

// LOGIC ============================================
const Status = {
  Stopped: 'Stopped',
  Running: 'Running',
  Won: 'Won',
  Lost: 'Lost'
}

const startGame = () => ({
  board: Board.makeRandom(4, 3),
  status: Status.Running,
  secondLeft: 60
})

// CURRYING
const openCell = (i) => (state) => {
  return {
    ...state,
    board: Board.setStatusAt(i, Cell.Status.Open, state.board)
  }
}

const canOpenCell = (i, state) => Board.canOpenAt(i, state.board)

const succeedStep = (state) => ({
  ...state,
  board: Board.setStatusesBy(Cell.isOpen, Cell.Status.Done, state.board)
})

const failStep1 = (state) => ({
  ...state,
  board: Board.setStatusesBy(Cell.isOpen, Cell.Status.Failed, state.board)
})

const failStep2 = (state) => ({
  ...state,
  board: Board.setStatusesBy(Cell.isFailed, Cell.Status.Closed, state.board)
})

const hasWinningCond = (state) => state.board.filter(Cell.isDone).length === state.board.length

const hasLosingCond = (state) => !state.secondLeft

const setStatus = (status) => (state) => ({ ...state, status })

const nextSecond = (state) => ({
  ...state, secondLeft: Math.max(state.secondLeft - 1, 0)
})

// LOGIC ============================================
export const View = () => {
  const [state, setState] = React.useState({
    ...startGame(),
    status: Status.Stopped,
  })

  const { board, status, secondLeft } = state

  const handleStartingClick = () => {
    if (status !== Status.Running) {
      setState(startGame)
    }
  }

  const handleRunningClick = (i) => {
    if (status === Status.Running && canOpenCell(i, state)) {
      setState(openCell(i))
    }
  }

  //Winning/Losing conditions
  useEffect(() => {
    if (status === Status.Running) {
      if (hasWinningCond(state)) {
        return setState(setStatus(Status.Won))
      } else if (hasLosingCond(state)) {
        return setState(setStatus(Status.Lost))
      }
    }
  }, [state])

  // Board handling
  useEffect(() => {
    if (Board.areOpensEqual(board)) {
      setState(succeedStep)
    } else if (Board.areOpensDifferent(board)) {
      setState(failStep1)
      setTimeout(() => {
        setState((failStep2))
      }, 500)
    }
  }, [board])

  // Timer handling
  useEffect(() => {
    let timer

    if (status === Status.Running && !timer) {
      timer = setInterval(() => {
        setState(nextSecond)
      }, 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [status])

  return (
    <div onClick={handleStartingClick}>
      <StatusLineView status={status} secondLeft={secondLeft}/>
      <ScreenBoxView board={board} status={status} onClickAt={handleRunningClick}/>
    </div>
  )
}

const StatusLineView = ({ status, secondLeft }) => {
  // console.log(secondLeft)
  return (
    <div className='status-line'>
      <div>{status === Status.Running ? '🙈' : 'Lets Go!'}</div>
      <div className='timer'>
        {status === Status.Running && `Second left: ${secondLeft}`}
      </div>
    </div>
  )
}

const ScreenBoxView = ({ status, board, onClickAt }) => {
  switch (status) {
    case Status.Running:
      return <Board.BoardView board={board} onClickAt={onClickAt}/>

    case Status.Stopped:
      return (
        <Board.ScreenView className='gray'>
          <div>
            <h1>Memory Game</h1>
            <p className='small text-center'>Click anywhere to start!</p>
          </div>
        </Board.ScreenView>
      )

    case Status.Won:
      return (
        <Board.ScreenView className='green'>
          <div>
            <h1>Victory!</h1>
            <p className='small text-center'>Click anywhere to start again!</p>
          </div>
        </Board.ScreenView>
      )
    case Status.Lost:
      return (
        <Board.ScreenView className='red'>
          <div>
            <h1>Defeat!</h1>
            <p className='small text-center'>Click anywhere to try again!</p>
          </div>
        </Board.ScreenView>
      )
  }
}