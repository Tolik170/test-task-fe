import { createTheme } from '@mui/material/styles'

import palette from '~/styles/app-theme/app-palette'
import { textField } from '~/styles/app-theme/app.textfield'
import appTypography from '~/styles/app-theme/app.typography'
import button from '~/styles/app-theme/app.button'

export const theme = createTheme({
  palette,
  typography: appTypography,
  components: {
    MuiTextField: textField,
    MuiButton: button

  }
})
