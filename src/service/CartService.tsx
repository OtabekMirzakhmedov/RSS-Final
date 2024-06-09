/* eslint-disable no-console */
import axios from 'axios';

const projectKey = 'rss-final-commerce';
const host = 'https://api.eu-central-1.aws.commercetools.com';

export interface Cart {
  id: string;
  version: number;
  lineItems: LineItem[];
  totalPrice: {
    centAmount: number;
  };
}

interface LineItem {
  id: string;
  productId: string;
}

export const CreateCart = async (): Promise<Cart> => {
  const initialToken = localStorage.getItem('initial_token');
  const token = localStorage.getItem('token');
  let tokenValue = `Bearer ${initialToken}`;
  if (token) {
    tokenValue = `Bearer ${token}`;
  }
  const url = `${host}/${projectKey}/carts`;

  try {
    const response = await axios.post<Cart>(
      url,
      { currency: 'EUR' },
      {
        headers: {
          Authorization: tokenValue,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response);
    const cartData = response.data;
    localStorage.setItem('cartId', cartData.id);
    localStorage.setItem('cartVersion', cartData.version.toString());
    return cartData;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
};

export const AddItemToCart = async (productId: string) => {
  const initialToken = localStorage.getItem('initial_token');
  const token = localStorage.getItem('token');
  let tokenValue = `Bearer ${initialToken}`;
  if (token) {
    tokenValue = `Bearer ${token}`;
  }

  let cartId = localStorage.getItem('cartId');
  let cartVersion = localStorage.getItem('cartVersion');

  if (!cartId || !cartVersion) {
    const newCart = await CreateCart();
    cartId = newCart.id;
    cartVersion = newCart.version.toString();
  }

  const url = `${host}/${projectKey}/carts/${cartId}`;

  try {
    const response = await axios.post<Cart>(
      url,
      {
        version: parseInt(cartVersion, 10),
        actions: [
          {
            action: 'addLineItem',
            productId,
            quantity: 1,
          },
        ],
      },
      {
        headers: {
          Authorization: tokenValue,
        },
      }
    );

    const cartData = response.data;
    localStorage.setItem('cartId', cartData.id);
    localStorage.setItem('cartVersion', cartData.version.toString());
    console.log(cartData);
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};

export const CheckProductExists = async (productId: string): Promise<string | boolean> => {
  const initialToken = localStorage.getItem('initial_token');
  const token = localStorage.getItem('token');
  let tokenValue = `Bearer ${initialToken}`;
  if (token) {
    tokenValue = `Bearer ${token}`;
  }

  const cartId = localStorage.getItem('cartId');
  const cartVersion = localStorage.getItem('cartVersion');

  if (!cartId || !cartVersion) {
    return false;
  }

  const url = `${host}/${projectKey}/carts/${cartId}`;

  try {
    const response = await axios.get<Cart>(url, {
      headers: {
        Authorization: tokenValue,
      },
    });

    const cartData = response.data;
    localStorage.setItem('cartId', cartData.id);
    localStorage.setItem('cartVersion', cartData.version.toString());

    const lineItem = cartData.lineItems.find((item) => item.productId === productId);
    if (lineItem) {
      return lineItem.id;
    }
    return false;
  } catch (error) {
    console.error('Error checking product in cart:', error);
    return false;
  }
};

export const RemoveItemFromCart = async (lineItemId: string) => {
  const initialToken = localStorage.getItem('initial_token');
  const token = localStorage.getItem('token');
  let tokenValue = `Bearer ${initialToken}`;
  if (token) {
    tokenValue = `Bearer ${token}`;
  }

  let cartId = localStorage.getItem('cartId');
  let cartVersion = localStorage.getItem('cartVersion');

  if (!cartId || !cartVersion) {
    const newCart = await CreateCart();
    cartId = newCart.id;
    cartVersion = newCart.version.toString();
  }

  const url = `${host}/${projectKey}/carts/${cartId}`;

  try {
    const response = await axios.post<Cart>(
      url,
      {
        version: parseInt(cartVersion, 10),
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
          },
        ],
      },
      {
        headers: {
          Authorization: tokenValue,
        },
      }
    );

    const cartData = response.data;
    localStorage.setItem('cartId', cartData.id);
    localStorage.setItem('cartVersion', cartData.version.toString());
    console.log(cartData);
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};