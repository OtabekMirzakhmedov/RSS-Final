import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Autocomplete,
} from '@mui/material';
import { z } from 'zod';
// eslint-disable-next-line import/no-extraneous-dependencies
import { zodResolver } from '@hookform/resolvers/zod';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import countries from './RegistrationCountries';

const formSchema = z.object({
  firstName: z.string().min(8, { message: 'Minimum 8 characters' }),
  lastName: z.string(),
  email: z.string().email('Email is not correct'),
  password: z.string().min(8, { message: 'Minimum 8 characters' }),
  birthday: z.string(),
  street: z.string(),
  country: z.string(),
  postal: z.string(),
});

function RegistrationPage() {
  const [postalCode, setPostalCode] = useState<string>('');

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
  });

  const handlePostalCodeChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(value);
  };

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h4'>
            Sign up
          </Typography>
          <Box component='form' onSubmit={handleSubmit(() => {})} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('firstName')}
                  autoComplete='given-name'
                  name='firstName'
                  // required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  // required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField fullWidth /*  required  */ label='Birthday' name='birthday' />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name='street'
                  label='Street'
                  type='text'
                  id='street'
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField required fullWidth name='city' label='City' type='text' id='city' /> */}
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  id='country-select'
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img
                        loading='lazy'
                        width='20'
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=''
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...params}
                      label='Choose a country'
                      name='country'
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  name='postal'
                  fullWidth
                  label='Postal Code'
                  variant='outlined'
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default RegistrationPage;
