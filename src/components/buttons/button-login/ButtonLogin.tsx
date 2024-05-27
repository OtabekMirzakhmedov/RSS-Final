import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes } from '../../../pages/pages-types/pageTypes';

export default function ButtonLogin() {
  const navigate = useNavigate();

  const location = useLocation();

  const handleLoginClick = () => {
    navigate(Routes.LOGIN);
  };

  return (
    <Button
      variant='contained'
      color='success'
      disabled={location.pathname === Routes.LOGIN.toString()}
      onClick={handleLoginClick}
    >
      Login
    </Button>
  );
}
