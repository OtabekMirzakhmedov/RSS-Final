/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { checkEmail } from '../../Api';
import './login.scss';
import SimpleSnackbar from '../../components/SimpleSnackbar';

interface Inputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Inputs>({
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const [emailModalNeeded, setEmailModalNeeded] = useState(false);
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

  const onSubmit = async () => {
    const response = await checkEmail(email, password);

    if (response === 'This email is not registered') {
      setEmailModalNeeded(true);
    } else if (response === 'Wrong password') {
      setPasswordModalNeeded(true);
    } else {
      navigate('/');
    }
    reset();
  };

  const signUpClickHandler = () => {
    navigate('/create-account');
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label='Email'
        placeholder='Enter your email'
        style={{
          marginTop: 40,
          marginBottom: 20,
        }}
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
      <div style={{ position: 'relative' }}>
        <TextField
          label='Password'
          style={{
            minWidth: 375,
            marginBottom: 20,
          }}
          placeholder='Enter your password'
          {...register('password', {
            required: 'The password is required!',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&](?=[^\s]+$)/,
              message:
                'Please enter a password with at least one uppercase letter, one lowercase letter, one digit and one special character, whitespaces not allowed',
            },
          })}
          type={showPassword ? 'text' : 'password'}
          error={!!errors.password}
          helperText={
            errors.password ? (
              <>
                {errors.password.type === 'required' && <span>{errors.password.message}</span>}
                {errors.password.type === 'minLength' && <span>{errors.password.message}</span>}
                {errors.password.type === 'pattern' && <span>{errors.password.message}</span>}
              </>
            ) : (
              ''
            )
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
  );
}
