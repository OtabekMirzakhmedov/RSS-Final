import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  enterEditMode: () => void;
  data: UserData | null;
}

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

function StandardProfilMode({ enterEditMode, data }: Props) {
  const editClickHandler = () => {
    enterEditMode();
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid container alignItems='center' item xs={12}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          <Card>
            <CardHeader title='Personal' />
            <CardContent>
              <Grid item xs='auto'>
                <TextField
                  label='First Name'
                  value={data?.firstName}
                  disabled
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Last Name'
                  fullWidth
                  id='lastName'
                  value={data?.lastName}
                  disabled
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Date of birth'
                  fullWidth
                  id='birthDate'
                  type='text'
                  value={localStorage.getItem('bthday')}
                  disabled
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Email'
                  id='email'
                  type='text'
                  value={data?.email}
                  disabled
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Password'
                  fullWidth
                  type='password'
                  id='password'
                  value={data?.password}
                  disabled
                  margin='normal'
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Addresses' />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    value={data?.addresses}
                    type='text'
                    id='street'
                    margin='normal'
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default StandardProfilMode;
