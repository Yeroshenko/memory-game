import React, { FC, Fragment } from 'react'
import type { AppProps } from 'next/app'

import { GlobalStyles } from "../styles/globalStyles"
import 'reset-css/reset.css'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Fragment>
    <GlobalStyles/>
    <div id='root'>
      <Component {...pageProps} />
    </div>
  </Fragment>
)

export default App