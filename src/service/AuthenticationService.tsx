/* eslint-disable no-console */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ResponseCheck } from '../pages/pages-types/pageTypes';
import ResponseCode from './AuthenticationTypes';

const projectKey = 'rss-final-commerce';
const clientSecret = '2LueY3l6v5jSwKM5gaYnEnu0jIYtSoLt';
const clientId = 'vv_pT9_J_BP03Aa0cqeZfeWD';
const authUrl = 'https://auth.eu-central-1.aws.commercetools.com';
const authString = `${clientId}:${clientSecret}`;
const encodedAuthString = btoa(authString);
const host = 'https://api.eu-central-1.aws.commercetools.com';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

interface SignupData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface CreateUserResponse {
  customer: {
    id: string;
    version: number;
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
}

type InitialTokenResponse = Omit<TokenResponse, 'expires_in' | 'refresh_token'>;

interface EmailVerifyResponse {
  count: number;
  results: [
    {
      id: string;
      version: number;
    },
  ];
}
export const getAccessToken = async () => {
  try {
    const response: AxiosResponse<InitialTokenResponse> = await axios.post<TokenResponse>(
      `${authUrl}/oauth/token`,
      '',
      {
        params: {
          grant_type: 'client_credentials',
        },
        headers: {
          Authorization: `Basic ${encodedAuthString}`,
        },
      }
    );
    localStorage.setItem('initial_token', response.data.access_token);
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

export const login = async (email: string, password: string) => {
  let result = null;

  try {
    const response: AxiosResponse<TokenResponse> = await axios.post<TokenResponse>(
      `${authUrl}/oauth/${projectKey}/customers/token`,
      '',
      {
        params: {
          grant_type: 'password',
          username: email,
          password,
        },
        headers: {
          Authorization: `Basic ${encodedAuthString}`,
        },
      }
    );
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorResponseStatus = axiosError.response.status;
        if (errorResponseStatus === ResponseCode.BadRequest) {
          result = errorResponseStatus;
        }
      }
    } else {
      console.error('Error:', error);
      throw error;
    }
  }
  return result;
};

export const checkEmail = async (emailAddress: string, password: string) => {
  let errorText = '';
  try {
    const config = {
      body: '',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('initial_token')}`,
      },
      params: {
        limit: 1,
        offset: 0,
        where: `email="${emailAddress}"`,
      },
    };

    const response = await axios.get<EmailVerifyResponse>(
      `${host}/${projectKey}/customers`,
      config
    );

    if (response.data.count === 1) {
      errorText = 'No error!';
      console.log(response.data.results[0].id);
      localStorage.setItem('id', response.data.results[0].id);
      localStorage.setItem('version', response.data.results[0].version.toString());
      const resp = await login(emailAddress, password);
      if (resp === ResponseCode.BadRequest) {
        errorText = ResponseCheck.WrongPassword;
      }
    } else {
      errorText = ResponseCheck.NotRegistered;
    }
  } catch (error) {
    console.log(error);
  }

  return errorText;
};

export const createAccount = async (signUpData: SignupData): Promise<ApiResponse> => {
  const initialToken = localStorage.getItem('initial_token');
  const tokenValue = initialToken ? `Bearer ${initialToken}` : '';
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${host}/${projectKey}/me/signup`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: tokenValue,
    },
    data: signUpData,
  };

  try {
    const resp = await axios.request<CreateUserResponse>(config);
    localStorage.setItem('id', resp.data.customer.id);
    localStorage.setItem('version', resp.data.customer.version.toString());
    return {
      success: true,
      message: 'Account created successfully!',
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
      message: 'An error occurred during registration.',
    };
  }
};
