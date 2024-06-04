/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Routes } from '../pages-types/pageTypes';
import { getUser } from '../../service/ProfileService';
import Header from '../../components/header/Header';
import StandardProfileMode from './StandardProfileMode';
import EditProfileMode from './EditProfileMode';

interface AddressType {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: AddressType[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Header />
      {editMode ? (
        <EditProfileMode exitEditMode={exitEditMode} />
      ) : (
        <StandardProfileMode enterEditMode={enterEditMode} data={data} />
      )}
      <Button style={{ marginTop: 20 }} variant='contained' color='primary' component={Link} to='/'>
        Return
      </Button>
    </div>
  );
}

export default ProfilePage;
