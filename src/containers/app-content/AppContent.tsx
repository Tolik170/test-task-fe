import Box from '@mui/material/Box'
import AppHeader from '~/containers/app-header/AppHeader'
import AppMain from '~/containers/app-main/AppMain'
import Footer from '~/containers/footer/Footer'
import { styles } from '~/containers/app-content/AppContent.styles'

const AppContent = () => {
  return (
    <Box sx={ styles.content }>
      <AppHeader />
      <AppMain />
      <Footer /> 
    </Box>
  )
}

export default AppContent
