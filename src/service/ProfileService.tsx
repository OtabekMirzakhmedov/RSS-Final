/* eslint-disable no-console */

import axios, { AxiosError, AxiosResponse } from 'axios';

interface AddressType {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
  default?: string;
}

interface PasswordForm {
  password: string;
  repeatPassword: string;
  currentPassword: string;
}

interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: AddressType[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
}

interface UpdateResponse {
  version: number;
}

interface PersonalActionType {
  action: 'changeEmail' | 'setFirstName' | 'setLastName' | 'setDateOfBirth';
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

const projectKey = 'rss-final-commerce';
const host = 'https://api.eu-central-1.aws.commercetools.com';

// eslint-disable-next-line consistent-return
export const getUser = async () => {
  let result = null;
  const id = localStorage.getItem('id');
  try {
    const response: AxiosResponse<UserResponse> = await axios.get<UserResponse>(
      `${host}/${projectKey}/customers/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    result = response.data;
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorResponseData = axiosError.response.data;
        console.error('Error:', errorResponseData);
      }
    } else {
      console.error('Error:', error);
      throw error;
    }
  }
};

export const updateUser = async (actions: PersonalActionType[]) => {
  let result = null;
  const id = localStorage.getItem('id');
  const versionString = localStorage?.getItem('version');
  const version = Number(versionString);

  const response: AxiosResponse<UpdateResponse> = await axios.post<UpdateResponse>(
    `${host}/${projectKey}/customers/${id}`,
    {
      version,
      actions,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  result = response.data.version;
  localStorage.setItem('version', result.toString());
};

export const updatePassword = async (data: PasswordForm) => {
  let result = null;
  const id = localStorage.getItem('id');
  const versionString = localStorage?.getItem('version');
  const version = Number(versionString);

  try {
    const response: AxiosResponse<UpdateResponse> = await axios.post<UpdateResponse>(
      `${host}/${projectKey}/customers/password`,
      {
        id,
        version,
        currentPassword: data.currentPassword,
        newPassword: data.repeatPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    result = response.data.version;
    localStorage.setItem('version', result.toString());

    return {
      success: true,
      message: 'Password changed successfully!',
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: 'An error occurred during password changing.',
    };
  }
};
