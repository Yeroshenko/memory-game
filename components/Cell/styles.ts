import styled from 'styled-components'

import { themeType } from 'global-styles'
import { Status } from './index'

type CellProps = {
  status: Status
}


export const CellWrap = styled.div`
  position: relative;
  justify-self: stretch;
  min-height: 120px;
  perspective: 1000px;
  color: ${props => props.theme.typographyWhite};
  border-radius: ${props => props.theme.borderRadius};
`

const CommonToSide = styled.div`
  height: 100%;
  border-radius: inherit;
  font-size: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 100%;
  transition: all 1s cubic-bezier(.5,1.3,.5,1.3);
  transform-style: preserve-3d;
  box-shadow: ${props => props.theme.boxShadow};

`

export const FrontSide = styled(CommonToSide)`  
  background-color: ${props => props.theme.closed};
  transform: ${({ status }: CellProps): string => status === Status.Closed ? 'rotateY(0deg)' : 'rotateY(180deg)'};
  z-index: ${({ status }: CellProps): string => status === Status.Closed ? '10' : '-1'};
  cursor: pointer;

`

export const BackSide = styled(CommonToSide)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: ${props => statusToBackSideBackground(props.status, props.theme)};
  transform: ${({ status }: CellProps): string => status === Status.Closed ? 'rotateY(-180deg)' : 'rotateY(0deg)'};
  z-index: ${({ status }: CellProps): string => status === Status.Closed ? '-1' : '10'};

`

export const Symbol = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: translateZ(10px);
    user-select: none;
`

const statusToBackSideBackground = (status: Status, theme: themeType): string => {
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