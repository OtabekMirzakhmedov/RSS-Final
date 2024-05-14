import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div>
      <div>
        <Link to='/login'>link to login</Link>
      </div>
      <div>
        <Link to='/create-account'>link to Registration</Link>
      </div>
      <h1>MainPage</h1>
    </div>
  );
}

export default MainPage;
