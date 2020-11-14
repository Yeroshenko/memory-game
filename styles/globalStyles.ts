import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    overflow: hidden;
    background-color: #E1F1FF;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 20px;
    line-height: 1.5;
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -25px;
  }
`