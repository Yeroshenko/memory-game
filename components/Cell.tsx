import React, { FC } from 'react'
import styled from 'styled-components'

import { themeType } from '../styles'

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
  justify-self: stretch;
  min-height: 120px;
  color: ${props => props.theme.typographyWhite};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => statusToBackground(props.status, props.theme)};
  cursor: ${({ status }: CellItemProps): string => status === Status.Closed ? 'pointer' : 'auto'};
`

const statusToBackground = (status: Status, theme: themeType) => {
  switch (status) {
    case Status.Closed:
      return theme.closed
    case Status.Open:
      return theme.open
    case Status.Done:
      return theme.done
    case Status.Failed:
      return theme.failed
  }
}