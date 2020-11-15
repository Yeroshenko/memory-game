import styled from 'styled-components'

export const BoardItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: ${props => props.theme.board.width};
  height: ${props => props.theme.board.height};
  gap: ${props => props.theme.board.gap};
`

export const Screen = styled.div`
  text-align: center;
  display: flex;
  width: ${props => props.theme.board.width};
  height: ${props => props.theme.board.height};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props: { background: string }): string => props.background};
  border-radius: ${props => props.theme.borderRadius};
`
