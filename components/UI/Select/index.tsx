import React, { CSSProperties, FC, useState } from 'react'
import isEqual from 'lodash.isequal'

import * as Hooks from 'hooks'
import * as Styles from './styles'
import SelectArrow from '../../../assets/icons/down-arrow.svg'

// LOGIC ============================================
type OptionValue = string | number | object

type Option = {
  label: string,
  value: OptionValue
}

type SelectProps = {
  options: Array<Option>
  defaultValue?: Option
  onChange: (value: OptionValue) => void
  style?: CSSProperties
}

// VIEW ============================================
export const Select: FC<SelectProps> = ({ options, defaultValue, onChange, style }) => {
  const [listVisible, setListVisible] = useState(false)
  const [currentValue, setCurrentValue] = useState(defaultValue || options[0])

  const toggleVisibleList = () => setListVisible(!listVisible)
  const hideList = () => setListVisible(false)

  const handleOptionClick = (value: Option) => {
    if (!isEqual(value, currentValue)) {
      setCurrentValue(value)
      onChange(value)
    }

    toggleVisibleList()
  }

  const containerRef = Hooks.useClickOutside(hideList)

  return (
    <Styles.Container ref={containerRef} style={style}>
      <Styles.Button onClick={toggleVisibleList}>
        {currentValue.label}
        <Styles.ButtonArrow isOpen={listVisible}>
          <SelectArrow/>
        </Styles.ButtonArrow>
      </Styles.Button>
      <Styles.List visible={listVisible}>
        {options.map((option, i) =>
          <Styles.Option
            key={i}
            isActive={isEqual(option, currentValue)}
            onClick={handleOptionClick.bind(this, option,)}
          >
            {option.label}
          </Styles.Option>
        )}
      </Styles.List>
    </Styles.Container>
  )
}
