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
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Visibility as ViewIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const HospitalTable = ({ hospitals, onViewDoctors, loading }) => {
  const { t } = useTranslation();

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'government':
        return 'success';
      case 'private':
        return 'primary';
      case 'trust':
        return 'warning';
      case 'diagnostic':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <Typography color="text.secondary">{t('hospitals.loading')}</Typography>
      </Box>
    );
  }

  if (!hospitals || hospitals.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">{t('hospitals.noHospitals')}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }} aria-label="hospitals table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('hospitals.id')}</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('hospitals.name')}</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('hospitals.address')}</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('hospitals.type')}</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('hospitals.beds')}</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">{t('hospitals.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hospitals.map((hospital) => (
            <TableRow
              key={hospital.id}
              sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
            >
              <TableCell>{hospital.id}</TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {hospital.hospitalName}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                  <LocationIcon fontSize="small" color="action" sx={{ mt: 0.3 }} />
                  <Typography variant="body2" sx={{ maxWidth: 250 }}>
                    {hospital.address}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={hospital.type}
                  color={getTypeColor(hospital.type)}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{hospital.beds}</TableCell>
              <TableCell align="center">
                <Tooltip title={t('hospitals.viewDoctors')}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<ViewIcon />}
                    onClick={() => onViewDoctors(hospital)}
                    sx={{ textTransform: 'none' }}
                  >
                    {t('hospitals.viewDoctors')}
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

export default HospitalTable;
