import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../../service/AuthenticationService';

export default function ButtonLogout() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.clear();
    getAccessToken()
      .then(() => {
        navigate('/');
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
