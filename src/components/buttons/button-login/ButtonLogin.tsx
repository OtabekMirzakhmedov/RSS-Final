import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';
import { RoutesPages } from '../../../pages/pages-types/pageTypes';

export default function ButtonLogin() {
  const navigate: NavigateFunction = useNavigate();

  const location = useLocation();

  const handleLoginClick = () => {
    navigate(RoutesPages.LOGIN);
  };

  return (
    <Button
      variant='contained'
      color='success'
      disabled={location.pathname === RoutesPages.LOGIN.toString()}
      onClick={handleLoginClick}
      endIcon={<LoginIcon />}
    >
      Login
    </Button>
  );
}
