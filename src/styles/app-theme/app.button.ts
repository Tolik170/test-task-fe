import palette from './app-palette'

const button = {
  styleOverrides: {
    root: {
      lineHeight: '20px',
      fontSize: '14px',
      opacity: '1'
    },
    sizeSmall: {
      fontSize: '12px',
      padding: '6px 16px'
    },
    sizeMedium: {
      padding: '10px 24px'
    },
    sizeLarge: {
      padding: '12px 24px',
      fontSize: '16px'
    },
    contained: {
      backgroundColor: palette.primary[900],
      color: palette.primary[50]
    }
  }
}

export default button
