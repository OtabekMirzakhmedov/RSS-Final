import { Typography, Box, IconButton } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Header from '../../components/header/Header';
import './mainPage.scss';

function MainPage() {
  const handleCopyDiscount = async () => {
    const textToCopy = 'rss-final';
    await navigator.clipboard.writeText(textToCopy);
  };

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
        <div style={{ border: '1px dotted violet', padding: '10px', marginBottom: '40px' }}>
          <h1 style={{ color: 'purple' }}>Get your discount to start to explore our book haven!</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color='secondary' variant='h5'>
              rss-final
            </Typography>
            <IconButton color='default' onClick={handleCopyDiscount}>
              <FileCopyIcon />
            </IconButton>
            <h3 style={{ marginLeft: '10px' }}>{'Discount of 1000 \u20AC to each new customer'}</h3>
          </div>
        </div>
      </Box>
    </>
  );
}

export default MainPage;
