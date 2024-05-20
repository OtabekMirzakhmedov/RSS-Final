import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Header from '../../components/header/Header';

function NotFoundPage() {
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
          404
        </Typography>
        <Typography variant='h3' gutterBottom>
          The page you are looking for does not exist or has been moved. <br /> Please go back to
          the homepage.
        </Typography>
        <Button variant='contained' color='primary' component={Link} to='/'>
          Go back home
        </Button>
      </Box>
    </>
  );
}

export default NotFoundPage;
