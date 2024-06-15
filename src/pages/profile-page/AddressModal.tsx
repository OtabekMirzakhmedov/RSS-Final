/* eslint-disable react/jsx-props-no-spreading */
import {
  Grid,
  TextField,
  Button,
  Modal,
  CssBaseline,
  Container,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormValidationMessages from '../pages-types/validateTypes';
import SimpleSnackbar from '../../components/SimpleSnackbar/SimpleSnackbar';
import { addAddress, setDetailedAddress } from '../../service/ProfileService';

interface AddressForm {
  street: string;
  city: string;
  country: string;
  postal: string;
  defaultAddress: boolean;
}

interface AddAddressType {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface AddAddressActionType {
  action: 'addAddress';
  address: AddAddressType;
}

interface AddressIdActionType {
  action: 'addBillingAddressId' | 'addShippingAddressId';
  addressId: string;
}

interface DefaultActionType {
  action: 'setDefaultShippingAddress' | 'setDefaultBillingAddress';
  addressId: string;
}

interface Response {
  success: boolean;
  message: string;
  newAddressId?: string;
}

interface Props {
  setAddressModalFalse: () => void;
  getUserInfo: () => void;
  actionType: 'addBillingAddressId' | 'addShippingAddressId';
}

export default function AddAddressMOdal({ setAddressModalFalse, getUserInfo, actionType }: Props) {
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
    reset,
  } = useForm<AddressForm>({
    mode: 'onChange',
    defaultValues: {
      country: 'US',
    },
  });

  const [open, setOpen] = useState(true);
  const [addressSnackbarNeeded, setAddressSnackbarNeeded] = useState(false);
  const [wrongAddressSnackbarNeeded, setWrongAddressSnackbarNeeded] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setAddressModalFalse();
    reset();
  };

  const snackbarClose = () => {
    setAddressSnackbarNeeded(false);
  };

  const onSubmit = async (data: AddressForm): Promise<void> => {
    const actions: AddAddressActionType[] = [];
    const addressData: AddAddressType = {
      streetName: data.street,
      postalCode: data.postal,
      city: data.city,
      country: data.country,
    };
    const action: AddAddressActionType = {
      action: 'addAddress',
      address: addressData,
    };
    actions.push(action);

    try {
      const response: Response = await addAddress(actions);
      if (response.success && response.newAddressId) {
        const addressIdAction: AddressIdActionType = {
          action: actionType,
          addressId: response.newAddressId,
        };

        if (data.defaultAddress) {
          const defaultAction: DefaultActionType = {
            action:
              actionType === 'addShippingAddressId'
                ? 'setDefaultShippingAddress'
                : 'setDefaultBillingAddress',
            addressId: response.newAddressId,
          };
          await setDetailedAddress([addressIdAction, defaultAction]);
        } else {
          await setDetailedAddress([addressIdAction]);
        }

        setAddressSnackbarNeeded(true);
        getUserInfo();
      } else {
        setWrongAddressSnackbarNeeded(true);
      }
    } catch (err) {
      throw new Error(`error}`);
    }
  };

  const country = watch('country');

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
            {actionType === 'addShippingAddressId' && (
              <h2 id='simple-modal-title'>Shipping Address Creation</h2>
            )}
            {actionType === 'addBillingAddressId' && (
              <h2 id='simple-modal-title'>Billing Address Creation</h2>
            )}
            <form id='simple-modal-description' onSubmit={handleSubmit(onSubmit)}>
              <Grid item xs={12}>
                <TextField
                  size='small'
                  margin='normal'
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
                  size='small'
                  fullWidth
                  margin='normal'
                  type='text'
                  label='City'
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
                <FormControl size='small' fullWidth margin='normal'>
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
                  size='small'
                  margin='normal'
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
              {actionType === 'addShippingAddressId' && (
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox {...register('defaultAddress')} defaultChecked={false} />}
                    label='Default Shipping Address'
                  />
                </Grid>
              )}
              {actionType === 'addBillingAddressId' && (
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox {...register('defaultAddress')} defaultChecked={false} />}
                    label='Default Billing Address'
                  />
                </Grid>
              )}

              <Button
                fullWidth
                type='submit'
                style={{ margin: 10, alignSelf: 'flex-end' }}
                variant='contained'
                color='success'
              >
                Save address
              </Button>
            </form>
            <Button
              fullWidth
              style={{ margin: 10, alignSelf: 'flex-end' }}
              variant='contained'
              color='error'
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Modal>
        {addressSnackbarNeeded && (
          <SimpleSnackbar
            colorName='success'
            text='New address added successfully!'
            closeModal={snackbarClose}
          />
        )}
        {wrongAddressSnackbarNeeded && (
          <SimpleSnackbar
            colorName='error'
            text='Enter valid data, please!'
            closeModal={snackbarClose}
          />
        )}
      </Box>
    </Container>
  );
}
