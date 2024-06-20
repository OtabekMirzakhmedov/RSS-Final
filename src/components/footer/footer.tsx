import { AppBar, Toolbar, Typography, Box, Container, Link } from '@mui/material';

function Footer() {
  return (
    <AppBar position='static' color='primary'>
      <Container>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Box display='flex' alignItems='center'>
              <Link href='https://rs.school/' target='_blank' rel='noopener'>
                <img src='/logo.png' alt='Logo' style={{ filter: 'invert(100%)', width: 100 }} />
              </Link>
            </Box>
          </Typography>
          <Typography variant='body1' color='inherit'>
            &copy; {new Date().getFullYear()}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
