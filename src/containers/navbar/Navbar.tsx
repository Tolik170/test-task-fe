import { useContext } from 'react'
import Box from '@mui/material/Box'
import { Link } from '@mui/material'

import { AuthContext } from '~/context/auth-context'
import { SnackBarContext } from '~/context/snackbar-context'
import { AuthService } from '~/services/auth-service'

import { AuthContextInterface, SnackBarContextInterface } from '~/types'
import { routesPath } from '~/routes/routesPath'
import { styles } from '~/containers/navbar/Navbar.styles'
import { snackbarVariants } from '~/constants/constants'

const Navbar = () => {
  const { setAlert } = useContext(SnackBarContext) as SnackBarContextInterface
  const { currentUser, setCurrentUser } = useContext(AuthContext) as AuthContextInterface

  const logoutUser = async () => {
    try {
      await AuthService.logout()
      setCurrentUser(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setAlert({
        severity: snackbarVariants.error,
        message: e.response.data.message
      })
    }
  }

  const navigationItems = Object.values(routesPath.navBar)

  const navigationList = navigationItems.map((item) => {
    return (
      <Link
        href={ item.route } key={ item.label } sx={ styles.navItemText }
        variant='subtitle2'
      >
        { item.label }
      </Link>
    )
  })

  const logoutLink = (
    <Link
      href={ routesPath.navBar.login.route }
      onClick={ logoutUser }
      sx={ styles.navItemText }
      variant='subtitle2'
    >
      { 'Logout' }
    </Link>
  )

  return (
    <Box sx={ styles.header }>
      <Link href={ routesPath.home.route } sx={ styles.logoButton } variant='subtitle2'>
        { 'Home' }
      </Link>

      <Box sx={ styles.navList }>
        { currentUser ? logoutLink : navigationList }
      </Box>
    </Box>
  )
}

export default Navbar
