import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import './i18n';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EmergencyButton from './components/EmergencyButton';
import SymptomInput from './components/SymptomInput';
import TriageResult from './components/TriageResult';
import HospitalDoctorRecommendation from './components/HospitalDoctorRecommendation';
import EmergencyQRSection from './components/EmergencyQRSection';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    secondary: {
      main: '#0288D1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    error: {
      main: '#D32F2F',
      light: '#ef5350',
      dark: '#c62828',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    info: {
      main: '#0288D1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.015em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '&:hover fieldset': {
              borderColor: '#2E7D32',
            },
          },
        },
      },
    },
  },
});

function App() {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [triageResult, setTriageResult] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleOpenEmergency = () => {
    setEmergencyMode(true);
    setTriageResult(null);
    setShowRecommendations(false);
  };

  const handleCloseEmergency = () => {
    setEmergencyMode(false);
    setTriageResult(null);
    setSelectedSymptoms('');
    setShowRecommendations(false);
  };

  const handleTriageAnalysis = (result) => {
    setTriageResult(result);
    setShowRecommendations(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
        <Navbar />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <HeroSection />

          {/* Emergency Mode */}
          {!emergencyMode ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Emergency Button */}
              <EmergencyButton onEmergencyClick={handleOpenEmergency} />

              {/* QR Section */}
              <EmergencyQRSection />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Symptom Input */}
              <SymptomInput
                onSubmit={handleTriageAnalysis}
                onCancel={handleCloseEmergency}
              />

              {/* Triage Result */}
              {triageResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <TriageResult result={triageResult} />
                </motion.div>
              )}

              {/* Hospital & Doctor Recommendation */}
              {showRecommendations && triageResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <HospitalDoctorRecommendation
                    riskLevel={triageResult.riskLevel}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </ThemeProvider>
  );
}

export default App;
