import Button from '@mui/material/Button';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';
import { RoutesPages } from '../../../pages/pages-types/pageTypes';

export default function ButtonCatalog() {
  const navigate: NavigateFunction = useNavigate();

  const location = useLocation();

  const handleLoginClick = () => {
    navigate(RoutesPages.CATALOG);
  };

  return (
    <Button
      variant='contained'
      color='secondary'
      endIcon={<StoreIcon />}
      disabled={
        location.pathname === RoutesPages.LOGIN.toString() ||
        location.pathname === RoutesPages.CATALOG.toString()
      }
      onClick={handleLoginClick}
    >
      Catalog
    </Button>
  );
}
