/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from 'react';
import './basket.scss';
import {
  Box,
  Container,
  CssBaseline,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  CircularProgress,
  Backdrop,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AddDiscountToCart,
  ChangeItemQuantity,
  CreateCart,
  DeleteCart,
  GetCartItems,
  RemoveItemFromCart,
} from '../../service/CartService';
import Header from '../../components/header/Header';
import SimpleSnackbar from '../../components/SimpleSnackbar/SimpleSnackbar';
import ButtonCatalog from '../../components/buttons/button-catalog/ButtonCatalog';

interface LineItemType {
  id: string;
  name: {
    'en-US': string;
  };
  productId: string;
  quantity: number;
  price: {
    value: { currencyCode: string; centAmount: number; fractionDigits: number };
  };
  totalPrice: { currencyCode: string; centAmount: number; fractionDigits: number };
  variant: {
    images: ImageType[];
  };
}

interface ImageType {
  url: string;
}

interface CartData {
  totalLineItemQuantity: number;
  totalPrice: { type: string; currencyCode: string; centAmount: number; fractionDigits: number };
  lineItems?: LineItemType[];
  discountOnTotalPrice: {
    discountedAmount: {
      centAmount: number;
    };
  };
}

function BasketPage() {
  const initialCarData = {
    totalLineItemQuantity: 0,
    totalPrice: { type: '', currencyCode: '', centAmount: 0, fractionDigits: 0 },
    discountOnTotalPrice: {
      discountedAmount: {
        centAmount: 0,
      },
    },
  };
  const [cartItems, setCartItems] = useState<LineItemType[]>([]);
  const [cartData, setCartData] = useState<CartData>(initialCarData);
  const [loading, setLoading] = useState(false);
  const [deleteProductSnackbarNeeded, setDeleteProductSnackbarNeeded] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);

  const getCart = async () => {
    setLoading(true);
    try {
      const response = await GetCartItems();
      if (response) {
        setCartItems(response.lineItems);
        setCartData(response);
        if (response.lineItems.length === 0) {
          setEmptyCart(false);
        } else {
          setEmptyCart(true);
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error with getting the cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const incrementQuantity = async (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );

    const response: CartData | undefined = await ChangeItemQuantity(id, quantity + 1);
    if (response) {
      setCartItems(response.lineItems!);
      setCartData(response);
    }
  };

  const decrementQuantity = async (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(1, product.quantity - 1) } : product
      )
    );

    const response: CartData | undefined = await ChangeItemQuantity(id, quantity - 1);
    if (response) {
      setCartItems(response.lineItems!);
      setCartData(response);
    }
  };

  const deleteHandler = (value: string) => async () => {
    try {
      await RemoveItemFromCart(value);
      setDeleteProductSnackbarNeeded(true);
      await getCart();
    } catch (err) {
      setDeleteProductSnackbarNeeded(false);
    }
  };

  const snackbarClose = () => {
    setDeleteProductSnackbarNeeded(false);
  };

  const deleteCart = async () => {
    try {
      await DeleteCart();
      await CreateCart();
      getCart();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error deleting cart:', err);
    }
  };

  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [inactiveDiscount, setInactiveDiscount] = useState<boolean>(false);
  const [promoValue, setPromoValue] = useState<string>('');
  const handlePromoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoValue(event.target.value);
  };

  const handlePromoClick = async () => {
    if (promoValue === 'rss-final') {
      const discountedCartData = await AddDiscountToCart(promoValue);
      setCartData(discountedCartData);
      setDiscountApplied(true);
    } else {
      setInactiveDiscount(true);
    }
  };

  return (
    <>
      <Header />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {!emptyCart && (
            <Paper
              style={{
                boxShadow: 'none',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginBottom: '100px',
              }}
            >
              <img style={{ width: '60%' }} src='/shopping_cart.svg' alt='' />
              <h1 style={{ margin: '0', padding: '0' }}>Your cart is empty</h1>
              <p>
                Looks like you haven&apos;t added any books yet.
                <br /> Start your adventure in our book haven now!{' '}
              </p>
              <ButtonCatalog />
            </Paper>
          )}
          {emptyCart && (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  width: '400px',
                }}
              >
                <h1
                  style={{
                    width: '100%',
                  }}
                >
                  Your shopping cart
                </h1>
                <IconButton
                  style={{
                    alignItems: 'center',
                  }}
                  onClick={deleteCart}
                >
                  <p>clear all</p>
                  <DeleteIcon />
                </IconButton>
              </div>
              <Paper
                style={{
                  boxShadow: 'none',
                  width: '100%',
                  marginTop: 20,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Table
                  className='table'
                  style={{
                    minWidth: 850,
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell align='center'>Quantity</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img
                            src={product.variant.images[0]?.url}
                            alt={product.name['en-US']}
                            style={{ width: '50px', margin: '10px', float: 'left' }}
                          />
                          <span>{product.name['en-US']}</span>
                        </TableCell>
                        <TableCell className='cell'>
                          {`\u20AC${product.price.value.centAmount}`}
                        </TableCell>
                        <TableCell
                          style={{ height: '128.5px', display: 'flex', alignItems: 'center' }}
                        >
                          <Button
                            type='button'
                            onClick={() => decrementQuantity(product.id, product.quantity)}
                          >
                            -
                          </Button>
                          {product.quantity}
                          <Button
                            type='button'
                            onClick={() => incrementQuantity(product.id, product.quantity)}
                          >
                            +
                          </Button>
                        </TableCell>
                        <TableCell className='cell'>
                          {`\u20AC${product.totalPrice.centAmount}`}
                        </TableCell>
                        <TableCell
                          style={{
                            border: 'none',
                          }}
                        >
                          <IconButton onClick={deleteHandler(product.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <TextField
                            label='Enter promo code!'
                            placeholder='Your promo code'
                            onChange={handlePromoChange}
                            variant='outlined'
                            size='small'
                            style={{ marginRight: '10px' }}
                          />
                          <Button
                            size='medium'
                            color='secondary'
                            variant='contained'
                            onClick={handlePromoClick}
                          >
                            Apply
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell align='right' colSpan={2}>
                        <h4>Total</h4>
                      </TableCell>
                      <TableCell align='center' colSpan={1}>
                        <h4>{cartData?.totalLineItemQuantity}</h4>
                      </TableCell>
                      {discountApplied ? (
                        <TableCell
                          rowSpan={2}
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                          }}
                        >
                          <h4>{`\u20AC${cartData?.totalPrice.centAmount}`}</h4>
                          <div>
                            <p style={{ textDecoration: 'line-through', marginLeft: '10px' }}>
                              {`\u20AC${
                                cartData.totalPrice.centAmount +
                                cartData.discountOnTotalPrice.discountedAmount.centAmount
                              }`}
                            </p>
                            <p style={{ fontSize: '8px' }}>{'(Discount in 1000 \u20AC applied)'}</p>
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell
                          style={{
                            display: 'flex',
                          }}
                        >
                          <h4>{`\u20AC${cartData?.totalPrice.centAmount}`}</h4>
                        </TableCell>
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </>
          )}
        </Box>
        {deleteProductSnackbarNeeded && (
          <SimpleSnackbar colorName='success' text='Item deleted!' closeModal={snackbarClose} />
        )}
        {inactiveDiscount && (
          <SimpleSnackbar
            colorName='warning'
            text='Sorry! This is no valid promo code!'
            closeModal={snackbarClose}
          />
        )}
      </Container>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
}

export default BasketPage;
