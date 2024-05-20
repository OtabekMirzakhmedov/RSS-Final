import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';

function MainPage() {
  return (
    <>
      <Header />
      <div>
        <Link to='/login'>link to login</Link>
      </div>
      <div>
        <Link to='/create-account'>link to Registration</Link>
      </div>
      <h1>MainPage</h1>
    </>
  );
}

export default MainPage;
