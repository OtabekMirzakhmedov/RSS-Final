/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Container, Backdrop, CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { checkEmail } from '../../service/AuthenticationService';
import Header from '../../components/header/Header';
import FormValidationMessages from '../pages-types/validateTypes';
import './login.scss';
import SimpleSnackbar from '../../components/SimpleSnackbar/SimpleSnackbar';
import { ResponseCheck, Routes } from '../pages-types/pageTypes';

interface Inputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem('token') !== null;

  useEffect(() => {
    if (isLoggedin) {
      navigate(Routes.HOME);
    }
  }, [isLoggedin, navigate]);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Inputs>({
    mode: 'onChange',
  });
  const [emailModalNeeded, setEmailModalNeeded] = useState<boolean>(false);
  const closeEmailModal = () => {
    setEmailModalNeeded(false);
  };
  const [passwordModalNeeded, setPasswordModalNeeded] = useState(false);
  const closePasswordModal = () => {
    setPasswordModalNeeded(false);
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const email = watch('email');
  const password = watch('password');
  const onSubmit = async (): Promise<void> => {
    setLoading(true);
    const response = await checkEmail(email, password);
    setLoading(false);

    if (response === ResponseCheck.NotRegistered.toString()) {
      setEmailModalNeeded(true);
    } else if (response === ResponseCheck.WrongPassword.toString()) {
      setPasswordModalNeeded(true);
    } else {
      navigate(Routes.HOME);
      localStorage.setItem('initial_token', '');
    }
    reset();
  };

  const signUpClickHandler = () => {
    navigate(Routes.REGISTER);
  };

  return (
    <>
      <Header />
      <Container component='main' maxWidth='xs'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='Email'
            placeholder='Enter your email'
            style={{
              marginTop: 40,
              marginBottom: 20,
            }}
            {...register('email', {
              required: FormValidationMessages.Email.Required,
              pattern: {
                value: /^\s*[^\s]+@\S+\.\S+\s*$/,
                message: FormValidationMessages.Email.InvalidFormat,
              },
            })}
            type='email'
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <div style={{ position: 'relative' }}>
            <TextField
              label='Password'
              style={{
                width: '100%',
                marginBottom: 20,
              }}
              placeholder='Enter your password'
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
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={
                errors.password
                  ? errors.password.type && <span>{errors.password.message}</span>
                  : ''
              }
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                top: 18,
                right: 20,
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                padding: 0,
              }}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>

          <Button size='medium' variant='contained' color='secondary' type='submit'>
            Log in
          </Button>
          <Button
            type='button'
            size='medium'
            variant='contained'
            onClick={signUpClickHandler}
            style={{
              background: 'transparent',
              marginTop: 15,
              color: 'rgb(166, 92, 240)',
              border: '1px solid rgb(166, 92, 240)',
            }}
          >
            Sign up
          </Button>
          <div>
            {emailModalNeeded && (
              <SimpleSnackbar
                text='This email is not registered! Please sign up first!'
                closeModal={closeEmailModal}
              />
            )}
          </div>
          <div>
            {passwordModalNeeded && (
              <SimpleSnackbar
                text='This password is wrong! Please try again!'
                closeModal={closePasswordModal}
              />
            )}
          </div>
        </form>
      </Container>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
}
