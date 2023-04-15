import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Navbar from '~/containers/navbar/Navbar'
import { mainShadow } from '~/styles/app-theme/custom-shadows'

const AppHeader = () => {
  return (
    <>
      <AppBar sx={ { boxShadow: mainShadow, px: '50px' } }>
        <Navbar />
      </AppBar>
      <Toolbar sx={ { height: { xs: '56px', sm: '72px', md: '80px' } } } />
    </>
  )
}

export default AppHeader
