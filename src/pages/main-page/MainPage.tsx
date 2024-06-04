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
        <Typography variant='h1' gutterBottom>
          Welcome to Book Haven
        </Typography>
        <Typography variant='h4' gutterBottom>
          Your one-stop online shop for all your reading needs
        </Typography>
        <Typography variant='h5' gutterBottom>
          Browse our extensive catalog, find your next favorite book, and enjoy seamless shopping from the comfort of your home.
        </Typography>
        <Typography variant='h5' gutterBottom>
          Discover new releases, bestsellers, and timeless classics.
        </Typography>
        <Typography variant='h5' gutterBottom>
          Whether you are into fiction, non-fiction, or biographies, we have something for everyone.
        </Typography>
        <Typography variant='h6' gutterBottom>
          Start exploring now and immerse yourself in the world of books!
        </Typography>
      </Box>
    </>
  );
}

export default MainPage;
