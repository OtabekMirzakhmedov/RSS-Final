import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import RegistrationPage from './pages/registration-page/RegistrationPage';
import NotFoundPage from './pages/not-found-page/NotFoundPage';
import MainPage from './pages/main-page/MainPage';
import ProductDetailsPage from './pages/product-details-page/ProductDetailsPage';
import { getAccessToken } from './service/AuthenticationService';
import CatalogPage from './pages/catalog-page/CatalogPage';
import CategoryCatalogPage from './pages/category-catalog-page/CategoryCatalogPage';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  getAccessToken();
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/catalog' element={<CatalogPage />} />
        <Route path='/catalog/:categoryName' element={<CategoryCatalogPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create-account' element={<RegistrationPage />} />
        <Route path='/product/:productId' element={<ProductDetailsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
