import React, { FC, useEffect } from 'react'
import GithubCorner from 'react-github-corner'

import { theme } from 'global-styles'
import * as Cell from 'components/Cell'
import * as Board from 'components/Board'
import * as Progress from 'components/Progress'
import * as Styles from './styles'

// LOGIC ============================================
const TIME_LIMIT = 60

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
  secondLeft: TIME_LIMIT
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

const showProgress = (state: State): boolean => (
  state.status === Status.Running || state.status === Status.Lost || state.status === Status.Won
)

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
    <>
      {showProgress(state)
        ? <Progress.View secondLeft={secondLeft} timeLimit={TIME_LIMIT}/>
        : <GithubCorner
          href='https://github.com/Yeroshenko/memory-game'
          size={theme.githubCorner.size}
          bannerColor={theme.githubCorner.bg}
        />
      }
      <Styles.GameView onClick={handleStartingClick}>
        <StatusLineView status={status} secondLeft={secondLeft}/>
        <ScreenBoxView board={board} status={status} onClickAt={handleRunningClick}/>
      </Styles.GameView>
    </>
  )
}

type StatusLineView = {
  status: Status,
  secondLeft: number
}

const StatusLineView: FC<StatusLineView> = ({ status, secondLeft }) => (
  <Styles.StatusLine>
    <div>{status === Status.Running ? '🙈' : 'Lets Go!'}</div>
    <div>
      {status === Status.Running && `Second left: ${secondLeft}`}
    </div>
  </Styles.StatusLine>
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
          <Styles.InfoBlock>
            <Styles.Title>Memory Game</Styles.Title>
            <Styles.Description>Click anywhere to start!</Styles.Description>
          </Styles.InfoBlock>
        </Board.ScreenView>
      )
    case Status.Won:
      return (
        <Board.ScreenView background={statusToBackground(status)}>
          <Styles.InfoBlock>
            <Styles.Title>Victory!</Styles.Title>
            <Styles.Description>Click anywhere to start again!</Styles.Description>
          </Styles.InfoBlock>
        </Board.ScreenView>
      )
    case Status.Lost:
      return (
        <Board.ScreenView background={statusToBackground(status)}>
          <Styles.InfoBlock>
            <Styles.Title>Defeat!</Styles.Title>
            <Styles.Description>Click anywhere to try again!</Styles.Description>
          </Styles.InfoBlock>
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
