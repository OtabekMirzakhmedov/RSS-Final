import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes } from '../../../pages/pages-types/pageTypes';

export default function ButtonCatalog() {
  const navigate = useNavigate();

  const location = useLocation();

  const handleLoginClick = () => {
    navigate(Routes.CATALOG);
  };

  return (
    <Button
      variant='contained'
      color='secondary'
      disabled={location.pathname === Routes.LOGIN.toString()}
      onClick={handleLoginClick}
    >
      Catalog
    </Button>
  );
}
