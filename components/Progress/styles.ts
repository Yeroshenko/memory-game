import styled from 'styled-components'

type ProgressPros = {
  width: number
}

export const ProgressWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

export const Track = styled.div`
  border-radius: ${props => props.theme.borderRadiusMini};
  background-color: #2A3C44;
  position: relative;
  height: 10px;
  @media (max-width: 700px) {
    height: 6px;
    border-radius: 2px;
  }
`

export const Progress = styled.div`
  border-radius: ${props => props.theme.borderRadiusMini};
  background-color: ${props => props.theme.yellow};
  width: ${({ width }: ProgressPros): string => width + '%'};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  transition: .3s all ease-in-out;
`
