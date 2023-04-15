import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { styles } from '~/containers/footer/Footer.styles'

const Footer = () => {
  return (
    <Box sx={ styles.footer }>
      <Container sx={ styles.container }>
        <Typography color='primary.50' variant='caption'>
          { 'All Rights Reserved' }
        </Typography>
        <Box sx={ styles.links }>
          <Typography variant='caption'>
            { 'Privacy policy' }
          </Typography>
          <Typography variant='caption'>
            { 'Term of use' }
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
