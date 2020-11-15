import styled from 'styled-components'

export const GameView = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin: auto;
`

export const StatusLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
  margin-bottom: 8px;
  font-size: 28px;
  color: ${props => props.theme.typographyWhite};
`

export const InfoBlock = styled.div`
  text-align: center;
`

export const Title = styled.h1`
  font-weight: bold;
  font-size: 60px;
  color: ${props => props.theme.typographyWhite};
  margin-bottom: 24px;
`

export const Description = styled.div`
  font-size: 48px;
  color: ${props => props.theme.typographyWhite};
`