import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'


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
    <ProgressWrap>
      <Track>
        <Progress width={progressValue}/>
      </Track>
    </ProgressWrap>
  )
}

const ProgressWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

const Track = styled.div`
  border-radius: 10px;
  background-color: #2A3C44;
  position: relative;
  height: 10px;
`
type ProgressPros = {
  width: number
}

const Progress = styled.div`
  border-radius: 10px;
  background-color: #FFC542;
  width: ${({ width }: ProgressPros): string => width + '%'};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  transition: .3s all ease-in-out;
`