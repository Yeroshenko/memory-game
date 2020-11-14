import React, { FC } from 'react'
import styled from "styled-components"

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
    <CellItem status={status} onClick={onClick}>
      {status === Status.Closed ? '' : symbol}
    </CellItem>
  )
}

// ATOMS ============================================
type CellItemProps = {
  status: Status
}

const CellItem = styled.div`
  font-size: 4rem;
  line-height: 1.1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  background-color: ${({ status }: CellItemProps): string => statusToBackground(status)};
  cursor: ${({ status }: CellItemProps): string => status === Status.Closed ? 'pointer' : 'auto'};
`

const statusToBackground = (status: Status) => {
  switch (status) {
    case Status.Closed:
      return 'darkgray'
    case Status.Open:
      return '#dcdcdc'
    case Status.Done:
      return '#a8db8f'
    case Status.Failed:
      return '#db8f8f'
  }
}