import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import FullscreenExit from '@mui/icons-material/FullscreenExit';

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
</style>

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{ background: '#30406F' }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FullscreenExit sx={{ display : 'flex', mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'Inter',
              fontWeight: 600,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HTML Escape
          </Typography>          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
