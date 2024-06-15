import Button from '@mui/material/Button';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';
import { RoutesPages } from '../../../pages/pages-types/pageTypes';

export default function ButtonRegister() {
  const navigate: NavigateFunction = useNavigate();

  const location = useLocation();

  const handleRegistrationClick = () => {
    navigate(RoutesPages.REGISTER);
  };
  return (
    <Button
      variant='outlined'
      color='inherit'
      className='registration-button'
      disabled={location.pathname === RoutesPages.REGISTER.toString()}
      onClick={handleRegistrationClick}
      endIcon={<HowToRegIcon />}
    >
      SIGN UP
    </Button>
  );
}
