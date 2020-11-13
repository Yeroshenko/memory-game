import React from 'react'
import produce from 'immer'
import shuffle from 'lodash.shuffle'
import styled from 'styled-components'

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
    <Board>
      {board.map((cell, i) =>
        <Cell.View key={i} cell={cell} onClick={_ => onClickAt(i)}/>
      )}
    </Board>
  )
}

export const ScreenView = ({ background, children }) => (
  <Screen background={background}>
    {children}
  </Screen>
)

// ATOMS ============================================
const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 640px;
  height: 480px;
  gap: 2px;
`

const Screen = styled.div`
  text-align: center;
  display: flex;
  width: 640px;
  height: 480px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${props => props.background};
`