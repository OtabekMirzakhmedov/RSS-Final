/* eslint-disable react/jsx-props-no-spreading */
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Autocomplete,
  IconButton,
  InputAdornment,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount, login } from '../../service/AuthenticationService';
import countries from './RegistrationCountries';

interface RegisterField {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  street: string;
  city: string;
  country: string;
  postal: string;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterField>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      const response = await createAccount(data);

      if ('message' in response) {
        setError(response.message || 'An error occurred.');
      } else {
        await login(data.email, data.password);
        navigate('/');
      }
    } catch (err) {
      setError('An error occurred.');
    }
  };

  const handleLoginClick = (): void => {
    navigate('/login');
  };

  const password = watch('password');

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
          <Typography component='h1' variant='h4' mb={2}>
            Sign up
          </Typography>
          <form className='form-register' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  {...register('firstName', {
                    required: 'The name is required!',
                    minLength: {
                      value: 1,
                      message: 'Name: minimum length of 1 character',
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message:
                        'The name must not contain numbers or special characters and use english words',
                    },
                  })}
                  type='text'
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  autoComplete='family-name'
                  {...register('lastName', {
                    required: 'The last name is required!',
                    minLength: {
                      value: 1,
                      message: 'Last name: minimum length of 1 character',
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message:
                        'The last name must not contain numbers or special characters and use english words',
                    },
                  })}
                  type='text'
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id='email'
                  label='Email Address'
                  autoComplete='email'
                  {...register('email', {
                    required: 'The email is required!',
                    pattern: {
                      value:
                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                      message: 'Please enter a valid email!',
                    },
                  })}
                  type='email'
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  autoComplete='new-password'
                  {...register('password', {
                    required: 'The password is required!',
                    minLength: {
                      value: 8,
                      message: 'Password should be at least 8 characters long',
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handleTogglePasswordVisibility}>
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Confirm password'
                  type='password'
                  id='repeatPassword'
                  autoComplete='new-password'
                  {...register('repeatPassword', {
                    required: 'The password is required!',
                    validate: (value) => value === password || 'The passwords do not match!',
                  })}
                  error={!!errors.repeatPassword}
                  helperText={errors.repeatPassword ? errors.repeatPassword.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Street'
                  type='text'
                  id='street'
                  {...register('street', {
                    required: 'The street is required!',
                    minLength: {
                      value: 1,
                      message: 'Name: minimum length of 1 character',
                    },
                  })}
                  error={!!errors.street}
                  helperText={errors.street ? errors.street.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='City'
                  type='text'
                  id='city'
                  {...register('city', {
                    required: 'The city is required!',
                    minLength: {
                      value: 1,
                      message: 'City: minimum length of 1 character',
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message:
                        'The city must not contain numbers or special characters and use english words',
                    },
                  })}
                  error={!!errors.city}
                  helperText={errors.city ? errors.city.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  id='country-select'
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
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
                      {...params}
                      label='Choose a country'
                      {...register('country', {
                        required: 'The country is required!',
                      })}
                      error={!!errors.country}
                      helperText={errors.country ? errors.country.message : ''}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Postal Code'
                  variant='outlined'
                  {...register('postal', {
                    required: 'The postal code is required!',
                  })}
                  error={!!errors.postal}
                  helperText={errors.postal ? errors.postal.message : ''}
                />
              </Grid>
            </Grid>
            {error && <Typography color='error'>{error}</Typography>}
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button onClick={handleLoginClick} variant='text' size='small'>
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default RegistrationPage;
