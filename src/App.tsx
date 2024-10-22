import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import RegistrationPage from './pages/registration-page/RegistrationPage';
import NotFoundPage from './pages/not-found-page/NotFoundPage';
import MainPage from './pages/main-page/MainPage';
import ProductDetailsPage from './pages/product-details-page/ProductDetailsPage';
import { getAccessToken } from './service/AuthenticationService';
import ProfilePage from './pages/profile-page/ProfilePage';
import CatalogPage from './pages/catalog-page/CatalogPage';
import CategoryCatalogPage from './pages/category-catalog-page/CategoryCatalogPage';
import { RoutesPages } from './pages/pages-types/pageTypes';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  getAccessToken();
  return (
    <Router>
      <Routes>
        <Route path={RoutesPages.HOME} element={<MainPage />} />
        <Route path={RoutesPages.CATALOG} element={<CatalogPage />} />
        <Route path={RoutesPages.GATEGORY} element={<CategoryCatalogPage />} />
        <Route path={RoutesPages.LOGIN} element={<LoginPage />} />
        <Route path={RoutesPages.REGISTER} element={<RegistrationPage />} />
        <Route path={RoutesPages.PRODUCT} element={<ProductDetailsPage />} />
        <Route path={RoutesPages.NOTFOUND} element={<NotFoundPage />} />
        <Route path={RoutesPages.PROFILE} element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
