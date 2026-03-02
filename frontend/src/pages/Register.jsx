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
  createTheme,
  Grid
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import LanguageSwitcher from '../components/LanguageSwitcher';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
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
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError(t('auth.fillAllFields'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate registration - In production, this would call an API
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        role: formData.role,
        name: formData.name
      }));
      navigate(`/${formData.role}/dashboard`);
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

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
              <PersonAddIcon fontSize="large" />
            </Avatar>

            <Typography component="h1" variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
              {t('auth.registerTitle')}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
              {t('auth.registerSubtitle')}
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
                id="name"
                label={t('auth.name')}
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleInputChange('name')}
                InputProps={{
                  startAdornment: <PersonIcon color="action" sx={{ mr: 1 }} />
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('auth.email')}
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                InputProps={{
                  startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />
                }}
              />

              <TextField
                margin="normal"
                fullWidth
                id="phone"
                label={t('auth.phone')}
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                InputProps={{
                  startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />
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
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('auth.password')}
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange('password')}
                InputProps={{
                  startAdornment: <LockIcon color="action" sx={{ mr: 1 }} />
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label={t('auth.confirmPassword')}
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                InputProps={{
                  startAdornment: <LockIcon color="action" sx={{ mr: 1 }} />
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
              >
                {loading ? t('common.loading') : t('nav.register')}
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {t('auth.haveAccount')}{' '}
                  <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
                    {t('nav.login')}
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
