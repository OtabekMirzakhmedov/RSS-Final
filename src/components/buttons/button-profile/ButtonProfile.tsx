import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';
import { RoutesPages } from '../../../pages/pages-types/pageTypes';

export default function ButtonProfile() {
  const navigate: NavigateFunction = useNavigate();

  const location = useLocation();

  const handleClick = () => {
    navigate(RoutesPages.PROFILE);
  };

  return (
    <Button
      variant='contained'
      color='success'
      endIcon={<AccountCircleIcon />}
      disabled={location.pathname === RoutesPages.PROFILE.toString()}
      onClick={handleClick}
    >
      User
    </Button>
  );
}
