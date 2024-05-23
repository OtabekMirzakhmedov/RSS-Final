import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ButtonRegister() {
  const navigate = useNavigate();

  const location = useLocation();

  const handleRegistrationClick = () => {
    navigate('/create-account');
  };
  return (
    <Button
      variant='outlined'
      color='inherit'
      className='registration-button'
      disabled={location.pathname === '/create-account'}
      onClick={handleRegistrationClick}
    >
      Register
    </Button>
  );
}
