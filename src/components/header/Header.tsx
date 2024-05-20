import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './header.scss';

function Header() {
  return (
    <AppBar position='static' className='app-bar'>
      <Toolbar>
        <Typography variant='h4' component='div' className='title'>
          HardBooks
        </Typography>
        <Box className='button-box'>
          <Button variant='contained' color='success'>
            Login
          </Button>
          <Button variant='outlined' color='inherit' className='registration-button'>
            Registration
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
