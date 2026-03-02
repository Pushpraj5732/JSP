import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  Fade
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  LocalHospital as HospitalIcon
} from '@mui/icons-material';
import DashboardLayout from '../layouts/DashboardLayout';
import HospitalTable from '../components/HospitalTable';
import hospitalService from '../services/hospitalService';

const Hospitals = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalHospitals, setTotalHospitals] = useState(0);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await hospitalService.getAllHospitals();
      
      if (response.success) {
        setHospitals(response.hospitals);
        setFilteredHospitals(response.hospitals);
        setTotalHospitals(response.metadata.totalHospitals);
      } else {
        setError('Failed to fetch hospitals');
      }
    } catch (err) {
      console.error('Error fetching hospitals:', err);
      setError(t('hospitals.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredHospitals(hospitals);
      return;
    }

    const filtered = hospitals.filter(hospital => 
      hospital.hospitalName?.toLowerCase().includes(query) ||
      hospital.address?.toLowerCase().includes(query) ||
      hospital.type?.toLowerCase().includes(query)
    );
    
    setFilteredHospitals(filtered);
  };

  const handleViewDoctors = (hospital) => {
    navigate('/doctors', { state: { hospitalId: hospital.id, hospitalName: hospital.hospitalName } });
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role || 'patient';

  return (
    <DashboardLayout role={userRole}>
      <Fade in={true}>
        <Box>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {t('hospitals.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('hospitals.subtitle')}
            </Typography>
          </Box>

          {/* Stats Card */}
          <Card sx={{ mb: 3, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <HospitalIcon fontSize="large" />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {totalHospitals}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {t('hospitals.totalHospitals')}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3 }}
              action={
                <Button color="inherit" size="small" onClick={fetchHospitals}>
                  {t('common.tryAgain')}
                </Button>
              }
            >
              {error}
            </Alert>
          )}

          {/* Search Bar */}
          <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={t('hospitals.searchPlaceholder')}
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                backgroundColor: 'background.paper',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
            <Button
              variant="outlined"
              onClick={fetchHospitals}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
              sx={{ minWidth: 120, borderRadius: 2 }}
            >
              {t('common.refresh')}
            </Button>
          </Box>

          {/* Results Count */}
          {!loading && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Showing {filteredHospitals.length} of {totalHospitals} hospitals
            </Typography>
          )}

          {/* Hospitals Table */}
          <HospitalTable 
            hospitals={filteredHospitals} 
            onViewDoctors={handleViewDoctors}
            loading={loading}
          />
        </Box>
      </Fade>
    </DashboardLayout>
  );
};

export default Hospitals;
