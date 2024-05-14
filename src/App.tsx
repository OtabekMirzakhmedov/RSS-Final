import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import RegistrationPage from './pages/registration-page/RegistrationPage';
import NotFoundPage from './pages/not-found-page/NotFoundPage';
import MainPage from './pages/main-page/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create-account' element={<RegistrationPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
