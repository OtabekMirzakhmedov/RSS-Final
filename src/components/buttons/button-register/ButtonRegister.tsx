import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes } from '../../../pages/pages-types/pageTypes';

export default function ButtonRegister() {
  const navigate = useNavigate();

  const location = useLocation();

  const handleRegistrationClick = () => {
    navigate(Routes.REGISTER);
  };
  return (
    <Button
      variant='outlined'
      color='inherit'
      className='registration-button'
      disabled={location.pathname === Routes.REGISTER.toString()}
      onClick={handleRegistrationClick}
    >
      SIGN UP
    </Button>
  );
}
