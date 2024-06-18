import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { getAccessToken } from '../../../service/AuthenticationService';
import { RoutesPages } from '../../../pages/pages-types/pageTypes';
import { CreateCart } from '../../../service/CartService';

export default function ButtonLogout() {
  const navigate: NavigateFunction = useNavigate();

  const handleLogoutClick = () => {
    localStorage.clear();
    getAccessToken()
      .then(async () => {
        await CreateCart();
      })
      .then(() => {
        navigate(RoutesPages.HOME);
      })
      .catch((error) => {
        throw new Error(`Error logging out: ${error}`);
      });
  };

  return (
    <IconButton color='error' onClick={handleLogoutClick}>
      <ExitToAppIcon />
    </IconButton>
  );
}
