import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const FooterComponent = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#4A90E2',
        color: 'white',
        padding: '5px 20px',
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        width: '100%'
      }}
    >
      <Typography variant="body2" gutterBottom>
        © {new Date().getFullYear()} Trang tuyển dụng. All rights reserved.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Liên hệ: <Link href="mailto:support@tuyendung.com" sx={{ color: 'white', textDecoration: 'underline' }}>
          support@tuyendung.com
        </Link> | Số điện thoại: 0123-456-789
      </Typography>
      <Box sx={{ marginTop: 1 }}>
        <Link href="https://facebook.com" target="_blank" sx={{ color: 'white', margin: '0 10px' }}>
          Facebook
        </Link>
        <Link href="https://linkedin.com" target="_blank" sx={{ color: 'white', margin: '0 10px' }}>
          LinkedIn
        </Link>
        <Link href="https://twitter.com" target="_blank" sx={{ color: 'white', margin: '0 10px' }}>
          Twitter
        </Link>
      </Box>
    </Box>
  );
};

export default FooterComponent;