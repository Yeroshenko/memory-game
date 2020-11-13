import React, { Fragment } from 'react'

import { GlobalStyles } from "../styles/globalStyles"
import 'reset-css/reset.css'

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <GlobalStyles/>
      <div id='root'>
        <Component {...pageProps} />
      </div>
    </Fragment>
  )
}
