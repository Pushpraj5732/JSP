import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import {
  LockOutlined as LockIcon,
  Email as EmailIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import LanguageSwitcher from '../components/LanguageSwitcher';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError(t('auth.fillAllFields'));
      return;
    }

    setLoading(true);
    setError('');

    // Simulate login - In production, this would call an API
    setTimeout(() => {
      // Mock authentication
      const mockUsers = [
        { email: 'patient@example.com', password: 'patient123', role: 'patient', name: 'John Patient' },
        { email: 'doctor@example.com', password: 'doctor123', role: 'doctor', name: 'Dr. Smith' },
        { email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin User' }
      ];

      const user = mockUsers.find(u => 
        u.email === formData.email && 
        u.password === formData.password &&
        u.role === formData.role
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          role: user.role,
          name: user.name
        }));
        navigate(`/${user.role}/dashboard`);
      } else {
        // For demo purposes, accept any login with the selected role
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          role: formData.role,
          name: formData.email.split('@')[0]
        }));
        navigate(`/${formData.role}/dashboard`);
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: 4
        }}
      >
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={6}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 3,
            }}
          >
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <LanguageSwitcher />
            </Box>

            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
              <LockIcon fontSize="large" />
            </Avatar>

            <Typography component="h1" variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
              {t('auth.loginTitle')}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
              {t('auth.loginSubtitle')}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('auth.email')}
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleInputChange('email')}
                InputProps={{
                  startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('auth.password')}
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange('password')}
                InputProps={{
                  startAdornment: <LockIcon color="action" sx={{ mr: 1 }} />
                }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">{t('auth.role')}</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={formData.role}
                  label={t('auth.role')}
                  onChange={handleInputChange('role')}
                  startAdornment={<PersonIcon color="action" sx={{ mr: 1 }} />}
                >
                  <MenuItem value="patient">{t('auth.patient')}</MenuItem>
                  <MenuItem value="doctor">{t('auth.doctor')}</MenuItem>
                  <MenuItem value="admin">{t('auth.admin')}</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
              >
                {loading ? t('common.loading') : t('nav.login')}
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {t('auth.noAccount')}{' '}
                  <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
                    {t('nav.register')}
                  </Link>
                </Typography>
              </Box>

              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  <strong>Demo Credentials:</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Patient: patient@example.com / patient123
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Doctor: doctor@example.com / doctor123
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Admin: admin@example.com / admin123
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
