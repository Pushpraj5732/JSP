import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Skeleton,
  Alert
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  People as DoctorIcon,
  CalendarToday as AppointmentIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import DashboardLayout from '../layouts/DashboardLayout';
import hospitalService from '../services/hospitalService';
import doctorService from '../services/doctorService';
import appointmentService from '../services/appointmentService';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalHospitals: 0,
    totalDoctors: 0,
    totalAppointments: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all stats in parallel
      const [hospitalResponse, doctorResponse, appointmentResponse] = await Promise.all([
        hospitalService.getAllHospitals(),
        doctorService.getAllDoctors(),
        appointmentService.getAllAppointments()
      ]);

      setStats({
        totalHospitals: hospitalResponse.success ? hospitalResponse.metadata.totalHospitals : 0,
        totalDoctors: doctorResponse.success ? doctorResponse.count : 0,
        totalAppointments: appointmentResponse.success ? appointmentResponse.count : 0
      });

      setError('');
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" variant="body2" gutterBottom>
              {title}
            </Typography>
            {loading ? (
              <Skeleton variant="text" width={80} height={56} />
            ) : (
              <Typography variant="h2" fontWeight="bold" color={`${color}.main`}>
                {value}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
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

  return (
    <DashboardLayout role="admin">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {t('dashboard.adminTitle')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('dashboard.welcome')} back! Here's the system overview.
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
            subtitle="Registered healthcare facilities"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title={t('dashboard.totalDoctors')}
            value={stats.totalDoctors}
            icon={<DoctorIcon fontSize="large" />}
            color="success"
            subtitle="Active medical professionals"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title={t('dashboard.totalAppointments')}
            value={stats.totalAppointments}
            icon={<AppointmentIcon fontSize="large" />}
            color="secondary"
            subtitle="Total bookings"
          />
        </Grid>
      </Grid>

      {/* Additional Info Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                System Overview
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography color="text.secondary">Active Hospitals</Typography>
                  <Typography fontWeight="medium">{stats.totalHospitals}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography color="text.secondary">Registered Doctors</Typography>
                  <Typography fontWeight="medium">{stats.totalDoctors}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography color="text.secondary">Total Appointments</Typography>
                  <Typography fontWeight="medium">{stats.totalAppointments}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography color="text.secondary">System Status</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                    <Typography fontWeight="medium" color="success.main">Online</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Quick Statistics
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Hospital Capacity</Typography>
                    <Typography variant="body2" fontWeight="medium">85%</Typography>
                  </Box>
                  <Box sx={{ width: '100%', height: 8, bgcolor: 'grey.200', borderRadius: 4, overflow: 'hidden' }}>
                    <Box sx={{ width: '85%', height: '100%', bgcolor: 'primary.main', borderRadius: 4 }} />
                  </Box>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Doctor Availability</Typography>
                    <Typography variant="body2" fontWeight="medium">92%</Typography>
                  </Box>
                  <Box sx={{ width: '100%', height: 8, bgcolor: 'grey.200', borderRadius: 4, overflow: 'hidden' }}>
                    <Box sx={{ width: '92%', height: '100%', bgcolor: 'success.main', borderRadius: 4 }} />
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Appointment Success Rate</Typography>
                    <Typography variant="body2" fontWeight="medium">78%</Typography>
                  </Box>
                  <Box sx={{ width: '100%', height: 8, bgcolor: 'grey.200', borderRadius: 4, overflow: 'hidden' }}>
                    <Box sx={{ width: '78%', height: '100%', bgcolor: 'secondary.main', borderRadius: 4 }} />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminDashboard;
