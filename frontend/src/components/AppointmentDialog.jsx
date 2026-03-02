import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  LocalHospital as HospitalIcon,
  LocalPhone as PhoneIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import appointmentService from '../services/appointmentService';

const AppointmentDialog = ({ open, onClose, doctor, hospital }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientContact: '',
    appointmentDate: dayjs(),
    appointmentTime: dayjs(),
    symptoms: ''
  });

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    setError('');
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      appointmentDate: newDate
    });
  };

  const handleTimeChange = (newTime) => {
    setFormData({
      ...formData,
      appointmentTime: newTime
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.patientName.trim()) {
      setError(t('auth.fillAllFields'));
      return;
    }
    if (!formData.patientEmail.trim()) {
      setError(t('auth.fillAllFields'));
      return;
    }
    if (!formData.patientContact.trim()) {
      setError(t('auth.fillAllFields'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const appointmentData = {
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        patientContact: formData.patientContact,
        doctorId: doctor?.id,
        doctorName: doctor?.name,
        hospitalId: hospital?.id,
        hospitalName: hospital?.hospitalName,
        appointmentDate: formData.appointmentDate.format('YYYY-MM-DD'),
        appointmentTime: formData.appointmentTime.format('HH:mm'),
        symptoms: formData.symptoms
      };

      const response = await appointmentService.createAppointment(appointmentData);
      
      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setError(response.message || t('appointments.error'));
      }
    } catch (err) {
      setError(err.response?.data?.message || t('appointments.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      patientName: '',
      patientEmail: '',
      patientContact: '',
      appointmentDate: dayjs(),
      appointmentTime: dayjs(),
      symptoms: ''
    });
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" component="div" fontWeight="bold" color="primary">
            {t('appointments.bookTitle')}
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          {success ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              {t('appointments.success')}
            </Alert>
          ) : (
            <>
              {/* Doctor and Hospital Info */}
              <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.light', borderRadius: 2, color: 'white' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon />
                      <Typography variant="body1" fontWeight="medium">
                        {doctor?.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ ml: 4, opacity: 0.9 }}>
                      {doctor?.specialization}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <HospitalIcon />
                      <Typography variant="body1" fontWeight="medium">
                        {hospital?.hospitalName}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ ml: 4, opacity: 0.9 }}>
                      {hospital?.address}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('appointments.patientName')}
                    value={formData.patientName}
                    onChange={handleInputChange('patientName')}
                    required
                    InputProps={{
                      startAdornment: <PersonIcon color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('appointments.patientEmail')}
                    type="email"
                    value={formData.patientEmail}
                    onChange={handleInputChange('patientEmail')}
                    required
                    InputProps={{
                      startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('appointments.patientContact')}
                    value={formData.patientContact}
                    onChange={handleInputChange('patientContact')}
                    required
                    InputProps={{
                      startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label={t('appointments.selectDate')}
                    value={formData.appointmentDate}
                    onChange={handleDateChange}
                    minDate={dayjs()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label={t('appointments.selectTime')}
                    value={formData.appointmentTime}
                    onChange={handleTimeChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('appointments.symptoms')}
                    value={formData.symptoms}
                    onChange={handleInputChange('symptoms')}
                    multiline
                    rows={3}
                    placeholder="Describe your symptoms (optional)"
                  />
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>

        {!success && (
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              disabled={loading}
            >
              {t('appointments.cancel')}
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <CalendarIcon />}
            >
              {loading ? t('common.loading') : t('appointments.submit')}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </LocalizationProvider>
  );
};

export default AppointmentDialog;
