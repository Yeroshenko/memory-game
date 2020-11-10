import React from 'react'

import '../styles/globals.css'
import '../styles/index.css'

export default function App({ Component, pageProps }) {
  return (
    <div id='root'>
      <Component {...pageProps} />
    </div>
  )
}
