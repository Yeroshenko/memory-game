import React, { FC, useEffect, useState } from 'react'

import * as Styles from './styles'

// VIEW ============================================
type ProgressViewProps = {
  timeLimit: number
  secondLeft: number
}

export const View: FC<ProgressViewProps> = ({ timeLimit, secondLeft }) => {
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    setProgressValue(100 - (secondLeft / timeLimit * 100))
  }, [timeLimit, secondLeft])

  return (
    <Styles.ProgressWrap>
      <Styles.Track>
        <Styles.Progress width={progressValue}/>
      </Styles.Track>
    </Styles.ProgressWrap>
  )
}
