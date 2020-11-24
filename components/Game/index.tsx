import React, { FC, useEffect } from 'react'
import GithubCorner from 'react-github-corner'

import { TIME_LIMIT, INITIAL_LEVEL, DIFFICULTY_LEVELS } from 'constants/game'
import { GIT_LINK } from 'constants/other'

import { theme } from 'global-styles'
import * as Cell from 'components/Cell'
import * as Board from 'components/Board'
import * as Progress from 'components/Progress'
import { Select, Button, } from 'components/UI'
import HomeIcon from '../../assets/icons/home.svg'
import * as Styles from './styles'

// LOGIC ============================================
export enum Status {
  Stopped, Running, Won, Lost
}

type LevelValue = {
  cols: number
  rows: number
}

type Level = {
  label: string
  value: LevelValue
}

export type State = {
  board: Board.Board,
  status: Status,
  secondLeft: number,
  level: Level
}

const startGame = (state: State): State => ({
  ...state,
  status: Status.Running,
  secondLeft: TIME_LIMIT
})

const goHome = (state: State): State => ({
  ...state,
  status: Status.Stopped,
})

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

const generateNewBoard = ({ cols, rows }: LevelValue): Board.Board => Board.makeRandom(cols, rows)

// VIEW ============================================
export const View: FC = () => {
  const [state, setState] = React.useState({
    board: generateNewBoard(INITIAL_LEVEL.value),
    secondLeft: TIME_LIMIT,
    status: Status.Stopped,
    level: INITIAL_LEVEL
  })

  const { board, status, secondLeft, level } = state

  const handleStartingClick = (): void => {
    if (status !== Status.Running) {
      setNewLevel(state.level)
      setState(startGame)
    }
  }

  const handleHomeClick = (): void => {
    if (status !== Status.Running) {
      setState(goHome)
    }
  }

  const handleRunningClick = (i: number): void => {
    if (status === Status.Running && canOpenCell(i, state)) {
      setState(openCell(i))
    }
  }

  const setNewLevel = (level: Level): void => {
    setState((state: State) => ({
      ...state,
      level: level,
      board: generateNewBoard(level.value)
    }))
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
        setState(failStep2)
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
        : <GithubCorner href={GIT_LINK}/>
      }
      <Styles.GameView>
        <StatusLineView status={status} secondLeft={secondLeft} level={level.label}/>
        <ScreenBoxView
          board={board}
          status={status}
          secondLeft={secondLeft}
          timeLimit={TIME_LIMIT}
          onClickAt={handleRunningClick}
          onClickStart={handleStartingClick}
          onClickHome={handleHomeClick}
          boardGrid={level.value}
          setNewLevel={setNewLevel}
        />
      </Styles.GameView>
    </>
  )
}

type StatusLineView = {
  status: Status,
  secondLeft: number,
  level: string
}

const StatusLineView: FC<StatusLineView> = ({ status, secondLeft, level }) => (
  <Styles.StatusLine>
    <div>{status === Status.Running ? level : '🙈'}</div>
    <div>
      {status === Status.Running && `Second left: ${secondLeft}`}
    </div>
  </Styles.StatusLine>
)

type ScreenBoxViewProps = {
  status: Status,
  board: Board.Board,
  secondLeft: number,
  timeLimit: number,
  onClickStart: () => void
  onClickHome: () => void
  boardGrid: LevelValue
  setNewLevel: (level: any) => void
  onClickAt: (i: number) => void
}

const ScreenBoxView: FC<ScreenBoxViewProps> = (
  {
    status,
    board,
    secondLeft,
    timeLimit,
    onClickAt,
    onClickStart,
    onClickHome,
    setNewLevel,
    boardGrid
  }) => {

  const getResult = (timeLimit: number, secondLeft: number): number => timeLimit - secondLeft

  switch (status) {
    case Status.Running:
      return <Board.BoardView board={board} grid={boardGrid} onClickAt={onClickAt}/>
    case Status.Stopped:
      return (
        <Board.ScreenView background={statusToBackground(status)}>
          <Styles.InfoBlock>
            <Styles.WelcomeTitle>Memory Game</Styles.WelcomeTitle>
            <Styles.SelectWrap>
              <Select options={DIFFICULTY_LEVELS} onChange={setNewLevel}/>
            </Styles.SelectWrap>
            <Button type='primary' onClick={onClickStart}>Click to play</Button>
          </Styles.InfoBlock>
        </Board.ScreenView>
      )
    case Status.Won:
      return (
        <Board.ScreenView background={statusToBackground(status)}>
          <Styles.InfoBlock>
            <Styles.Title>
              Your result: {getResult(timeLimit, secondLeft)}s
            </Styles.Title>
            <Styles.ButtonsWrap>
              <Button onClick={onClickHome} type='primary' icon={<HomeIcon/>}/>
              <Button onClick={onClickStart}>Play again</Button>
            </Styles.ButtonsWrap>
          </Styles.InfoBlock>
        </Board.ScreenView>
      )
    case Status.Lost:
      return (
        <Board.ScreenView background={statusToBackground(status)}>
          <Styles.InfoBlock>
            <Styles.Title>Defeat!</Styles.Title>
            <Styles.ButtonsWrap>
              <Button onClick={onClickHome} type='primary' icon={<HomeIcon/>}/>
              <Button onClick={onClickStart}>Try again</Button>
            </Styles.ButtonsWrap>
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
