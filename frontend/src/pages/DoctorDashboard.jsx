import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Skeleton,
  Alert,
  Button
} from '@mui/material';
import {
  CalendarToday as AppointmentIcon,
  People as PatientIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import DashboardLayout from '../layouts/DashboardLayout';
import appointmentService from '../services/appointmentService';

const DoctorDashboard = () => {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    totalPatients: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // For demo, we'll fetch all appointments
      // In production, this would filter by the logged-in doctor's ID
      const response = await appointmentService.getAllAppointments();
      
      if (response.success) {
        setAppointments(response.appointments);
        setStats({
          totalAppointments: response.count,
          todayAppointments: response.appointments.filter(a => {
            const today = new Date().toISOString().split('T')[0];
            return a.appointmentDate === today;
          }).length,
          totalPatients: new Set(response.appointments.map(a => a.patientEmail)).size
        });
      }

      setError('');
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
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
    <DashboardLayout role="doctor">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {t('dashboard.doctorTitle')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('dashboard.welcome')} back! Manage your appointments and patients.
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
            title={t('dashboard.totalAppointments')}
            value={stats.totalAppointments}
            icon={<AppointmentIcon fontSize="large" />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Today's Appointments"
            value={stats.todayAppointments}
            icon={<TrendingIcon fontSize="large" />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={<PatientIcon fontSize="large" />}
            color="secondary"
          />
        </Grid>
      </Grid>

      {/* Appointments Table */}
      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              {t('nav.myAppointments')}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={fetchDashboardData}
            >
              Refresh
            </Button>
          </Box>

          {loading ? (
            <Skeleton variant="rectangular" height={300} />
          ) : appointments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                {t('appointments.noAppointments')}
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('appointments.patientName')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('appointments.hospital')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('appointments.date')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('appointments.time')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('appointments.status')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id} hover>
                      <TableCell>{appointment.id}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {appointment.patientName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {appointment.patientContact}
                        </Typography>
                      </TableCell>
                      <TableCell>{appointment.hospitalName}</TableCell>
                      <TableCell>{appointment.appointmentDate}</TableCell>
                      <TableCell>{appointment.appointmentTime}</TableCell>
                      <TableCell>
                        <Chip
                          label={appointment.status}
                          color={getStatusColor(appointment.status)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
