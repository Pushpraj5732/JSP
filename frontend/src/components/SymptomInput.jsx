import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from '@mui/icons-material/Close';
import analyzeSymptoms from '../utils/triageLogic';

const COMMON_SYMPTOMS = [
  'Chest pain',
  'Shortness of breath',
  'Severe headache',
  'High fever',
  'Dizziness',
  'Abdominal pain',
  'Severe bleeding',
  'Loss of consciousness',
];

const SymptomInput = ({ onSubmit, onCancel }) => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleAddSymptom = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSymptoms(symptoms + (symptoms ? ', ' : '') + symptom);
    }
  };

  const handleRemoveSymptom = (symptom) => {
    const newSymptoms = selectedSymptoms.filter(s => s !== symptom);
    setSelectedSymptoms(newSymptoms);
    setSymptoms(newSymptoms.join(', '));
  };

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    try {
      // Analyze symptoms using rule-based logic
      const result = analyzeSymptoms(symptoms);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      onSubmit(result);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            elevation={2}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '2px solid #D32F2F',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              {/* Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#D32F2F',
                  }}
                >
                  Emergency Symptom Analysis
                </Typography>
                <Button
                  onClick={onCancel}
                  startIcon={<CloseIcon />}
                  sx={{
                    color: '#999',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  Cancel
                </Button>
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
                Describe your current symptoms in detail. The more information you provide, the better our AI can assess your condition.
              </Typography>

              {/* Symptom Input */}
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Example: Chest pain and dizziness for the past 30 minutes..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                disabled={loading}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&.Mui-focused fieldset': {
                      borderColor: '#2E7D32',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              {/* Quick Symptom Selection */}
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: '#333',
                  mb: 2,
                }}
              >
                Quick Selection (tap to add):
              </Typography>

              <Grid container spacing={1} sx={{ mb: 3 }}>
                {COMMON_SYMPTOMS.map((symptom) => (
                  <Grid item xs={12} sm={6} key={symptom}>
                    <Chip
                      label={symptom}
                      variant={selectedSymptoms.includes(symptom) ? 'filled' : 'outlined'}
                      color={selectedSymptoms.includes(symptom) ? 'error' : 'default'}
                      sx={{
                        width: '100%',
                        fontWeight: 500,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedSymptoms.includes(symptom)) {
                          handleRemoveSymptom(symptom);
                        } else {
                          handleAddSymptom(symptom);
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Selected Symptoms Display */}
              {selectedSymptoms.length > 0 && (
                <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(211, 47, 47, 0.05)', borderRadius: '8px' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Selected Symptoms:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedSymptoms.map((symptom) => (
                      <Chip
                        key={symptom}
                        label={symptom}
                        onDelete={() => handleRemoveSymptom(symptom)}
                        color="error"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={handleAnalyze}
                  disabled={!symptoms.trim() || loading}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  {loading ? 'Analyzing...' : 'Analyze Emergency'}
                </Button>

                <Button
                  variant="outlined"
                  disabled={loading}
                  startIcon={<MicIcon />}
                  sx={{
                    flex: 1,
                    color: '#2E7D32',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.05)',
                    },
                  }}
                >
                  Voice Input
                </Button>
              </Box>

              {/* Info */}
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 2,
                  color: '#999',
                  textAlign: 'center',
                }}
              >
                This is an AI-assisted triage. Always call 911 for life-threatening emergencies.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SymptomInput;
