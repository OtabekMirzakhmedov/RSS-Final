import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { RoutesPages } from '../../../pages/pages-types/pageTypes';

export default function ButtonProfile() {
  const navigate: NavigateFunction = useNavigate();

  const location = useLocation();

  const handleClick = () => {
    navigate(RoutesPages.PROFILE);
  };

  return (
    <IconButton
      color='success'
      disabled={location.pathname === RoutesPages.PROFILE.toString()}
      onClick={handleClick}
    >
      <AccountCircleIcon />
    </IconButton>
  );
}
