import { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { signup } from '../services/api';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate('/login');
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
          Join our community today
        </Typography>

        <Paper elevation={0} sx={{ p: 4, width: '100%', borderRadius: 4, border: '1px solid #eee' }}>
          <Typography variant="h5" align="center" sx={{ fontWeight: 600, mb: 3 }}>Sign Up</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
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
              Sign Up
            </Button>
            <Box textAlign="center" sx={{ mt: 2 }}>
              <Link component={RouterLink} to="/login" variant="body2" sx={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
                Already have an account? Login
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;
