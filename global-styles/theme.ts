export const theme = {

  // Colors
  bg: '#22343C',
  done: '#40DD9D',
  failed: '#FF565E',
  closed: '#30444E',
  open: '#96A7AF',
  typographyWhite: '#FFF',

  // Sizes
  borderRadius: '25px',
  boxShadow: '0px 1px 14px #19282F',

  // Board
  board: {
    width: '670px',
    height: '500px',
    gap: '10px',

    won: '#40dd9d',
    lost: '#FF565E',
    default: '#96A7AF'
  }
}

export type themeType = typeof theme
