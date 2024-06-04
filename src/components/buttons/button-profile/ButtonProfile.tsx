import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes } from '../../../pages/pages-types/pageTypes';

export default function ButtonProfile() {
  const navigate = useNavigate();

  const location = useLocation();

  const handleClick = () => {
    navigate(Routes.PROFILE);
  };

  return (
    <Button
      variant='contained'
      color='success'
      disabled={location.pathname === Routes.PROFILE.toString()}
      onClick={handleClick}
    >
      User
    </Button>
  );
}
