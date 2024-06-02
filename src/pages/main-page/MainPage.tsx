import { useEffect, useState } from 'react';
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
} from '@mui/material';
import Header from '../../components/header/Header';
import { GetProducts } from '../../service/ProductService';

interface MainPageProduct {
  id: string;
  title: string;
  author?: string;
  image?: string;
  price: number;
}

function MainPage() {
  const [products, setProducts] = useState<MainPageProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await GetProducts(sortOption);
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

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchProducts();
  }, [sortOption]);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
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
                <Typography variant='h6'>Filters</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Typography variant='h4' gutterBottom>
                MainPage
              </Typography>
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
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card>
                    {product.image && (
                      <CardMedia
                        component='img'
                        height='140'
                        image={product.image}
                        alt={product.title}
                      />
                    )}
                    <CardContent>
                      <Typography variant='h6'>{product.title}</Typography>
                      <Typography variant='body2' color='textSecondary'>
                        Author: {product.author}
                      </Typography>
                      <Typography variant='body2' color='textPrimary'>
                        Price: ${product.price.toFixed(2)}
                      </Typography>
                    </CardContent>
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
              <Typography variant='h6'>Filters</Typography>
            </CardContent>
          </Box>
        </Drawer>
      </Container>
    </>
  );
}

export default MainPage;
