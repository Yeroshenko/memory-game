import React, { FC } from 'react'
import produce from 'immer'
import shuffle from 'lodash.shuffle'

import * as L from '../../lib'
import * as Cell from '../Cell'
import * as Styles from './styles'

// LOGIC ============================================
export type Board = Array<Cell.Cell>

export const getStatusAt = (i: number, board: Board): Cell.Status => board[i].status

export const setStatusAt = (i: number, status: Cell.Status, board: Board) => produce(board, draft => {
  draft[i].status = status
})

export const setStatusesBy = (predFn: Cell.PredFn, status: Cell.Status, board: Board) => (
  board.map(cell => predFn(cell) ? { ...cell, status } : cell)
)

export const getStatusesBy = (predFn: Cell.PredFn, board: Board): Array<Cell.Status> => (
  board.flatMap(cell => predFn(cell) ? [cell.status] : [])
)

export const getSymbolsBy = (predFn: Cell.PredFn, board: Board): Array<string> => (
  board.flatMap(cell => predFn(cell) ? [cell.symbol] : [])
)

export const canOpenAt = (i: number, board: Board): boolean => {
  return i < board.length
    && Cell.isClosed((board[i]))
    && getStatusesBy(Cell.isBlocking, board).length < 2
}

export const areOpensEqual = (board: Board): boolean => {
  const openSymbols = getSymbolsBy(Cell.isOpen, board)
  return openSymbols.length >= 2 && L.allEquals(openSymbols)
}

export const areOpensDifferent = (board: Board): boolean => {
  const openSymbols = getSymbolsBy(Cell.isOpen, board)
  return openSymbols.length >= 2 && !L.allEquals(openSymbols)
}

export const makeRandom = (cols: number, rows: number): Array<Cell.Cell> => {
  if ((cols * rows / 2) > 26) throw new Error('too big')
  if ((cols * rows) % 2) throw new Error('must be even')

  return L.pipe(
    L.range(0, rows * cols / 2),
    L.toCharCodes,
    L.duplicateArrValues,
    shuffle,
    Cell.generate
  )
}

// VIEW ============================================
type BoardViewProps = {
  board: Board,
  onClickAt: (i: number) => void
}

export const BoardView: FC<BoardViewProps> = ({ board, onClickAt }) => {
  return (
    <Styles.BoardItem>
      {board.map((cell, i) =>
        <Cell.View key={i} cell={cell} onClick={_ => onClickAt(i)}/>
      )}
    </Styles.BoardItem>
  )
}

type ScreenViewProps = {
  background: string
}

export const ScreenView: FC<ScreenViewProps> = ({ background, children }) => (
  <Styles.Screen background={background}>
    {children}
  </Styles.Screen>
)
