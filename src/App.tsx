import CssBaseline from '@mui/material/CssBaseline'

import AppContent from '~/containers/app-content/AppContent'
import { ThemeProvider } from '@mui/material'
import { theme } from '~/styles/app-theme/custom-mui.styles'

const App = () => {
  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  )
}

export default App
