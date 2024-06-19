/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeItemQuantity, GetCartItems, RemoveItemFromCart } from '../../service/CartService';
import Header from '../../components/header/Header';
import { GetProductById } from '../../service/ProductService';
import SimpleSnackbar from '../../components/SimpleSnackbar/SimpleSnackbar';

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
}

interface CartData {
  totalLineItemQuantity: number;
  totalPrice: { type: string; currencyCode: string; centAmount: number; fractionDigits: number };
}

function BasketPage() {
  const [cartItems, setCartItems] = useState<LineItemType[]>([]);
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const getCart = async () => {
    try {
      const response = await GetCartItems();
      if (response) {
        setCartItems(response.lineItems);
        setCartData(response);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error with getting the cart:', err);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const fetchProductDetails = async (productId: string) => {
    try {
      const productDetails = await GetProductById(productId);
      if (productDetails) {
        return productDetails;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error fetching product details:', err);
    }
  };

  const getItemsWithImages = async () => {
    let items: string[] = [];
    try {
      const productPromises = cartItems.map((item) => fetchProductDetails(item.productId));
      const products = await Promise.all(productPromises);
      items = products
        .map((product) => product?.images[0])
        .filter((image): image is string => !!image);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error fetching product images:', err);
    }
    return items;
  };

  useEffect(() => {
    getItemsWithImages().then((items) => {
      setImages(items);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const incrementQuantity = async (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );

    await ChangeItemQuantity(id, quantity + 1);
    await getCart();
  };

  const decrementQuantity = async (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(1, product.quantity - 1) } : product
      )
    );

    await ChangeItemQuantity(id, quantity - 1);
    await getCart();
  };

  const [deleteProductSnackbarNeeded, setDeleteProductSnackbarNeeded] = useState(false);
  const deleteHandler = (value: string) => async () => {
    try {
      await RemoveItemFromCart(value);
      setDeleteProductSnackbarNeeded(true);
      getCart();
    } catch (err) {
      setDeleteProductSnackbarNeeded(false);
    }
  };

  const snackbarClose = () => {
    setDeleteProductSnackbarNeeded(false);
  };

  return (
    <>
      <Header />
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
              style={{
                minWidth: 850,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={images[index]}
                        alt={product.name['en-US']}
                        style={{ width: '50px', margin: '10px', float: 'left' }}
                      />
                      <span>{product.name['en-US']}</span>
                    </TableCell>
                    <TableCell>
                      {product.price.value.centAmount} {product.price.value.currencyCode}
                    </TableCell>
                    <TableCell style={{ height: '128.5px', display: 'flex', alignItems: 'center' }}>
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
                    <TableCell>
                      {product.totalPrice.centAmount} {product.totalPrice.currencyCode}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={deleteHandler(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell colSpan={2}>{cartData?.totalLineItemQuantity}</TableCell>
                  <TableCell>
                    {cartData?.totalPrice.centAmount} {cartData?.totalPrice.currencyCode}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Box>
        {deleteProductSnackbarNeeded && (
          <SimpleSnackbar colorName='success' text='Item deleted!' closeModal={snackbarClose} />
        )}
      </Container>
    </>
  );
}

export default BasketPage;
