import styled from 'styled-components'

const selectItemHeight = '58px'
const selectItemFontSize = '24px'
const selectItemPadding = '13px 20px 12px 28px'
const selectItemActive = 'rgba(150, 167, 175, 0.25)'
const selectItemHover = 'rgba(150, 167, 175, 0.15)'

export const Container = styled.div`
  position: relative;
  min-width: 350px;
  display: block;
`

export const Button = styled.button`
  width: 100%;
  height: ${selectItemHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: ${selectItemFontSize};
  color: ${props => props.theme.typographyDark};
  padding: ${selectItemPadding};
  border: none;
  border-radius: ${props => props.theme.borderRadiusMini};
  background: ${props => props.theme.white};
  box-shadow: ${props => props.theme.shadows.white};
  transition: .3s all ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: ${props => props.theme.shadows.hover.white};
  }
`

type ButtonArrowProps = { isOpen: boolean }

export const ButtonArrow = styled.div`
  transition: .3s all ease-in-out;
  transform: ${({ isOpen }: ButtonArrowProps): string => isOpen ? 'rotate(180deg)' : 'rotate(0)'};
`

type ListProps = {
  visible: boolean
}

export const List = styled.ul`
  display: ${({ visible }: ListProps): string => visible ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  top: 66px;
  left: 0;
  right: 0;
  padding: 8px 0;
  border-radius: ${props => props.theme.borderRadiusMini};
  background: ${props => props.theme.white};
  box-shadow: ${props => props.theme.shadows.white};
  overflow: hidden;
  list-style: none;
  
`

type OptionProps = {
  isActive: boolean
}

export const Option = styled.li`
  display: flex;
  align-items: center;
  height: ${selectItemHeight};
  padding: ${selectItemPadding};
  font-size: ${selectItemFontSize};
  transition: .2s all ease;
  font-weight: bold;
  color: ${props => props.theme.typographyDark};
  background: ${({ isActive }: OptionProps): string => isActive ? selectItemActive : 'transparent'};
  cursor: pointer;
  &:hover {
    background-color: ${selectItemHover};
  }
`
