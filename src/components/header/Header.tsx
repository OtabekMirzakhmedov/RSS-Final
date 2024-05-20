import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import './header.scss';

function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegistrationClick = () => {
    navigate('/create-account');
  };
  return (
    <AppBar position='static' className='app-bar'>
      <Toolbar>
        <Typography variant='h4' component='div' className='title' onClick={handleLogoClick}>
          HardBooks
        </Typography>
        <Box className='button-box'>
          <Button variant='contained' color='success' onClick={handleLoginClick}>
            Login
          </Button>
          <Button
            variant='outlined'
            color='inherit'
            className='registration-button'
            onClick={handleRegistrationClick}
          >
            Registration
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
