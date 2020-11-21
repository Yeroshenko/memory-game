import styled from 'styled-components'

type BoardItemProps = {
  grid: { cols: number, rows: number }
}

export const BoardItem = styled.div`
  display: grid;
  grid-template-columns: ${({ grid }: BoardItemProps) => `repeat(${grid.cols}, 1fr)`};
  grid-template-rows: ${({ grid }: BoardItemProps) => `repeat(${grid.rows}, 1fr)`};
  width: ${props => props.theme.board.width};
  height: ${props => props.theme.board.height};
  gap: ${props => props.theme.board.gap};
`

export const Screen = styled.div`
  display: flex;
  width: ${props => props.theme.board.width};
  height: ${props => props.theme.board.height};
  align-items: center;
  justify-content: center;
  background: ${(props: { background: string }): string => props.background};
  border-radius: ${props => props.theme.borderRadius};
`
