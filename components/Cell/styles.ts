import styled from 'styled-components'
import { themeType } from '../../global-styles'
import { Status } from './index'

type CellItemProps = {
  status: Status
}

export const CellItem = styled.div`
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