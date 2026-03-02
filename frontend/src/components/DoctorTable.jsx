import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Typography,
  Box,
  Tooltip,
  Avatar
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  LocalHospital as HospitalIcon,
  School as SchoolIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';

const DoctorTable = ({ doctors, onBookAppointment, loading }) => {
  const { t } = useTranslation();

  const getSpecializationColor = (specialization) => {
    const spec = specialization?.toLowerCase() || '';
    if (spec.includes('cardio')) return 'error';
    if (spec.includes('neuro')) return 'info';
    if (spec.includes('ortho')) return 'warning';
    if (spec.includes('pediat')) return 'success';
    if (spec.includes('gyn')) return 'secondary';
    if (spec.includes('dental')) return 'default';
    return 'primary';
  };

  const getInitials = (name) => {
    if (!name) return 'D';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <Typography color="text.secondary">{t('doctors.loading')}</Typography>
      </Box>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">{t('doctors.noDoctors')}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }} aria-label="doctors table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('doctors.name')}</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('doctors.specialization')}</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('doctors.experience')}</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('doctors.qualification')}</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('doctors.consultationFee')}</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">{t('doctors.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow
              key={doctor.id}
              sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 'bold' }}>
                    {getInitials(doctor.name)}
                  </Avatar>
                  <Typography variant="body2" fontWeight="medium">
                    {doctor.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={doctor.specialization}
                  color={getSpecializationColor(doctor.specialization)}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {doctor.experience} {t('doctors.years')}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <SchoolIcon fontSize="small" color="action" />
                  <Typography variant="body2">{doctor.qualification}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <MoneyIcon fontSize="small" color="action" />
                  <Typography variant="body2" fontWeight="medium">
                    ₹{doctor.consultationFee}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={t('doctors.bookAppointment')}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<CalendarIcon />}
                    onClick={() => onBookAppointment(doctor)}
                    sx={{ textTransform: 'none' }}
                    color="success"
                  >
                    {t('doctors.bookAppointment')}
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DoctorTable;
