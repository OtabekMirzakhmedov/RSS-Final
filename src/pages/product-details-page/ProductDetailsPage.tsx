import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Paper,
} from '@mui/material';
import Header from '../../components/header/Header';
import { GetProductById } from '../../service/ProductService';

interface ProductDetails {
  id: string;
  title: string;
  author?: string;
  images?: string[];
  price: number;
  description: string;
  isbn: string;
  publisherName: string;
  pages: number;
}

function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      const productDetails = await GetProductById(productId!);
      if (productDetails) {
        setProduct(productDetails);
        setMainImage(
          productDetails.images && productDetails.images.length > 0
            ? productDetails.images[0]
            : null
        );
      } else {
        setError('Failed to fetch product details');
      }
      setLoading(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchProductDetails();
  }, [productId]);

  const handleImageClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  if (loading) {
    return (
      <Container
        maxWidth={false}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth={false}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h6' color='error'>
          {error}
        </Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container
        maxWidth={false}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h6'>Product not found</Typography>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth={false} style={{ padding: '20px', minHeight: '100vh' }}>
        <Typography variant='h4' gutterBottom>
          Product Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {mainImage && (
                <CardMedia
                  component='img'
                  src={mainImage}
                  alt={product.title}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: 400,
                    objectFit: 'contain',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImageClick(mainImage)}
                />
              )}
              {product.images && product.images.length > 1 && (
                <Box mt={2} display='flex' justifyContent='center'>
                  {product.images.map((image, index) => (
                    <Paper
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      style={{
                        margin: '0 5px',
                        padding: '5px',
                        cursor: 'pointer',
                        border: mainImage === image ? '2px solid blue' : 'none',
                      }}
                      onClick={() => handleImageClick(image)}
                    >
                      <CardMedia component='img' src={image} alt={product.title} height='80' />
                    </Paper>
                  ))}
                </Box>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card style={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant='subtitle1' color='textSecondary' gutterBottom>
                  Author: {product.author ?? 'Unknown'}
                </Typography>
                <Typography variant='body1' gutterBottom>
                  Description: {product.description}
                </Typography>
                <Typography variant='body2' color='textPrimary'>
                  Price: ${product.price.toFixed(2)}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  ISBN: {product.isbn}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Publisher: {product.publisherName}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Pages: {product.pages}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProductDetailsPage;
