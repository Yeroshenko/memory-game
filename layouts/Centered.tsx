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
  min-height: 100vh;
  max-width: 100%;
  padding: 0 15px;
  background-color: ${props => props.theme.bg};
`
