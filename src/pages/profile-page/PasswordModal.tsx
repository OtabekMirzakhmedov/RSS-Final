/* eslint-disable react/jsx-props-no-spreading */
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Modal,
  CssBaseline,
  Container,
  Box,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import FormValidationMessages from '../pages-types/validateTypes';
import SimpleSnackbar from '../../components/SimpleSnackbar/SimpleSnackbar';
import { updatePassword } from '../../service/ProfileService';
import { RoutesPages } from '../pages-types/pageTypes';
import { getAccessToken } from '../../service/AuthenticationService';

interface PasswordForm {
  password: string;
  repeatPassword: string;
  currentPassword: string;
}

interface Response {
  success: boolean;
  message: string;
}

interface Props {
  setPasswordModalFalse: () => void;
}

export default function PasswordModal({ setPasswordModalFalse }: Props) {
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<PasswordForm>({
    mode: 'onChange',
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const password = watch('password');

  const [open, setOpen] = useState(true);
  const [passwordSnackbarNeeded, setPasswordSnackbarNeeded] = useState(false);
  const [wrongPasswordSnackbarNeeded, setWrongPasswordSnackbarNeeded] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setPasswordModalFalse();
    reset();
  };

  const snackbarClose = () => {
    setPasswordSnackbarNeeded(false);
  };

  const onSubmit = async (data: PasswordForm): Promise<void> => {
    const userData: PasswordForm = {
      password: data.password,
      repeatPassword: data.repeatPassword,
      currentPassword: data.currentPassword,
    };
    try {
      const response: Response = await updatePassword(userData);
      if (response.success) {
        setPasswordSnackbarNeeded(true);
        localStorage.clear();
        getAccessToken()
          .then(() => {
            navigate(RoutesPages.LOGIN);
          })
          .catch((error) => {
            throw new Error(`Error logging out: ${error}`);
          });
      } else {
        setWrongPasswordSnackbarNeeded(true);
      }
    } catch (err) {
      throw new Error(`error}`);
    }
  };

  return (
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          <div
            style={{
              top: `50%`,
              left: `50%`,
              transform: `translate(-50%, -50%)`,
              position: 'absolute',
              width: 400,
              backgroundColor: '#FFFFFF',
              border: '2px solid primary',
              boxShadow: '5%',
              padding: '20px',
            }}
          >
            <h2 id='simple-modal-title'>Password Settings</h2>
            <form id='simple-modal-description' onSubmit={handleSubmit(onSubmit)}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Current password'
                  type={showPassword ? 'text' : 'password'}
                  id='currentPassword'
                  autoComplete='current-password'
                  {...register('currentPassword', {
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin='normal'
                  fullWidth
                  label='New password'
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
                  margin='normal'
                  fullWidth
                  label='Confirm new password'
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
              <Button
                type='submit'
                style={{ margin: 10, alignSelf: 'flex-end' }}
                variant='contained'
                color='success'
              >
                Save changes
              </Button>
            </form>
            <Button
              style={{ margin: 10, alignSelf: 'flex-end' }}
              variant='contained'
              color='error'
              onClick={handleClose}
            >
              Cancel changes
            </Button>
          </div>
        </Modal>
        {passwordSnackbarNeeded && (
          <SimpleSnackbar
            colorName='success'
            text='Password is changed successfully!'
            closeModal={snackbarClose}
          />
        )}
        {wrongPasswordSnackbarNeeded && (
          <SimpleSnackbar
            colorName='error'
            text='Enter valid current password, please!'
            closeModal={snackbarClose}
          />
        )}
      </Box>
    </Container>
  );
}
