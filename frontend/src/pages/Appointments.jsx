import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Fade,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  CalendarToday as CalendarIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import DashboardLayout from '../layouts/DashboardLayout';
import appointmentService from '../services/appointmentService';

const Appointments = () => {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await appointmentService.getAllAppointments();
      
      if (response.success) {
        setAppointments(response.appointments);
      } else {
        setError('Failed to fetch appointments');
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(t('appointments.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await appointmentService.updateAppointmentStatus(id, status);
      if (response.success) {
        fetchAppointments();
      }
    } catch (err) {
      console.error('Error updating appointment:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) {
      return;
    }
    
    try {
      const response = await appointmentService.deleteAppointment(id);
      if (response.success) {
        fetchAppointments();
      }
    } catch (err) {
      console.error('Error deleting appointment:', err);
    }
  };

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

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role || 'admin';

  return (
    <DashboardLayout role={userRole}>
      <Fade in={true}>
        <Box>
          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {t('appointments.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage all appointments in the system
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={fetchAppointments}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
              sx={{ borderRadius: 2 }}
            >
              {t('common.refresh')}
            </Button>
          </Box>

          {/* Stats Card */}
          <Card sx={{ mb: 3, borderRadius: 2, bgcolor: 'secondary.main', color: 'white' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CalendarIcon fontSize="large" />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {appointments.length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Appointments
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
                <Button color="inherit" size="small" onClick={fetchAppointments}>
                  {t('common.tryAgain')}
                </Button>
              }
            >
              {error}
            </Alert>
          )}

          {/* Appointments Table */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : appointments.length === 0 ? (
            <Card sx={{ borderRadius: 2, textAlign: 'center', py: 6 }}>
              <CardContent>
                <CalendarIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {t('appointments.noAppointments')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  No appointments have been booked yet
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('appointments.patientName')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('appointments.doctor')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('appointments.hospital')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('appointments.date')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('appointments.time')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('appointments.status')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Actions</TableCell>
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
                          {appointment.patientEmail}
                        </Typography>
                      </TableCell>
                      <TableCell>{appointment.doctorName}</TableCell>
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
                      <TableCell align="center">
                        <Tooltip title="Mark as Completed">
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleUpdateStatus(appointment.id, 'Completed')}
                            disabled={appointment.status === 'Completed'}
                          >
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(appointment.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Fade>
    </DashboardLayout>
  );
};

export default Appointments;
