import {
  Link,
} from 'react-router-dom';

import { Nav } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { UserContext } from './UserContext.jsx';

const cookies = new Cookies();

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  console.log(user);

  const handleLogoutClick = () => {
    cookies.remove('token', {});
    setUser([]);
    setAnchorElUser(null);
  };
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
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleOpenNavMenu}
          sx={{ mr: 2 }}
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
          // sx={{
          //   display: { xs: 'block', md: 'none' },
          // }}
        >
          <MenuItem key="Home" onClick={handleCloseNavMenu}>
            <Nav.Link as={Link} to="/">
              <Typography component="span" textAlign="center">Home</Typography>
            </Nav.Link>
          </MenuItem>

          {user.accountType !== 'client' && user.length !== 0 && (
          <MenuItem key="Dashboard" onClick={handleCloseNavMenu}>
            <Nav.Link as={Link} to="/dashboard">
              <Typography textAlign="center">Dashboard</Typography>
            </Nav.Link>
          </MenuItem>
          )}

          <MenuItem key="Search" onClick={handleCloseNavMenu}>
            <Nav.Link as={Link} to="/search">
              <Typography textAlign="center">Search</Typography>
            </Nav.Link>
          </MenuItem>

          {user.accountType === 'manager' && (
          <MenuItem key="DocuSein" onClick={handleCloseNavMenu}>
            <Nav.Link as={Link} to="/fakeDocusign">
              <Typography textAlign="center">DocuSein</Typography>
            </Nav.Link>
          </MenuItem>
          )}

          {user.accountType === 'client' && (
          <MenuItem key="DocuSein" onClick={handleCloseNavMenu}>
            <Nav.Link as={Link} to="/fakeDocusign">
              <Typography textAlign="center">DocuSein</Typography>
            </Nav.Link>
          </MenuItem>
          )}
        </Menu>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Full Stack Otter
        </Typography>
        <div>
          <Tooltip title="User Settings">
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
            <>
              <Box sx={{ my: 1.5, px: 2.5 }}>
                <Typography variant="subtitle2" noWrap>
                  {user.username}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {user.name}
                </Typography>
              </Box>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <MenuItem key="profile" onClick={handleCloseUserMenu}>
                <Nav.Link as={Link} to="/profile">
                  <Typography textAlign="center" as={Link} to="/profile">
                    Profile
                  </Typography>
                </Nav.Link>
              </MenuItem>
              <MenuItem key="logout" onClick={handleLogoutClick}>
                {/* <Nav.Link as={Link} to="/logout"> */}
                <Typography textAlign="center">
                  Logout
                </Typography>
                {/* </Nav.Link> */}
              </MenuItem>
            </>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
