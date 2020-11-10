import React from 'react'
import cn from 'classnames'
import produce from 'immer'
import shuffle from 'lodash.shuffle'

import * as L from '../lib'
import * as Cell from './Cell'


// LOGIC ============================================
// cont cell = ...
// const board = [cel1, cel2, cel3, cel4, cel5, cel6]

export const getStatusAt = (i, board) => board[i].status

export const setStatusAt = (i, status, board) => produce(board, draft => {
  draft[i].status = status
})

export const setStatusesBy = (predFn, status, board) => (
  board.map(cell => predFn(cell) ? { ...cell, status } : cell)
)

export const getStatusesBy = (predFn, board) => (
  board.flatMap(cell => predFn(cell) ? [cell.status] : [])
)

export const getSymbolsBy = (predFn, board) => {
  return board.flatMap(cell => predFn(cell) ? [cell.symbol] : [])
}

export const canOpenAt = (i, board) => {
  return i < board.length
    && Cell.isClosed((board[i]))
    && getStatusesBy(Cell.isBlocking, board).length < 2
}

export const areOpensEqual = (board) => {
  const openSymbols = getSymbolsBy(Cell.isOpen, board)
  return openSymbols.length >= 2 && L.allEquals(openSymbols)
}

export const areOpensDifferent = (board) => {
  const openSymbols = getSymbolsBy(Cell.isOpen, board)
  return openSymbols.length >= 2 && !L.allEquals(openSymbols)
}

export const makeRandom = (cols, rows) => {
  if ((cols * rows / 2) > 26) throw new Error('too big')
  if ((cols * rows) % 2) throw new Error('must be even')

  const res = () => L.range(0, rows * cols / 2)
    |> L.toCharCodes
    |> L.duplicateArrValues
    |> shuffle
    |> Cell.generate

  return res()
}

// VIEW ============================================
export const BoardView = ({ board, onClickAt }) => {
  return (
    <div className='board'>
      {board.map((cell, i) =>
        <Cell.View key={i} cell={cell} onClick={_ => onClickAt(i)}/>
      )}
    </div>
  )
}

export const ScreenView = ({ className, children }) => (
  <div className={cn('screen', className)}>
    {children}
  </div>
)