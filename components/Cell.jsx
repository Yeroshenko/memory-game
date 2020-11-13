import React from 'react'
import styled from 'styled-components'

// LOGIC ============================================
// cel = {
//   symbol: 'A',
//   status, Status.Open
// }

export const Status = {
  Open: 'Open',
  Closed: 'Closed',
  Done: 'Done',
  Failed: 'Failed'
}

export const isOpen = (cell) => cell.status === Status.Open
export const isClosed = (cell) => cell.status === Status.Closed
export const isDone = (cell) => cell.status === Status.Done
export const isFailed = (cell) => cell.status === Status.Failed
export const isBlocking = (cell) => isOpen(cell) || isFailed(cell)
export const generate = (arr) => arr.map(symbol => ({ symbol, status: Status.Closed }))

// VIEW ============================================
export const View = ({ cell, onClick }) => {
  const { status, symbol } = cell

  return (
    <Cell status={status} onClick={onClick}>
      {status === Status.Closed ? '' : symbol}
    </Cell>
  )
}

// ATOMS ============================================
const Cell = styled.div`
  font-size: 4rem;
  line-height: 1.1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  background-color: ${({ status }) => statusToBackground(status)};
  cursor: ${({ status }) => status === Status.Closed ? 'pointer' : 'auto'};
`

const statusToBackground = (status) => {
  switch (status) {
    case Status.Closed: return 'darkgray'
    case Status.Open:   return '#dcdcdc'
    case Status.Done:   return '#a8db8f'
    case Status.Failed: return '#db8f8f'
  }
}