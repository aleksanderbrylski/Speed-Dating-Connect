// src/Header.tsx
import HeartBroken from '@mui/icons-material/HeartBroken';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';

const CustomAppBar = styled(AppBar)({
  borderBottom: '1px solid #E5E8EB',
  backgroundColor: '#FFFFFF', // optional: set background color to white
});

const Header: React.FC = () => {
  return (
    <Box sx={{ width: '100vw' }}>
      <CustomAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
            href={'/'}
          >
            <HeartBroken />
          </IconButton>
          <Typography variant="h6" component="div" style={{ verticalAlign: 'middle' }} sx={{ flexGrow: 1 }}>
            Speed Date
          </Typography>
        </Toolbar>
      </CustomAppBar>
    </Box>
  );
};

export default Header;