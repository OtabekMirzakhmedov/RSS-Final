import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { RoutesPages } from '../../../pages/pages-types/pageTypes';

export default function ButtonCatalog() {
  const navigate = useNavigate();

  const location = useLocation();

  const handleLoginClick = () => {
    navigate(RoutesPages.CATALOG);
  };

  return (
    <Button
      variant='contained'
      color='secondary'
      disabled={location.pathname === RoutesPages.LOGIN.toString()}
      onClick={handleLoginClick}
    >
      Catalog
    </Button>
  );
}
