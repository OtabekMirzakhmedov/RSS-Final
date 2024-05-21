import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '../../service/AuthenticationService';
import './header.scss';

function Header() {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem('token') !== null;
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegistrationClick = () => {
    navigate('/create-account');
  };

  const location = useLocation();

  const handleLogoutClick = () => {
    localStorage.clear();
    getAccessToken()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        throw new Error(`Error logging out: ${error}`);
      });
  };

  return (
    <AppBar position='static' className='app-bar'>
      <Toolbar>
        <Typography variant='h4' component='div' className='title' onClick={handleLogoClick}>
          HardBooks
        </Typography>
        <Box className='button-box' sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {isLoggedin ? (
            <Button variant='contained' color='error' onClick={handleLogoutClick}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant='contained'
                color='success'
                disabled={location.pathname === '/login'}
                onClick={handleLoginClick}
              >
                Login
              </Button>
              <Button
                variant='outlined'
                color='inherit'
                className='registration-button'
                disabled={location.pathname === '/create-account'}
                onClick={handleRegistrationClick}
              >
                Register
              </Button>
            </>
          )}
        </Box>
        <IconButton
          className='burger'
          edge='end'
          color='inherit'
          aria-label='menu'
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{ display: { xs: 'flex', sm: 'none' } }}
      >
        <IconButton onClick={() => setIsDrawerOpen(false)}>
          <ChevronRightIcon />
        </IconButton>
        <List>
          {isLoggedin ? (
            <ListItem>
              <Button variant='contained' color='error' onClick={handleLogoutClick}>
                Logout
              </Button>
            </ListItem>
          ) : (
            <>
              <ListItem>
                <Button
                  variant='contained'
                  color='success'
                  disabled={location.pathname === '/login'}
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  variant='outlined'
                  color='inherit'
                  className='registration-button'
                  disabled={location.pathname === '/create-account'}
                  onClick={handleRegistrationClick}
                >
                  Register
                </Button>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;
