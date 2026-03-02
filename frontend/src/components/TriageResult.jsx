import React from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const getRiskColor = (riskLevel) => {
  switch (riskLevel) {
    case 'High':
      return '#D32F2F';
    case 'Medium':
      return '#ED6C02';
    case 'Low':
      return '#2E7D32';
    default:
      return '#0288D1';
  }
};

const getRiskIcon = (riskLevel) => {
  switch (riskLevel) {
    case 'High':
      return <ErrorIcon sx={{ fontSize: 40, color: '#D32F2F' }} />;
    case 'Medium':
      return <WarningIcon sx={{ fontSize: 40, color: '#ED6C02' }} />;
    case 'Low':
      return <InfoIcon sx={{ fontSize: 40, color: '#2E7D32' }} />;
    default:
      return <CheckCircleIcon sx={{ fontSize: 40, color: '#0288D1' }} />;
  }
};

const getRiskDescription = (riskLevel) => {
  switch (riskLevel) {
    case 'High':
      return 'Immediate medical attention required. Please contact emergency services immediately.';
    case 'Medium':
      return 'Your condition requires prompt medical evaluation. Visit an urgent care facility.';
    case 'Low':
      return 'Consider scheduling an appointment with a specialist for proper diagnosis.';
    default:
      return 'Further evaluation needed.';
  }
};

const TriageResult = ({ result }) => {
  const riskColor = getRiskColor(result.riskLevel);

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        backgroundColor: 'rgba(211, 47, 47, 0.03)',
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
            elevation={3}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: `3px solid ${riskColor}`,
              overflow: 'hidden',
            }}
          >
            {/* Risk Level Header */}
            <Box
              sx={{
                background: `linear-gradient(135deg, ${riskColor} 0%, ${riskColor}dd 100%)`,
                color: '#ffffff',
                p: 3,
                textAlign: 'center',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {getRiskIcon(result.riskLevel)}
              </motion.div>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mt: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {result.riskLevel} Risk
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  opacity: 0.95,
                  fontSize: '0.95rem',
                }}
              >
                AI Confidence: {result.confidence}%
              </Typography>
            </Box>

            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              {/* Recommended Action */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#333',
                    mb: 1.5,
                  }}
                >
                  Recommended Action
                </Typography>

                <Box
                  sx={{
                    p: 2.5,
                    backgroundColor: `${riskColor}15`,
                    borderLeft: `4px solid ${riskColor}`,
                    borderRadius: '8px',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#333',
                      fontWeight: 500,
                      lineHeight: 1.7,
                    }}
                  >
                    {getRiskDescription(result.riskLevel)}
                  </Typography>
                </Box>
              </Box>

              {/* Identified Conditions */}
              {result.conditions && result.conditions.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#333',
                      mb: 1.5,
                    }}
                  >
                    Identified Conditions
                  </Typography>

                  <Grid container spacing={1}>
                    {result.conditions.map((condition, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Chip
                            label={condition}
                            color="primary"
                            variant="outlined"
                            sx={{
                              width: '100%',
                              fontWeight: 500,
                            }}
                          />
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Recommended Specializations */}
              {result.recommendedSpecializations && result.recommendedSpecializations.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#333',
                      mb: 1.5,
                    }}
                  >
                    Recommended Specializations
                  </Typography>

                  <Grid container spacing={1}>
                    {result.recommendedSpecializations.map((spec, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <Chip
                            label={spec}
                            color="secondary"
                            sx={{
                              width: '100%',
                              fontWeight: 500,
                              backgroundColor: '#0288D1',
                              color: '#ffffff',
                            }}
                          />
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Risk Meter */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: '#666',
                  }}
                >
                  Risk Level Assessment
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={
                    result.riskLevel === 'High'
                      ? 90
                      : result.riskLevel === 'Medium'
                      ? 50
                      : 20
                  }
                  sx={{
                    mt: 1,
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: riskColor,
                    },
                  }}
                />
              </Box>

              {/* Timestamp */}
              <Typography
                variant="caption"
                sx={{
                  color: '#999',
                  display: 'block',
                  textAlign: 'right',
                }}
              >
                Analysis completed at {new Date().toLocaleTimeString()}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TriageResult;
