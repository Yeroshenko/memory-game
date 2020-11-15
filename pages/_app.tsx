import React, { FC, Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'
import 'reset-css/reset.css'

import { GlobalStyles, theme } from 'global-styles'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Fragment>
    <GlobalStyles/>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </Fragment>
)

export default App
