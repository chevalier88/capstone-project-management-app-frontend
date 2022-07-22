import {
  Link,
} from 'react-router-dom';

import { Nav } from 'react-bootstrap';

import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from './UserContext.jsx';

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  console.log(user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              sx={{ marginRight: '1em', height: 40 }}
              src="https://img.freepik.com/free-vector/face-cute-otter-logo-design-vector-graphic-symbol-icon-sign-illustration-creative-idea_15473-10082.jpg?w=2000"
              alt="Bosch Logo"
              to="/"
            />
            <Typography component="span" variant="h5">
              Full-Stack Otter
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key="Home" onClick={handleCloseNavMenu}>
                <Nav.Link as={Link} to="/">
                  <Typography textAlign="center">Home</Typography>
                </Nav.Link>
              </MenuItem>
              <MenuItem key="Dashboard" onClick={handleCloseNavMenu}>
                <Nav.Link as={Link} to="/dashboard">
                  <Typography textAlign="center">Dashboard</Typography>
                </Nav.Link>
              </MenuItem>
              <MenuItem key="Search" onClick={handleCloseNavMenu}>
                <Nav.Link as={Link} to="/search">
                  <Typography textAlign="center">Search</Typography>
                </Nav.Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          />
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                as={Link}
                to="/request"
                key="New Request"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                New Request
              </Button>
              <Button
                as={Link}
                to="/requests"
                key="View All Requests"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                View All Requests
              </Button>
            </Box> */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Login/LogOut">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src={user.profilePhoto} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user.length === 0
              && (
              <MenuItem key="login" onClick={handleCloseUserMenu}>
                <Nav.Link as={Link} to="/login">
                  <Typography textAlign="center" as={Link} to="/login">
                    Login
                  </Typography>
                </Nav.Link>
              </MenuItem>
              )}
              {user.length !== 0 && (
                <MenuItem key="logout" onClick={handleCloseUserMenu}>
                  <Nav.Link as={Link} to="/logout">
                    <Typography textAlign="center" as={Link} to="/login">
                      Logout
                    </Typography>
                  </Nav.Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  );
}
