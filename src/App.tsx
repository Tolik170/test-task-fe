import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'

import AppContent from '~/containers/app-content/AppContent'
import { SnackBarProvider } from './context/snackbar-context'
import { AuthContextProvider } from './context/auth-context'

import { theme } from '~/styles/app-theme/custom-mui.styles'

const App = () => {
  return (
    <ThemeProvider theme={ theme }>
      <AuthContextProvider>
        <SnackBarProvider>
          <CssBaseline />
          <AppContent />
        </SnackBarProvider>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
