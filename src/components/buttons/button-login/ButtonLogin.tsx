import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ButtonLogin() {
  const navigate = useNavigate();

  const location = useLocation();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Button
      variant='contained'
      color='success'
      disabled={location.pathname === '/login'}
      onClick={handleLoginClick}
    >
      Login
    </Button>
  );
}
