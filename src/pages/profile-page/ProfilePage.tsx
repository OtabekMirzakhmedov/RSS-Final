/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Routes } from '../pages-types/pageTypes';
import { getUser } from '../../service/ProfileService';
import Header from '../../components/header/Header';
import StandardProfilMode from './StandardProfileMode';
import EditProfileMode from './EditProfileMode';

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: [];
  shippingAddressIds: [];
  billingAddressIds: [];
}
function ProfilePage() {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem('id') !== null;

  useEffect(() => {
    if (isLoggedin) {
      navigate(Routes.PROFILE);
    }
  }, [isLoggedin, navigate]);

  const [data, setData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);

  const getUserInfo = async () => {
    const userData = await getUser();
    if (userData !== null) {
      setData(userData);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const exitEditMode = () => {
    setEditMode(false);
  };

  const enterEditMode = () => {
    setEditMode(true);
  };
  console.log(data);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Header />
      {editMode ? (
        <EditProfileMode exitEditMode={exitEditMode} />
      ) : (
        <StandardProfilMode enterEditMode={enterEditMode} data={data} />
      )}
      <Button style={{ marginTop: 20 }} variant='contained' color='primary' component={Link} to='/'>
        Home
      </Button>
    </div>
  );
}

export default ProfilePage;
