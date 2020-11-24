import styled from 'styled-components'

export const GameView = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin: auto;
  @media (max-width: 700px) {
    width: 100%;
  }
`

export const StatusLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
  margin-bottom: 8px;
  font-size: 28px;
  color: ${props => props.theme.typographyWhite};
  @media (max-width: 700px) {
    font-size: 20px;
  }
`

export const InfoBlock = styled.div`
  text-align: center;
  
  @media (max-width: 700px) {
    width: 100%;
    max-width: 400px;
  }
  @media (max-width: 576px) {
    max-width: 300px;
  }
`

export const ButtonsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 132px;
  @media (max-width: 700px) {
    flex-direction: column;
    button {
      min-width: 100%;
    }
  }
`

export const Title = styled.h1`
  font-weight: bold;
  font-size: 60px;
  color: ${props => props.theme.typographyWhite};
  margin-bottom: 24px;
  @media (max-width: 700px) {
    font-size: 42px;  
  }
`
export const WelcomeTitle = styled(Title)`
  margin-bottom: 60px;
  @media (max-width: 700px) {
    margin-bottom: 48px;
  }
`

export const SelectWrap = styled.div`
  margin-bottom: 92px;
  @media (max-width: 700px) {
    margin-bottom: 42px;
  }
`

export const Description = styled.div`
  font-size: 48px;
  color: ${props => props.theme.typographyWhite};
`
