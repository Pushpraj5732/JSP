import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Fade
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Refresh as RefreshIcon,
  LocalHospital as HospitalIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import DashboardLayout from '../layouts/DashboardLayout';
import DoctorTable from '../components/DoctorTable';
import AppointmentDialog from '../components/AppointmentDialog';
import doctorService from '../services/doctorService';

const Doctors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  
  const hospitalId = location.state?.hospitalId;
  const hospitalName = location.state?.hospitalName;

  useEffect(() => {
    if (hospitalId) {
      fetchDoctors();
    } else {
      // If no hospitalId, fetch all doctors
      fetchAllDoctors();
    }
  }, [hospitalId]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await doctorService.getDoctorsByHospitalId(hospitalId);
      
      if (response.success) {
        setDoctors(response.doctors);
      } else {
        setError('Failed to fetch doctors');
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError(t('doctors.error'));
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDoctors = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await doctorService.getAllDoctors();
      
      if (response.success) {
        setDoctors(response.doctors);
      } else {
        setError('Failed to fetch doctors');
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError(t('doctors.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setAppointmentDialogOpen(true);
  };

  const handleCloseAppointmentDialog = () => {
    setAppointmentDialogOpen(false);
    setSelectedDoctor(null);
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role || 'patient';

  // Mock hospital data for the dialog
  const mockHospital = hospitalId ? {
    id: hospitalId,
    hospitalName: hospitalName || 'Selected Hospital'
  } : {
    id: selectedDoctor?.hospitalId,
    hospitalName: 'Associated Hospital'
  };

  return (
    <DashboardLayout role={userRole}>
      <Fade in={true}>
        <Box>
          {/* Breadcrumbs */}
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />} 
            sx={{ mb: 2 }}
          >
            <Link 
              component="button"
              variant="body1"
              onClick={() => navigate('/hospitals')}
              underline="hover"
              sx={{ color: 'primary.main', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {t('nav.hospitals')}
            </Link>
            <Typography color="text.primary">{t('nav.doctors')}</Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {t('doctors.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {hospitalName 
                  ? `Doctors at ${hospitalName}`
                  : t('doctors.subtitle')
                }
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<BackIcon />}
              onClick={() => navigate('/hospitals')}
              sx={{ borderRadius: 2 }}
            >
              {t('doctors.backToHospitals')}
            </Button>
          </Box>

          {/* Hospital Info Card */}
          {hospitalName && (
            <Card sx={{ mb: 3, borderRadius: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <HospitalIcon fontSize="large" />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {hospitalName}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {doctors.length} doctors available
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3 }}
              action={
                <Button color="inherit" size="small" onClick={hospitalId ? fetchDoctors : fetchAllDoctors}>
                  {t('common.tryAgain')}
                </Button>
              }
            >
              {error}
            </Alert>
          )}

          {/* Refresh Button */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={hospitalId ? fetchDoctors : fetchAllDoctors}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
              sx={{ borderRadius: 2 }}
            >
              {t('common.refresh')}
            </Button>
          </Box>

          {/* Results Count */}
          {!loading && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Showing {doctors.length} doctors
            </Typography>
          )}

          {/* Doctors Table */}
          <DoctorTable 
            doctors={doctors} 
            onBookAppointment={handleBookAppointment}
            loading={loading}
          />

          {/* Appointment Dialog */}
          <AppointmentDialog
            open={appointmentDialogOpen}
            onClose={handleCloseAppointmentDialog}
            doctor={selectedDoctor}
            hospital={mockHospital}
          />
        </Box>
      </Fade>
    </DashboardLayout>
  );
};

export default Doctors;
