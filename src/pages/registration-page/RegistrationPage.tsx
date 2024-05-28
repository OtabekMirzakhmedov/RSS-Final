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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Checkbox,
  Backdrop,
  Snackbar,
  CircularProgress,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount, login } from '../../service/AuthenticationService';
import Header from '../../components/header/Header';
import { Routes } from '../pages-types/pageTypes';
import FormValidationMessages from '../pages-types/validateTypes';

interface RegisterField {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
  repeatPassword: string;
  street: string;
  city: string;
  country: string;
  postal: string;
  defaultShippingAddress: boolean;
  defaultBillingAddress: boolean;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface Response {
  success: boolean;
  message: string;
}

function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const error = false;
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const isLoggedin = localStorage.getItem('token') !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedin) {
      navigate(Routes.HOME);
    }
  }, [isLoggedin, navigate]);

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const postalCodeValidation = (country: string) => {
    if (country === 'US') {
      return {
        pattern: {
          value: /^\d{5}(-\d{4})?$/,
          message: FormValidationMessages.postalCode.US,
        },
      };
    }
    return {
      pattern: {
        value: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
        message: FormValidationMessages.postalCode.default,
      },
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      country: 'US',
    },
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    setLoading(true);
    const formData: FormData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };
    try {
      const response: Response = await createAccount(formData);
      setLoading(false);

      if (!response.success) {
        setSnackbarSeverity('error');
        setSnackbarMessage(response.message);
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity('success');
        setSnackbarMessage('Account created successfully!');
        setSnackbarOpen(true);
        await login(data.email, data.password);
        navigate(Routes.HOME);
      }
    } catch (err) {
      setLoading(false);
      setSnackbarSeverity('error');
      setSnackbarMessage('An unexpected error occurred.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLoginClick = (): void => {
    navigate(Routes.LOGIN);
  };

  const password = watch('password');
  const country = watch('country');
  const handleBillingAddressCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowBillingAddress(event.target.checked);
  };

  return (
    <div>
      <Header />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
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
                    required: FormValidationMessages.Name.Required,
                    minLength: {
                      value: 1,
                      message: FormValidationMessages.Name.MinLength,
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: FormValidationMessages.Name.InvalidFormat,
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
                    required: FormValidationMessages.LastName.Required,
                    minLength: {
                      value: 1,
                      message: FormValidationMessages.LastName.MinLength,
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: FormValidationMessages.LastName.InvalidFormat,
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
                  id='birthDate'
                  label='Date of Birth'
                  type='date'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('birthDate', {
                    required: FormValidationMessages.Birthday.Required,
                    validate: (value) => {
                      const now = new Date();
                      const minAge = 13;
                      const dob = new Date(value);
                      const thirteenYearsAgo = new Date(
                        now.getFullYear() - minAge,
                        now.getMonth(),
                        now.getDate()
                      );

                      // Проверка, что пользователю 13 лет и более
                      if (dob > thirteenYearsAgo) {
                        return FormValidationMessages.Birthday.InvalidFormat;
                      }
                      return true;
                    },
                  })}
                  error={!!errors.birthDate}
                  helperText={errors.birthDate ? errors.birthDate.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id='email'
                  label='Email Address'
                  autoComplete='email'
                  {...register('email', {
                    required: FormValidationMessages.Email.Required,
                    pattern: {
                      value:
                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                      message: FormValidationMessages.Email.InvalidFormat,
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
                    required: FormValidationMessages.Password.Required,
                    minLength: {
                      value: 8,
                      message: FormValidationMessages.Password.MinLength,
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      message: FormValidationMessages.Password.Pattern,
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
                    required: FormValidationMessages.Password.Required,
                    validate: (value) =>
                      value === password || FormValidationMessages.Password.NotMatch,
                  })}
                  error={!!errors.repeatPassword}
                  helperText={errors.repeatPassword ? errors.repeatPassword.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title='Shipping Address' />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label='Street'
                          type='text'
                          id='street'
                          {...register('street', {
                            required: FormValidationMessages.Street.Required,
                            minLength: {
                              value: 1,
                              message: FormValidationMessages.Street.MinLength,
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
                            required: FormValidationMessages.City.Required,
                            minLength: {
                              value: 1,
                              message: FormValidationMessages.City.MinLength,
                            },
                            pattern: {
                              value: /^[a-zA-Z]+$/,
                              message: FormValidationMessages.City.InvalidFormat,
                            },
                          })}
                          error={!!errors.city}
                          helperText={errors.city ? errors.city.message : ''}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id='country-label'>Country</InputLabel>
                          <Select
                            labelId='country-label'
                            id='country'
                            label='Country'
                            {...register('country', {
                              required: FormValidationMessages.Country.Required,
                            })}
                            defaultValue='US'
                          >
                            <MenuItem value='US'>United States</MenuItem>
                            <MenuItem value='CA'>Canada</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label='Postal Code'
                          variant='outlined'
                          {...register('postal', {
                            required: FormValidationMessages.postalCode.Required,
                            ...postalCodeValidation(country),
                          })}
                          error={!!errors.postal}
                          helperText={errors.postal ? errors.postal.message : ''}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...register('defaultShippingAddress')}
                              defaultChecked={false}
                            />
                          }
                          label='Default Shipping Address'
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...register('defaultBillingAddress')}
                              defaultChecked={false}
                              onChange={handleBillingAddressCheckboxChange}
                            />
                          }
                          label='Default Billing Address'
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              {!showBillingAddress && (
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title='Billing Address' />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label='Street'
                            type='text'
                            id='street'
                            {...register('street', {
                              required: FormValidationMessages.Street.Required,
                              minLength: {
                                value: 1,
                                message: FormValidationMessages.Street.MinLength,
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
                              required: FormValidationMessages.City.Required,
                              minLength: {
                                value: 1,
                                message: FormValidationMessages.City.MinLength,
                              },
                              pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: FormValidationMessages.City.InvalidFormat,
                              },
                            })}
                            error={!!errors.city}
                            helperText={errors.city ? errors.city.message : ''}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id='country-label'>Country</InputLabel>
                            <Select
                              labelId='country-label'
                              id='country'
                              label='Country'
                              {...register('country', {
                                required: FormValidationMessages.Country.Required,
                              })}
                              defaultValue='US'
                            >
                              <MenuItem value='US'>United States</MenuItem>
                              <MenuItem value='CA'>Canada</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label='Postal Code'
                            variant='outlined'
                            {...register('postal', {
                              required: FormValidationMessages.postalCode.Required,
                              ...postalCodeValidation(country),
                            })}
                            error={!!errors.postal}
                            helperText={errors.postal ? errors.postal.message : ''}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                {...register('defaultBillingAddress')}
                                defaultChecked={false}
                              />
                            }
                            label='Default Billing Address'
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}
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
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default RegistrationPage;
