import React from 'react';
import { Box, Link, BottomNavigation, Typography } from '@mui/material';
import '../../styles/VoterFooter.css';

function VoterFooter() {
  return (
    <div className="footer-container">
      <BottomNavigation
        sx={{
          background: 'transparent',
        }}
        showLabels>
        <Typography>©2024</Typography>
        <Link href="https://multivendor.ninjascode.com/" target="_blank" underline="none">
          MZANSI
        </Link>
        <Link href="https://ninjascode.com/pages/ourteam.html" target="_blank" underline="none">
          About Us
        </Link>
        <Link href="https://medium.com/@sharangohar" target="_blank" underline="none">
          Blog
        </Link>
      </BottomNavigation>
    </div>
  );
}

export default VoterFooter;
