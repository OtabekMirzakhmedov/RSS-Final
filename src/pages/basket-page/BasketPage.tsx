/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import {
  // Checkbox,
  Container,
  CssBaseline,
  // IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
} from '@mui/material';

// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { GetCartItems } from '../../service/CartService';
import Header from '../../components/header/Header';
import { GetProductById } from '../../service/ProductService';

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

  const incrementQuantity = (id: string) => {
    setCartItems(
      cartItems.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      ) // add request for changing quantity
    );
  };

  const decrementQuantity = (id: string) => {
    setCartItems(
      cartItems.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(1, product.quantity - 1) } : product
      ) // add request for changing quantity
    );
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
                      <Button type='button' onClick={() => decrementQuantity(product.id)}>
                        -
                      </Button>
                      {product.quantity}
                      <Button type='button' onClick={() => incrementQuantity(product.id)}>
                        +
                      </Button>
                    </TableCell>
                    <TableCell>
                      {product.totalPrice.centAmount} {product.totalPrice.currencyCode}
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
      </Container>
    </>
  );
}

export default BasketPage;
