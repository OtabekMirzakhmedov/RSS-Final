import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

interface Props {
  exitEditMode: () => void;
}

function EditProfileMode({ exitEditMode }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button onClick={() => exitEditMode()}>Go back</Button>
            <TextField fullWidth id='firstName' label='First Name' type='text' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth id='lastName' label='Last Name' />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='birthDate'
              label='Date of Birth'
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth id='email' label='Email Address' type='text' />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Password'
              type={showPassword ? 'text' : 'password'}
              id='password'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Shipping Address' />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField fullWidth label='Street' type='text' id='street' />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default EditProfileMode;
