import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { RoutesPages } from '../../../pages/pages-types/pageTypes';

export default function ButtonBasket() {
  const navigate: NavigateFunction = useNavigate();

  const location = useLocation();

  const handleBasketClick = () => {
    navigate(RoutesPages.BASKET);
  };

  return (
    <IconButton
      color='default'
      disabled={location.pathname === RoutesPages.BASKET.toString()}
      onClick={handleBasketClick}
    >
      <ShoppingCartIcon />
    </IconButton>
  );
}
