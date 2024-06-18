/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import FormValidationMessages from '../pages-types/validateTypes';
import { RoutesPages } from '../pages-types/pageTypes';
import SimpleSnackbar from '../../components/SimpleSnackbar/SimpleSnackbar';
import { deleteAddress, getUser, updateUser } from '../../service/ProfileService';
import PasswordModal from './PasswordModal';
import './profile.scss';
import AddressModal from './AddressModal';
import EditAddressModal from './EditAddressModal';

interface Props {
  exitEditMode: () => void;
  updateData: (data: UserData) => void;
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

interface AddressActionType {
  action: 'removeShippingAddressId' | 'removeBillingAddressId' | 'addShippingAddressId';
  addressId: string;
}

function EditProfileMode({ exitEditMode, updateData }: Props) {
  const shippingAddresses: AddressType[] = [];
  const billingAddresses: AddressType[] = [];
  const navigate: NavigateFunction = useNavigate();

  function updateAddresses(changedData: UserData) {
    changedData?.shippingAddressIds.forEach((id) => {
      changedData.addresses.forEach((address) => {
        if (id === address.id) {
          if (changedData.defaultShippingAddressId === id) {
            address.default = 'default';
          }
          shippingAddresses.push(address);
        }
      });
    });

    changedData?.billingAddressIds.forEach((id) => {
      changedData.addresses.forEach((address) => {
        if (id === address.id) {
          if (changedData.defaultBillingAddressId === id) {
            address.default = 'default';
          }
          billingAddresses.push(address);
        }
      });
    });
  }
  const [data, setData] = useState<UserData | null>(null);

  const getUserInfo = async () => {
    const userData = await getUser();
    if (userData) {
      setData(userData);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (data) {
    updateAddresses(data);
  }

  const backBtnHandler = async () => {
    const userData = await getUser();
    if (userData) {
      updateData(userData);
    }
    exitEditMode();
    navigate(RoutesPages.PROFILE);
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
  const [addressShippingModalOpen, setAddressShippingModalOpen] = useState(false);
  const [addressBillingModalOpen, setAddressBillingModalOpen] = useState(false);
  const [addressEditModalOpen, setAddressEditModalOpen] = useState(false);
  const [wrongPersonalSnackbarNeeded, setWrongPersonalSnackbarNeeded] = useState(false);
  const [deleteAddressSnackbarNeeded, setDeleteAddressSnackbarNeeded] = useState(false);
  const snackbarClose = () => {
    setPersonalSnackbarNeeded(false);
  };

  const passwordModalHandler = () => {
    setPasswordModalOpen(true);
  };

  const setPasswordModalFalse = () => {
    setPasswordModalOpen(false);
  };

  const addressShippingModalHandler = () => {
    setAddressShippingModalOpen(true);
  };

  const setShippingAddressModalFalse = () => {
    setAddressShippingModalOpen(false);
  };

  const addressEditModalHandler = () => {
    setAddressEditModalOpen(true);
  };

  const setAddressEditModalFalse = () => {
    setAddressEditModalOpen(false);
  };

  const addressBillingModalHandler = () => {
    setAddressBillingModalOpen(true);
  };

  const setBillingAddressModalFalse = () => {
    setAddressBillingModalOpen(false);
  };

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const bthday = watch('birthDate');
  const email = watch('email');

  const onPersonalSubmit = async (): Promise<void> => {
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
      setWrongPersonalSnackbarNeeded(true);
    }
  };

  const [selectedItem, setSelectedItem] = useState('');
  const [selectedBillingItem, setSelectedBillingItem] = useState('');
  const [editValue, setEditValue] = useState<AddressType | null>(null);
  const [actionType, setActionType] = useState<'addBillingAddressId' | 'addShippingAddressId'>(
    'addBillingAddressId'
  );

  const shippingEditHandler = (value: AddressType) => () => {
    if (value.id === selectedItem) {
      setEditValue(value);
      setActionType('addShippingAddressId');
      addressEditModalHandler();
    }
  };

  const shippingDeleteHandler = (value: AddressType) => async () => {
    const actions: AddressActionType[] = [];
    if (value.id === selectedItem) {
      const action: AddressActionType = {
        action: 'removeShippingAddressId',
        addressId: value.id,
      };
      actions.push(action);
      try {
        await deleteAddress(actions);
        setDeleteAddressSnackbarNeeded(true);
        getUserInfo();
      } catch (err) {
        setWrongPersonalSnackbarNeeded(true);
      }
    }
  };

  const billingEditHandler = (value: AddressType) => () => {
    if (`${value.id}-billing` === selectedBillingItem) {
      setEditValue(value);
      setActionType('addBillingAddressId');
      addressEditModalHandler();
    }
  };

  const billingDeleteHandler = (value: AddressType) => async () => {
    const actions: AddressActionType[] = [];
    if (`${value.id}-billing` === selectedBillingItem) {
      const action: AddressActionType = {
        action: 'removeBillingAddressId',
        addressId: value.id,
      };
      actions.push(action);
      try {
        await deleteAddress(actions);
        setDeleteAddressSnackbarNeeded(true);
        getUserInfo();
        if (data) {
          updateAddresses(data);
        }
      } catch (err) {
        setWrongPersonalSnackbarNeeded(true);
      }
    }
  };

  const handleToggle = (value: string) => () => {
    setSelectedItem(value === selectedItem ? '' : value);
  };

  const handleBillingToggle = (value: string) => () => {
    setSelectedBillingItem(value === selectedBillingItem ? '' : value);
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
        <Grid
          style={{ border: '1px solid black', borderRadius: '5px', padding: '10px' }}
          item
          xs={12}
        >
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography style={{ fontWeight: 600, fontSize: '18px' }}>
                Shipping addresses
              </Typography>
              <Button
                size='small'
                type='button'
                onClick={addressShippingModalHandler}
                style={{ margin: 10, alignSelf: 'center' }}
                color='info'
                variant='contained'
              >
                add new
              </Button>
            </div>

            <List style={{ width: '100%', minWidth: '410px' }}>
              {shippingAddresses.map((value) => {
                const labelId = `checkbox-list-label-${value.id}`;

                return (
                  <ListItem key={value.id} role={undefined} dense onClick={handleToggle(value.id)}>
                    <ListItemIcon>
                      <Checkbox
                        edge='start'
                        checked={value.id === selectedItem}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={
                        <Typography>
                          {`${value.country}, ${value.city}, ${value.streetName}, ${value.postalCode} `}
                          <span style={{ color: 'blue' }}>{value.default}</span>
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={shippingEditHandler(value)} edge='end' aria-label=''>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={shippingDeleteHandler(value)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography style={{ fontWeight: 600, fontSize: '18px' }}>
                Billing addresses
              </Typography>
              <Button
                size='small'
                type='button'
                onClick={addressBillingModalHandler}
                style={{ margin: 10, alignSelf: 'center' }}
                color='info'
                variant='contained'
              >
                add new
              </Button>
            </div>
            <List style={{ width: '100%', minWidth: '410px' }}>
              {billingAddresses.map((value) => {
                const labelId = `checkbox-list-label-billing-${value.id}`;

                return (
                  <ListItem
                    key={`${value.id}-billing`}
                    role={undefined}
                    dense
                    onClick={handleBillingToggle(`${value.id}-billing`)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge='start'
                        checked={`${value.id}-billing` === selectedBillingItem}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={
                        <Typography>
                          {`${value.country}, ${value.city}, ${value.streetName}, ${value.postalCode} `}
                          <span style={{ color: 'blue' }}>{value.default}</span>
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={billingEditHandler(value)} edge='end' aria-label=''>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={billingDeleteHandler(value)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>

        {passwordModalOpen && <PasswordModal setPasswordModalFalse={setPasswordModalFalse} />}
        {addressShippingModalOpen && (
          <AddressModal
            setAddressModalFalse={setShippingAddressModalFalse}
            getUserInfo={getUserInfo}
            actionType='addShippingAddressId'
          />
        )}
        {addressBillingModalOpen && (
          <AddressModal
            setAddressModalFalse={setBillingAddressModalFalse}
            getUserInfo={getUserInfo}
            actionType='addBillingAddressId'
          />
        )}
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
        {deleteAddressSnackbarNeeded && (
          <SimpleSnackbar colorName='success' text='Address deleted!' closeModal={snackbarClose} />
        )}
        {addressEditModalOpen && (
          <EditAddressModal
            setAddressModalFalse={setAddressEditModalFalse}
            getUserInfo={getUserInfo}
            editValue={editValue}
            actionType={actionType}
          />
        )}
      </Box>
    </Container>
  );
}

export default EditProfileMode;
