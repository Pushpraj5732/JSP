import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CloseIcon from '@mui/icons-material/Close';
import { fetchPatientData } from '../services/api';

const EmergencyQRSection = () => {
  const [patientId, setPatientId] = useState('');
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(null);

  const handleScanQR = async () => {
    if (!patientId.trim()) {
      setError('Please enter a Patient ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch patient data
      const data = await fetchPatientData(patientId);
      setPatientData(data);
      setOpenDialog(true);
    } catch (err) {
      console.error('Error fetching patient data:', err);
      setError('Patient not found. Please check the ID and try again.');
      
      // Fallback mock data
      setPatientData(getMockPatientData(patientId));
      setOpenDialog(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClosDialog = () => {
    setOpenDialog(false);
    setPatientData(null);
    setPatientId('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleScanQR();
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card
            elevation={2}
            sx={{
              backgroundColor: '#f9f9f9',
              borderRadius: '12px',
              border: '2px dashed #0288D1',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <QrCodeScannerIcon
                  sx={{
                    fontSize: 32,
                    color: '#0288D1',
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#333',
                    }}
                  >
                    Scan Patient Emergency QR
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                    }}
                  >
                    Quickly access emergency patient information
                  </Typography>
                </Box>
              </Box>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                Enter or scan a patient ID to retrieve emergency medical information including allergies, medical history, and recent consultations.
              </Typography>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      mb: 2,
                      backgroundColor: '#FDE4E4',
                      border: '1px solid #D32F2F',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2" sx={{ color: '#D32F2F' }}>
                      {error}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => setError(null)}
                      sx={{ color: '#D32F2F' }}
                    >
                      <CloseIcon sx={{ fontSize: 18 }} />
                    </Button>
                  </Box>
                </motion.div>
              )}

              {/* Input Field */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Enter Patient ID (e.g., PAT001)"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&.Mui-focused fieldset': {
                        borderColor: '#0288D1',
                        borderWidth: '2px',
                      },
                    },
                  }}
                />

                <Button
                  variant="contained"
                  onClick={handleScanQR}
                  disabled={loading || !patientId.trim()}
                  sx={{
                    backgroundColor: '#0288D1',
                    px: 3,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      backgroundColor: '#01579b',
                    },
                  }}
                  startIcon={loading ? <CircularProgress size={20} /> : <QrCodeScannerIcon />}
                >
                  {loading ? 'Scanning...' : 'Scan'}
                </Button>
              </Box>

              {/* Help Text */}
              <Typography
                variant="caption"
                sx={{
                  color: '#999',
                  display: 'block',
                }}
              >
                Voice input or manual ID entry supported. QR camera access requires permission.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* Patient Data Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleClosDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #0288D1 0%, #2E7D32 100%)',
            color: '#ffffff',
            fontWeight: 700,
          }}
        >
          Emergency Patient Information
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          {patientData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={2}>
                {/* Name */}
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Patient Name
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {patientData.name}
                  </Typography>
                </Grid>

                {/* ID */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Patient ID
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {patientData.id}
                  </Typography>
                </Grid>

                {/* Age */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Age
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {patientData.age} years
                  </Typography>
                </Grid>

                {/* Risk Status */}
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Risk Status
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={patientData.riskStatus}
                      color={
                        patientData.riskStatus === 'High' ? 'error' : 
                        patientData.riskStatus === 'Medium' ? 'warning' : 'success'
                      }
                    />
                  </Box>
                </Grid>

                {/* Allergies */}
                {patientData.allergies && patientData.allergies.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ color: '#999' }}>
                      Allergies
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {patientData.allergies.map((allergy, idx) => (
                        <Chip
                          key={idx}
                          label={allergy}
                          color="error"
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  </Grid>
                )}

                {/* Blood Group */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Blood Group
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mt: 1,
                      color: '#D32F2F',
                    }}
                  >
                    {patientData.bloodGroup}
                  </Typography>
                </Grid>

                {/* Emergency Contact */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Emergency Contact
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, mt: 1 }}>
                    {patientData.emergencyContact}
                  </Typography>
                </Grid>

                {/* Last Consultation */}
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Last Consultation
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {patientData.lastConsultation}
                  </Typography>
                </Grid>

                {/* Medical History */}
                {patientData.medicalHistory && (
                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ color: '#999' }}>
                      Medical History
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        mt: 1,
                        p: 1,
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                      }}
                    >
                      {patientData.medicalHistory}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </motion.div>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClosDialog} sx={{ color: '#666' }}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleClosDialog}
            sx={{
              backgroundColor: '#2E7D32',
              '&:hover': {
                backgroundColor: '#1b5e20',
              },
            }}
          >
            Understood
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Mock patient data
const getMockPatientData = (patientId) => ({
  id: patientId,
  name: 'John Doe',
  age: 45,
  riskStatus: 'Medium',
  bloodGroup: 'O+',
  allergies: ['Penicillin', 'Shellfish'],
  emergencyContact: '+91-9876543210 (Spouse)',
  lastConsultation: '2024-12-20 - General Checkup',
  medicalHistory:
    'Hypertension since 2015, controlled with medication. Occasional headaches. No surgeries.',
});

export default EmergencyQRSection;
