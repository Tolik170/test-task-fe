import { Link } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { routesPath } from '~/routes/routesPath'
import { styles } from '~/containers/navbar/Navbar.styles'
import { Button } from '@mui/material'

const Navbar = () => {
  const navigationItems = Object.values(routesPath.navBar)

  const navigationList = navigationItems.map((item) => {
    return (
      <Button
        component={ Link } key={ item.label } 
        size='small' sx={ styles.navItemText } to={ item.route }
        variant='contained'
      >
        { item.label }
      </Button>
    )
  })

  return (
    <Box sx={ styles.header }>
      <Typography
        component={ Link } sx={ styles.logoButton } to={ routesPath.home.route }
        variant='body1'
      >
        { 'Home' }
      </Typography>

      <Box sx={ styles.navList }>
        { navigationList }
      </Box>
    </Box>
  )
}

export default Navbar
