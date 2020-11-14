import React, { FC, useEffect } from 'react'
import styled from 'styled-components'

import * as Cell from './Cell'
import * as Board from './Board'
import { theme } from '../styles'

// LOGIC ============================================
export enum Status {
  Stopped, Running, Won, Lost
}

export type State = {
  board: Board.Board,
  status: Status,
  secondLeft: number
}

const startGame = (): State => ({
  board: Board.makeRandom(4, 3),
  status: Status.Running,
  secondLeft: 60
})

// CURRYING
const openCell = (i: number) => (state: State): State => ({
  ...state,
  board: Board.setStatusAt(i, Cell.Status.Open, state.board)
})

const canOpenCell = (i: number, state: State): boolean => Board.canOpenAt(i, state.board)

const succeedStep = (state: State): State => ({
  ...state,
  board: Board.setStatusesBy(Cell.isOpen, Cell.Status.Done, state.board)
})

const failStep1 = (state: State): State => ({
  ...state,
  board: Board.setStatusesBy(Cell.isOpen, Cell.Status.Failed, state.board)
})

const failStep2 = (state: State): State => ({
  ...state,
  board: Board.setStatusesBy(Cell.isFailed, Cell.Status.Closed, state.board)
})

const hasWinningCond = (state: State): Boolean => state.board.filter(Cell.isDone).length === state.board.length

const hasLosingCond = (state: State): Boolean => !state.secondLeft

const setStatus = (status: Status) => (state: State): State => ({ ...state, status })

const nextSecond = (state: State): State => ({
  ...state, secondLeft: Math.max(state.secondLeft - 1, 0)
})

// VIEW ============================================
export const View: FC = () => {
  const [state, setState] = React.useState({
    ...startGame(),
    status: Status.Stopped,
  })

  const { board, status, secondLeft } = state

  const handleStartingClick = (): void => {
    if (status !== Status.Running) {
      setState(startGame)
    }
  }

  const handleRunningClick = (i: number): void => {
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
    let timer: ReturnType<typeof setInterval> | undefined = undefined

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
    <GameView onClick={handleStartingClick}>
      <StatusLineView status={status} secondLeft={secondLeft}/>
      <ScreenBoxView board={board} status={status} onClickAt={handleRunningClick}/>
    </GameView>
  )
}

type StatusLineView = {
  status: Status,
  secondLeft: number
}

const StatusLineView: FC<StatusLineView> = ({ status, secondLeft }) => (
  <StatusLine>
    <div>{status === Status.Running ? '🙈' : 'Lets Go!'}</div>
    <div>
      {status === Status.Running && `Second left: ${secondLeft}`}
    </div>
  </StatusLine>
)

type ScreenBoxViewProps = {
  status: Status,
  board: Board.Board,
  onClickAt: (i: number) => void
}

const ScreenBoxView: FC<ScreenBoxViewProps> = ({ status, board, onClickAt }) => {
  switch (status) {
    case Status.Running:
      return <Board.BoardView board={board} onClickAt={onClickAt}/>
    case Status.Stopped:
      return (
        <Board.ScreenView background={statusToBackground(status)}>
          <div>
            <h1>Memory Game</h1>
            <p>Click anywhere to start!</p>
          </div>
        </Board.ScreenView>
      )
    case Status.Won:
      return (
        <Board.ScreenView background={statusToBackground(status)}>
          <div>
            <h1>Victory!</h1>
            <p>Click anywhere to start again!</p>
          </div>
        </Board.ScreenView>
      )
    case Status.Lost:
      return (
        <Board.ScreenView background={statusToBackground(status)}>
          <div>
            <h1>Defeat!</h1>
            <p>Click anywhere to try again!</p>
          </div>
        </Board.ScreenView>
      )
  }
}

export const statusToBackground = (status: Status): string => {
  switch (status) {
    case Status.Won:
      return theme.board.won
    case Status.Lost:
      return theme.board.lost
    default:
      return theme.board.default
  }
}

// ATOMS ============================================
const GameView = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin: auto;
`

const StatusLine = styled.div`
  color: gray;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`