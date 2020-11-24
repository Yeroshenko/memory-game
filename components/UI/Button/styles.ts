import styled from 'styled-components'
import { themeType } from 'global-styles'

type ButtonProps = {
  styleType: 'primary' | 'default',
  theme: themeType,
  isIcon: boolean
}

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  min-width: ${(props: ButtonProps) => props.isIcon ? 'auto': '300px'};
  width: ${(props: ButtonProps) => props.isIcon ? '58px': 'auto'};
  height: 58px;
  font-size: ${(props: ButtonProps) => props.isIcon ? '26px': '24px'};
  color: ${props => props.theme.typographyWhite};
  border: none;
  border-radius: ${props => props.theme.borderRadiusMini};
  box-shadow: ${(props: ButtonProps) => typeToBoxShadow(props.styleType, props.theme)};
  background: ${(props: ButtonProps) => typeToBackground(props.styleType, props.theme)};
  cursor: pointer;
  transition: .3s all ease-in-out;
  
  &:hover {
    box-shadow: ${(props: ButtonProps) => typeToHoverBoxShadow(props.styleType, props.theme)};
  }
  
  svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
`

const typeToBackground = (type: 'primary' | 'default', theme: themeType): string => {
  switch (type) {
    case 'primary':
      return theme.gradients.green

    default:
      return theme.gradients.blue
  }
}

const typeToBoxShadow = (type: 'primary' | 'default', theme: themeType): string => {
  switch (type) {
    case 'primary':
      return theme.shadows.green

    default:
      return theme.shadows.blue
  }
}

const typeToHoverBoxShadow = (type: 'primary' | 'default', theme: themeType): string => {
  switch (type) {
    case 'primary':
      return theme.shadows.hover.green

    default:
      return theme.shadows.hover.blue
  }
}