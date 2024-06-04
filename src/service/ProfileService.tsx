/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

import axios, { AxiosResponse } from 'axios';

interface AddressType {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
  default?: string;
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

const projectKey = 'rss-final-commerce';
const host = 'https://api.eu-central-1.aws.commercetools.com';

export const getUser = async () => {
  let result = null;
  const id = localStorage.getItem('id');
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
  console.log(result);
  return result;
};
