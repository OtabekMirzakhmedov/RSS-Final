import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ButtonLogin from '../buttons/button-login/ButtonLogin';
import ButtonRegister from '../buttons/button-register/ButtonRegister';
import ButtonLogout from '../buttons/button-logout/ButtonLogout';
import ButtonCatalog from '../buttons/button-catalog/ButtonCatalog';
import './header.scss';
import ButtonProfile from '../buttons/button-profile/ButtonProfile';
import ButtonAbout from '../buttons/button-about/ButtonAbout';
import ButtonBasket from '../buttons/button-basket/ButtonBasket';

function Header() {
  const navigate: NavigateFunction = useNavigate();
  const isLoggedin = localStorage.getItem('token') !== null;
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppBar position='static' className='app-bar'>
      <Toolbar className='toolbar'>
        <Typography variant='h4' component='div' className='title' onClick={handleLogoClick}>
          HardBooks
        </Typography>
        <Box className='button-box' sx={{ display: { xs: 'none', md: 'flex' } }}>
          <ButtonAbout />
          {isLoggedin ? (
            <>
              <ButtonCatalog />
              <ButtonProfile />
              <ButtonLogout />
            </>
          ) : (
            <>
              <ButtonCatalog />
              <ButtonLogin />
              <ButtonRegister />
            </>
          )}
          <ButtonBasket />
        </Box>
        <IconButton
          className='burger'
          edge='end'
          color='inherit'
          aria-label='menu'
          sx={{ display: { xs: 'flex', md: 'none' } }}
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <IconButton onClick={() => setIsDrawerOpen(false)}>
          <ChevronRightIcon />
        </IconButton>
        <List>
          <ListItem>
            <ButtonAbout />
          </ListItem>
          {isLoggedin ? (
            <>
              <ListItem>
                <ButtonCatalog />
              </ListItem>
              <ListItem>
                <ButtonLogout />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem>
                <ButtonCatalog />
              </ListItem>
              <ListItem>
                <ButtonLogin />
              </ListItem>
              <ListItem>
                <ButtonRegister />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;
