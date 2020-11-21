import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`  
  body {
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 20px;
    line-height: 1.3;
  }
  
  * {
    outline: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  button {
    font-family: inherit;
  }
`
