import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Skeleton,
  Alert
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  CalendarToday as AppointmentIcon,
  Person as DoctorIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import DashboardLayout from '../layouts/DashboardLayout';
import hospitalService from '../services/hospitalService';
import appointmentService from '../services/appointmentService';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalHospitals: 0,
    totalAppointments: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch hospital count
      const hospitalResponse = await hospitalService.getAllHospitals();
      if (hospitalResponse.success) {
        setStats(prev => ({ ...prev, totalHospitals: hospitalResponse.metadata.totalHospitals }));
      }

      // Fetch user's appointments
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.email) {
        const appointmentResponse = await appointmentService.getAppointmentsByPatientEmail(user.email);
        if (appointmentResponse.success) {
          setStats(prev => ({ ...prev, totalAppointments: appointmentResponse.count }));
          setRecentAppointments(appointmentResponse.appointments.slice(0, 5));
        }
      }

      setError('');
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: 4
        } : {}
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" variant="body2" gutterBottom>
              {title}
            </Typography>
            {loading ? (
              <Skeleton variant="text" width={60} height={48} />
            ) : (
              <Typography variant="h3" fontWeight="bold" color={`${color}.main`}>
                {value}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: `${color}.light`,
              color: `${color}.main`
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return 'success';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <DashboardLayout role="patient">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {t('dashboard.patientTitle')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('dashboard.welcome')} back! Here's your health overview.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title={t('dashboard.totalHospitals')}
            value={stats.totalHospitals}
            icon={<HospitalIcon fontSize="large" />}
            color="primary"
            onClick={() => navigate('/hospitals')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title={t('dashboard.totalAppointments')}
            value={stats.totalAppointments}
            icon={<AppointmentIcon fontSize="large" />}
            color="success"
            onClick={() => navigate('/my-appointments')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Quick Actions"
            value=""
            icon={<DoctorIcon fontSize="large" />}
            color="secondary"
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Card sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {t('dashboard.quickActions')}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<HospitalIcon />}
                onClick={() => navigate('/hospitals')}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                {t('dashboard.viewHospitals')}
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                startIcon={<AppointmentIcon />}
                onClick={() => navigate('/my-appointments')}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                {t('dashboard.viewDoctors')}
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                startIcon={<DoctorIcon />}
                onClick={() => navigate('/hospitals')}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                {t('dashboard.bookAppointment')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Appointments */}
      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              {t('dashboard.upcomingAppointments')}
            </Typography>
            <Button
              endIcon={<ArrowIcon />}
              onClick={() => navigate('/my-appointments')}
              size="small"
            >
              View All
            </Button>
          </Box>

          {loading ? (
            <Skeleton variant="rectangular" height={200} />
          ) : recentAppointments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                {t('appointments.noAppointments')}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate('/hospitals')}
              >
                {t('dashboard.bookAppointment')}
              </Button>
            </Box>
          ) : (
            <Box>
              {recentAppointments.map((appointment) => (
                <Box
                  key={appointment.id}
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: 'grey.50',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight="medium">
                      {appointment.doctorName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {appointment.hospitalName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {appointment.appointmentDate} at {appointment.appointmentTime}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: `${getStatusColor(appointment.status)}.light`,
                      color: `${getStatusColor(appointment.status)}.dark`,
                      fontSize: '0.75rem',
                      fontWeight: 'medium'
                    }}
                  >
                    {appointment.status}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default PatientDashboard;
