import React, { FC } from 'react'

import * as Styles from './styles'

// LOGIC ============================================
export enum Status {
  Open, Closed, Done, Failed,
}

export type Cell = {
  symbol: string
  status: Status
}

export type PredFn = (cell: Cell) => boolean

export const isOpen = (cell: Cell): boolean => (
  cell.status === Status.Open
)

export const isClosed = (cell: Cell): boolean => (
  cell.status === Status.Closed
)

export const isDone = (cell: Cell): boolean => (
  cell.status === Status.Done
)

export const isFailed = (cell: Cell): boolean => (
  cell.status === Status.Failed
)

export const isBlocking = (cell: Cell): boolean => (
  isOpen(cell) || isFailed(cell)
)

export const generate = (arr: Array<string>): Array<Cell> => (
  arr.map(symbol => ({ symbol, status: Status.Closed }))
)

// VIEW ============================================
type CellViewProps = {
  cell: Cell,
  onClick: (e: React.MouseEvent) => void
}

export const View: FC<CellViewProps> = ({ cell, onClick }) => {
  const { status, symbol } = cell

  return (
    <Styles.CellWrap onClick={onClick}>
      <Styles.BackSide status={status}>
        <Styles.Symbol>
          {symbol}
        </Styles.Symbol>
      </Styles.BackSide>
      <Styles.FrontSide status={status} />
    </Styles.CellWrap>
  )
}
