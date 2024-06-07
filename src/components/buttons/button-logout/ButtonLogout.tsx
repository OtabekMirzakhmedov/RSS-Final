import Button from '@mui/material/Button';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../../service/AuthenticationService';
import { RoutesPages } from '../../../pages/pages-types/pageTypes';

export default function ButtonLogout() {
  const navigate: NavigateFunction = useNavigate();

  const handleLogoutClick = () => {
    localStorage.clear();
    getAccessToken()
      .then(() => {
        navigate(RoutesPages.HOME);
      })
      .catch((error) => {
        throw new Error(`Error logging out: ${error}`);
      });
  };

  return (
    <Button variant='contained' color='error' onClick={handleLogoutClick}>
      Logout
    </Button>
  );
}
