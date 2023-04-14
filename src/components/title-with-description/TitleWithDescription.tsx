import { Box, SxProps, Typography } from '@mui/material'
import { FC } from 'react'

interface TitleWithDescriptionProps {
  title?: string
  description?: string
  sx?: {
    [key: string]: SxProps
  }
}

const TitleWithDescription: FC<TitleWithDescriptionProps> = ({
  title,
  description,
  sx = {}
}) => {
  return (
    <Box sx={ sx.container }>
      <Typography sx={ sx.title }>
        { title }
      </Typography>
      <Typography sx={ sx.description }>
        { description }
      </Typography>
    </Box>
  )
}

export default TitleWithDescription
