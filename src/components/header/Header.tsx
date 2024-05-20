/* eslint-disable no-console */
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '../../service/AuthenticationService';
import './header.scss';

function Header() {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem('token') !== null;

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
        console.error('Error logging out:', error);
      });
  };

  return (
    <AppBar position='static' className='app-bar'>
      <Toolbar>
        <Typography variant='h4' component='div' className='title' onClick={handleLogoClick}>
          HardBooks
        </Typography>
        <Box className='button-box'>
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
                Registration
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
