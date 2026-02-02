import { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { login } from '../services/api';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      localStorage.setItem('token', data.token);
      const userData = { userId: data.userId, username: data.username };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
          Social
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Connect with the world
        </Typography>
        
        <Paper elevation={0} sx={{ p: 4, width: '100%', borderRadius: 4, border: '1px solid #eee' }}>
          <Typography variant="h5" align="center" sx={{ fontWeight: 600, mb: 3 }}>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
            <Button 
              fullWidth 
              variant="contained" 
              type="submit" 
              sx={{ 
                mt: 4, 
                mb: 2, 
                py: 1.5, 
                borderRadius: 2, 
                textTransform: 'none', 
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none' }
              }}
            >
              Login
            </Button>
            <Box textAlign="center" sx={{ mt: 2 }}>
              <Link component={RouterLink} to="/signup" variant="body2" sx={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
                Don't have an account? Sign Up
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
