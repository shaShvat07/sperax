import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { supabase } from '../../utils/supabase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert('Check your email for the login link!');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          position: 'absolute',
          top: '200px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Typography component="h1" variant="h2">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            sx={{
              input: {
                color: 'white',
                borderColor: 'white',
                backgroundColor: 'black'
              },
              '& .MuiFormLabel-root': {
                color: 'white',
              }
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            sx={{
              input: {
                color: 'white',
                borderColor: 'white',
                backgroundColor: 'black'
              },
              '& .MuiFormLabel-root': {
                color: 'white',
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;