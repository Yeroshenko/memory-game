import React, { FC, ReactNode } from 'react'

import * as Styles from './styles'

type ButtonType = {
  onClick: () => void
  type?: 'primary' | 'default',
  icon?: ReactNode
}

export const Button: FC<ButtonType> = ({ children, type = 'default', icon, onClick }) => (
  <Styles.Button onClick={onClick} styleType={type} isIcon={!!icon}>
    {icon ? icon : children}
  </Styles.Button>
)
