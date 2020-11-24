export const theme = {

  // Colors
  bg: '#1F2E35',
  done: '#40DD9D',
  failed: '#FF565E',
  closed: '#30444E',
  open: '#96A7AF',
  white: '#FFF',
  yellow: '#FFC542',

  typographyWhite: '#FFF',
  typographyDark: '#22343C',

  // Sizes
  borderRadius: '24px',
  borderRadiusMedium: '16px',
  borderRadiusMini: '12px',

  shadows: {
    main: '0 1px 8px rgba(25, 40, 47, 0.6)',
    white: '0 2px 4px rgba(255, 255, 255, 0.3)',
    green: '0 2px 4px rgba(15, 218, 137, 0.3)',
    blue: '0 2px 4px rgba(0, 98, 255, 0.3)',
    hover: {
      white: '0 0 8px 4px rgba(255, 255, 255, 0.3)',
      green: '0 0 8px 4px rgba(15, 218, 137, 0.3)',
      blue: '0 0 8px 4px rgba(0, 98, 255, 0.3)',
    }
  },

  gradients: {
    green: 'linear-gradient(180deg, #40DF9F 0%, #3ED598 100%)',
    blue: 'linear-gradient(180deg, #337DF2 5.17%, #0062FF 100%)'
  },

  board: {
    width: '670px',
    height: '500px',
    gap: '10px',

    won: 'linear-gradient(138.13deg, #22343C 25.87%, #1F2E35 100%)',
    lost: 'linear-gradient(138.13deg, #22343C 25.87%, #1F2E35 100%)',
    default: 'linear-gradient(138.13deg, #2A3C44 25.75%, #23343C 100%)'

  },

  githubCorner: {
    size: '120',
    bg: '#475E69',
  }
}

export type themeType = typeof theme
