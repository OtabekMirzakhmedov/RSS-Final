/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Container, CssBaseline, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormValidationMessages from '../pages-types/validateTypes';
import { Routes } from '../pages-types/pageTypes';
import SimpleSnackbar from '../../components/SimpleSnackbar/SimpleSnackbar';
import { getUser, updateUser } from '../../service/ProfileService';
import PasswordModal from './PasswordModal';

interface Props {
  exitEditMode: () => void;
  data: UserData | null;
  updateData: (data: UserData) => void;
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

interface AddressType {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
  default?: string;
}

interface RegisterField {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
  repeatPassword: string;
  shippingStreet: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostal: string;
  billingStreet: string;
  billingCity: string;
  billingCountry: string;
  billingPostal: string;
  defaultShippingAddress: boolean;
  defaultBillingAddress: boolean;
  defaultBillingAddress2: boolean;
}

interface PersonalActionType {
  action: 'changeEmail' | 'setFirstName' | 'setLastName' | 'setDateOfBirth';
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

function EditProfileMode({ exitEditMode, /* data */ updateData }: Props) {
  const navigate = useNavigate();

  const backBtnHandler = async () => {
    const userData = await getUser();
    if (userData) {
      updateData(userData);
    }
    exitEditMode();
    navigate(Routes.PROFILE);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterField>({
    mode: 'onChange',
  });
  const [personalSnackbarNeeded, setPersonalSnackbarNeeded] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [wrongPersonalSnackbarNeeded, setWrongPersonalSnackbarNeeded] = useState(false);
  const snackbarClose = () => {
    setPersonalSnackbarNeeded(false);
  };

  const passwordModalHandler = () => {
    setPasswordModalOpen(true);
  };

  const setPasswordModalFalse = () => {
    setPasswordModalOpen(false);
  };

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const bthday = watch('birthDate');
  const email = watch('email');

  const onPersonalSubmit = async (): Promise<void> => {
    // console.log(data);
    // const shippingAddress: Address = {
    //   streetName: data.shippingStreet,
    //   city: data.shippingCity,
    //   country: data.shippingCountry,
    //   postalCode: data.shippingPostal,
    // };
    // const formData: SignupData = {
    //   email: data.email,
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   password: data.password,
    //   dateOfBirth: data.birthDate,
    //   addresses: [shippingAddress],
    // };

    // if (!data.defaultBillingAddress) {
    //   const billingAddress: Address = {
    //     streetName: data.billingStreet,
    //     city: data.billingCity,
    //     country: data.billingCountry,
    //     postalCode: data.billingPostal,
    //   };
    //   formData.addresses.push(billingAddress);
    // }

    // if (data.defaultShippingAddress) {
    //   formData.defaultShippingAddress = 0;
    // }
    // if (data.defaultBillingAddress) {
    //   formData.defaultBillingAddress = 0;
    // }

    // if (!data.defaultBillingAddress && data.defaultBillingAddress2) {
    //   formData.defaultBillingAddress = 1;
    // }

    const actions: PersonalActionType[] = [];

    if (firstName) {
      const action: PersonalActionType = {
        action: 'setFirstName',
        firstName,
      };
      actions.push(action);
    }

    if (lastName) {
      const action: PersonalActionType = {
        action: 'setLastName',
        lastName,
      };
      actions.push(action);
    }

    if (bthday) {
      const action: PersonalActionType = {
        action: 'setDateOfBirth',
        dateOfBirth: bthday,
      };
      actions.push(action);
    }

    if (email) {
      const action: PersonalActionType = {
        action: 'changeEmail',
        email,
      };
      actions.push(action);
    }

    try {
      if (actions.length > 0) {
        await updateUser(actions);
        setPersonalSnackbarNeeded(true);
      } else {
        setWrongPersonalSnackbarNeeded(true);
      }
    } catch (err) {
      setPersonalSnackbarNeeded(false);
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
          alignItems: 'flex-start',
        }}
      >
        <Button style={{ alignSelf: 'flex-start' }} onClick={() => backBtnHandler()}>
          Go back
        </Button>
        <form onSubmit={handleSubmit(onPersonalSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                {...register('firstName', {
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
                  validate: (value) => {
                    const now = new Date();
                    const minAge = 13;
                    const dob = new Date(value);
                    const thirteenYearsAgo = new Date(
                      now.getFullYear() - minAge,
                      now.getMonth(),
                      now.getDate()
                    );

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
          </Grid>
          <Button
            type='submit'
            style={{ margin: 10, alignSelf: 'center' }}
            variant='contained'
            color='secondary'
          >
            Save personal changes
          </Button>
          <Button
            type='button'
            onClick={passwordModalHandler}
            style={{ margin: 10, alignSelf: 'center' }}
            color='warning'
            variant='contained'
          >
            Change password
          </Button>
        </form>
        {passwordModalOpen && <PasswordModal setPasswordModalFalse={setPasswordModalFalse} />}
        {personalSnackbarNeeded && (
          <SimpleSnackbar
            colorName='success'
            text='Changes are saved successfully!'
            closeModal={snackbarClose}
          />
        )}
        {wrongPersonalSnackbarNeeded && (
          <SimpleSnackbar
            colorName='error'
            text='You entered no valid data!'
            closeModal={snackbarClose}
          />
        )}
      </Box>
    </Container>
  );
}

export default EditProfileMode;
