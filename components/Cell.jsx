import React from 'react'
import cn from 'classnames'

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
    <div className={cn('cell', classByStatus(status))} onClick={onClick}>
      {status === Status.Closed ? '' : symbol}
    </div>
  )
}

export const classByStatus = (status) => status.toLowerCase()