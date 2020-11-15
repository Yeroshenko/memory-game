import React, { FC } from 'react'

import * as Game from 'components/Game'
import { Centered } from 'layouts/Centered'

const MainPage: FC = () => (
  <Centered>
    <Game.View/>
  </Centered>
)

export default MainPage
