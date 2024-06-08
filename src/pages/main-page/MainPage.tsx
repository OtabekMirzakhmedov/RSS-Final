import { Typography, Box } from '@mui/material';
import Header from '../../components/header/Header';
import './mainPage.scss';

function MainPage() {
  return (
    <>
      <Header />
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        textAlign='center'
        px={5}
      >
        <Typography
          variant='h1'
          fontWeight='500'
          gutterBottom
          sx={{ fontSize: { xs: '3rem', md: '5rem' } }}
        >
          Welcome to Book Haven
        </Typography>
        <Typography variant='h4' gutterBottom sx={{ fontSize: { xs: '1.2rem', md: '2rem' } }}>
          Your one-stop online shop for all your reading needs
        </Typography>
        <Typography variant='h5' gutterBottom sx={{ fontSize: { xs: '1.2rem', md: '2rem' } }}>
          Browse our extensive catalog, find your next favorite book, and enjoy seamless shopping
          from the comfort of your home.
        </Typography>
        <Typography variant='h5' gutterBottom sx={{ fontSize: { xs: '1.2rem', md: '2rem' } }}>
          Discover new releases, bestsellers, and timeless classics.
        </Typography>
        <Typography variant='h5' gutterBottom sx={{ fontSize: { xs: '1.2rem', md: '2rem' } }}>
          Whether you are into fiction, non-fiction, or biographies, we have something for everyone.
        </Typography>
        <Typography variant='h6' gutterBottom sx={{ fontSize: { xs: '1.2rem', md: '2rem' } }}>
          Start exploring now and immerse yourself in the world of books!
        </Typography>
      </Box>
    </>
  );
}

export default MainPage;
