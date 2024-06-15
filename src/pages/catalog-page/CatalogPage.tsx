/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Drawer,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  TextField,
  ListItem,
  CardActions,
  Backdrop,
  Snackbar,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Header from '../../components/header/Header';

import { GetProducts, MainPageProduct } from '../../service/ProductService';
import { AddItemToCart } from '../../service/CartService'; // Assuming these are imported from CartService
import './catalogPage.scss';

function CatalogPage() {
  const [products, setProducts] = useState<MainPageProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [triggerSearch, setTriggerSearch] = useState<number>(0); // New state for search trigger
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')ж
  const navigate: NavigateFunction = useNavigate();

  const fetchProducts = async (sortOption: string, searchQuery: string) => {
    setLoading(true);
    try {
      const fetchedProducts = await GetProducts(sortOption, searchQuery);
      if (fetchedProducts) {
        setProducts(fetchedProducts);
      } else {
        setError(new Error('Failed to fetch products'));
      }
    } catch (fetchError) {
      setError(fetchError as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchProducts(sortOption, searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption, triggerSearch]);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setTriggerSearch((prev) => prev + 1);
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/catalog/${category}`);
  };

  const handleAddToCart = async (event: React.MouseEvent, productId: string) => {
    event.stopPropagation();
    setAddingToCart(true);
    try {
      await AddItemToCart(productId);
      setSnackbarMessage('Item successfully added to cart!');
    } catch (error) {
      setSnackbarMessage('Failed to add item to cart.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
  };

  if (loading) {
    return (
      <Container maxWidth={false}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth={false}>
        <Alert severity='error'>{error.message}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100vh' }}
      >
        <Grid container spacing={2} style={{ flex: 1 }}>
          <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Card>
                  <Typography variant='h6'>Categories</Typography>
                  <CardContent>
                    <ListItem>
                      <Button onClick={() => handleCategoryClick('biography')}>Biography</Button>
                    </ListItem>
                    <ListItem>
                      <Button onClick={() => handleCategoryClick('fiction')}>Fiction</Button>
                    </ListItem>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Typography variant='h4' gutterBottom>
                MainPage
              </Typography>
              <div>
                <TextField
                  label='Search'
                  value={searchQuery}
                  onChange={handleSearchChange}
                  variant='outlined'
                  size='small'
                  style={{ marginRight: '10px' }}
                />
                <Button variant='contained' onClick={handleSearchClick}>
                  Search
                </Button>
              </div>
              <Button
                variant='outlined'
                onClick={toggleDrawer(true)}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                Filters
              </Button>
            </Grid>
            <div style={{ width: 250 }}>
              <FormControl fullWidth variant='outlined' margin='normal'>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortOption} onChange={handleSortChange} label='Sort By'>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='price asc'>Price Ascending</MenuItem>
                  <MenuItem value='price desc'>Price Descending</MenuItem>
                  <MenuItem value='name.en-US asc'>Name Ascending</MenuItem>
                  <MenuItem value='name.en-US desc'>Name Descending</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Grid container spacing={2} display='flex'>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={6} lg={3}>
                  <Card onClick={() => navigate(`/product/${product.id}`)} className='card'>
                    {product.image && (
                      <Box className='box-img'>
                        <CardMedia
                          component='img'
                          height='500'
                          image={product.image}
                          alt={product.title}
                        />
                      </Box>
                    )}
                    <CardContent className='card-content'>
                      <Typography variant='h6'>{product.title}</Typography>
                      <Typography variant='body2' color='textSecondary'>
                        Author: {product.author}
                      </Typography>
                      {product.discount ? (
                        <Box display='flex' justifyContent='space-between'>
                          <Typography variant='body2' color='textPrimary' className='old-price'>
                            Price: ${product.price.toFixed(2)}
                          </Typography>
                          <Typography variant='body2' color='green' fontSize='18px'>
                            Price: ${product.discount.toFixed(2)}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant='body2' color='textPrimary'>
                          Price: ${product.price.toFixed(2)}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        variant='outlined'
                        startIcon={<AddShoppingCartIcon />}
                        onClick={(event) => handleAddToCart(event, product.id)}
                        disabled={addingToCart}
                      >
                        Add to cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Drawer
          anchor='left'
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <Box
            sx={{
              width: { xs: '100vw', sm: '50vw' },
              height: '100%',
            }}
          >
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
            <CardContent>
              <Card>
                <Typography variant='h6'>Categories</Typography>
                <CardContent>
                  <ListItem>
                    <Button onClick={() => handleCategoryClick('biography')}>Biography</Button>
                  </ListItem>
                  <ListItem>
                    <Button onClick={() => handleCategoryClick('fiction')}>Fiction</Button>
                  </ListItem>
                </CardContent>
              </Card>
            </CardContent>
          </Box>
        </Drawer>
      </Container>
      <Backdrop open={addingToCart} style={{ zIndex: 1300 }}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </>
  );
}

export default CatalogPage;
