import { Avatar, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  enterEditMode: () => void;
  data: UserData | null;
}

interface AddressType {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
  default?: string;
}

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: AddressType[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
}

function StandardProfileMode({ enterEditMode, data }: Props) {
  const editClickHandler = () => {
    enterEditMode();
  };

  const shippingAddresses: AddressType[] = [];
  data?.shippingAddressIds.forEach((id) => {
    data.addresses.forEach((address) => {
      if (id === address.id) {
        if (data.defaultShippingAddressId === id) {
          // eslint-disable-next-line no-param-reassign
          address.default = 'default';
        }
        shippingAddresses.push(address);
      }
    });
  });

  const billingAddresses: AddressType[] = [];
  data?.billingAddressIds.forEach((id) => {
    data.addresses.forEach((address) => {
      if (id === address.id) {
        if (data.defaultBillingAddressId === id) {
          // eslint-disable-next-line no-param-reassign
          address.default = 'default';
        }
        billingAddresses.push(address);
      }
    });
  });

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid alignItems='center' item xs={12}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <PersonIcon />
            </Avatar>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography component='h1' variant='h4' mb={2}>
                User profile
              </Typography>
              <Button
                onClick={editClickHandler}
                variant='text'
                style={{ fontSize: '12px', color: '#2196f3', backgroundColor: 'transparent' }}
                startIcon={<EditIcon />}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ height: '100%' }}>
            <CardHeader title='Personal' />
            <CardContent>
              <Typography>
                {data?.firstName} {data?.lastName}
              </Typography>
              <Typography>{data?.dateOfBirth}</Typography>
              <Typography>{data?.email}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ height: '100%' }}>
            <CardHeader title='Contacts' />
            <CardContent>
              <h3>Shipping Addresses</h3>
              {shippingAddresses.map((el: AddressType) => (
                <div key={el.id}>
                  <span key={el.id}>
                    {el.country}, {el.city}, {el.streetName}, {el.postalCode}
                  </span>
                  <span style={{ color: 'blue', marginLeft: '8px' }}>{el.default}</span>
                </div>
              ))}
              <h3>Billing Addresses</h3>
              {billingAddresses.map((el: AddressType) => (
                <div key={el.id}>
                  <span>
                    {el.country}, {el.city}, {el.streetName}, {el.postalCode}
                  </span>
                  <span style={{ color: 'blue', marginLeft: '8px' }}>{el.default}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default StandardProfileMode;
