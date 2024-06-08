import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';
import { RoutesPages } from '../../../pages/pages-types/pageTypes';

export default function ButtonAbout() {
  const navigate: NavigateFunction = useNavigate();

  const location = useLocation();

  const handleAboutClick = () => {
    navigate(RoutesPages.ABOUT);
  };

  return (
    <Button
      variant='contained'
      color='success'
      endIcon={<GroupsIcon />}
      disabled={location.pathname === RoutesPages.ABOUT.toString()}
      onClick={handleAboutClick}
    >
      About us
    </Button>
  );
}
