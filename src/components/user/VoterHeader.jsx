import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import HeaderIcon from '../../assets/header.svg'

function VoterHeader() {
  const matches = useMediaQuery('(min-width:1350px)')
  return (
    <Box
      sx={{
        height: 188,
        position: 'fixed', // Set to fixed position
        top: 0, // Align to top
        left: 0,
        width: '100%', // Full width
        zIndex: 1000, // Ensure it stays above other elements
        display: { xs: 'none', sm: 'block' },
        marginTop: { sm: -17, md: -14, lg: -12 },
        backgroundImage: `url(${HeaderIcon})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '105% 188px',
        backgroundPosition: 'center',
        background: matches
          ? 'linear-gradient(91.15deg, #003366 4.41%, #003366 99.86%)'
          : '',
        borderRadius: matches ? '0 0 40px 40px' : '',
        marginLeft: matches ? 0 : -3.5,
        marginBottom: 2
      }}
    />
  )
}

export default VoterHeader
