import React, { FC } from 'react'
import styled from 'styled-components'

export const Centered: FC = ({ children }) => (
  <CenteredLayout>
    {children}
  </CenteredLayout>
)

const CenteredLayout = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100vh;
  min-height: 568px;
  max-width: 100%;
  padding: 0 15px;
  background-color: ${props => props.theme.bg};
  @media (max-width: 360px) {
    padding: 0 5px;
  }
`
