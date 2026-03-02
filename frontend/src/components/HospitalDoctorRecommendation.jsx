import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import { motion } from 'framer-motion';
import HospitalCard from './HospitalCard';
import DoctorCard from './DoctorCard';
import { fetchHospitals, fetchDoctors } from '../services/api';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const HospitalDoctorRecommendation = ({ riskLevel }) => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch hospitals and doctors
        const [hospitalsData, doctorsData] = await Promise.all([
          fetchHospitals(),
          fetchDoctors(),
        ]);

        // Filter based on risk level
        let filteredHospitals = hospitalsData;
        let filteredDoctors = doctorsData;

        if (riskLevel === 'High') {
          // High risk - show emergency hospitals first
          filteredHospitals = hospitalsData.filter(h => h.isEmergency).slice(0, 4);
        } else if (riskLevel === 'Medium') {
          filteredHospitals = hospitalsData.slice(0, 3);
        } else {
          filteredHospitals = hospitalsData.slice(0, 2);
        }

        filteredDoctors = doctorsData.slice(0, 4);

        setHospitals(filteredHospitals);
        setDoctors(filteredDoctors);
      } catch (err) {
        console.error('Error loading recommendations:', err);
        setError('Failed to load recommendations. Please try again.');
        
        // Fallback to mock data
        setHospitals(getMockHospitals().slice(0, 3));
        setDoctors(getMockDoctors().slice(0, 4));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [riskLevel]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (error && hospitals.length === 0 && doctors.length === 0) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Alert severity="error">{error}</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        backgroundColor: '#f9f9f9',
        borderTop: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#1a1a1a',
                mb: 1,
              }}
            >
              {riskLevel === 'High'
                ? 'Emergency Medical Facilities'
                : 'Recommended Healthcare Providers'}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#666',
                lineHeight: 1.6,
              }}
            >
              {riskLevel === 'High'
                ? 'These are the nearest emergency-equipped hospitals with immediate availability.'
                : 'Based on your condition, we recommend consulting with these specialists at these hospitals.'}
            </Typography>
          </Box>

          {/* Tabs */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              mb: 3,
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="recommendation tabs"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                },
              }}
            >
              <Tab label={`Hospitals (${hospitals.length})`} id="tab-0" />
              <Tab label={`Doctors (${doctors.length})`} id="tab-1" />
            </Tabs>
          </Box>

          {/* Content */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Hospitals Tab */}
              <TabPanel value={tabValue} index={0}>
                {hospitals.length > 0 ? (
                  <Grid container spacing={3}>
                    {hospitals.map((hospital, index) => (
                      <Grid item xs={12} sm={6} md={4} key={hospital.id || index}>
                        <HospitalCard hospital={hospital} index={index} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="textSecondary">
                      No hospitals available at this time.
                    </Typography>
                  </Box>
                )}
              </TabPanel>

              {/* Doctors Tab */}
              <TabPanel value={tabValue} index={1}>
                {doctors.length > 0 ? (
                  <Grid container spacing={3}>
                    {doctors.map((doctor, index) => (
                      <Grid item xs={12} sm={6} md={3} key={doctor.id || index}>
                        <DoctorCard doctor={doctor} index={index} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="textSecondary">
                      No doctors available at this time.
                    </Typography>
                  </Box>
                )}
              </TabPanel>
            </>
          )}

          {/* Additional Info */}
          {riskLevel === 'High' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Alert severity="warning" sx={{ mt: 4 }}>
                <strong>Emergency Notice:</strong> For life-threatening situations, please call 911 immediately. Do not delay treatment while seeking appointments.
              </Alert>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

// Mock data for fallback
const getMockHospitals = () => [
  {
    id: 1,
    name: 'City Emergency Hospital',
    type: 'Emergency',
    address: '123 Main St, Anand',
    phone: '+91-9876543210',
    isEmergency: true,
    availability: '24/7',
    distance: '2.5 km',
    rating: 4.7,
    reviews: 245,
    departments: ['Emergency', 'Cardiology', 'Neurology', 'Orthopedics'],
  },
  {
    id: 2,
    name: 'Healing Touch Medical Center',
    type: 'Hospital',
    address: '456 Health Ave, Anand',
    phone: '+91-8765432109',
    isEmergency: true,
    availability: '24/7',
    distance: '3.2 km',
    rating: 4.5,
    reviews: 189,
    departments: ['General Medicine', 'Surgery', 'Pediatrics'],
  },
  {
    id: 3,
    name: 'Wellness Hospital',
    type: 'Hospital',
    address: '789 Care Dr, Anand',
    phone: '+91-7654321098',
    isEmergency: false,
    availability: '8 AM - 8 PM',
    distance: '4.0 km',
    rating: 4.3,
    reviews: 156,
    departments: ['Cardiology', 'Orthopedics', 'Dentistry'],
  },
];

const getMockDoctors = () => [
  {
    id: 1,
    name: 'Dr. Raj Kumar',
    specialization: 'Cardiologist',
    qualification: 'MBBS, MD (Cardiology)',
    experience: 15,
    hospital: 'City Emergency Hospital',
    rating: 4.8,
    reviews: 342,
    verified: true,
    availability: 'Available Today',
    consultationFee: 500,
    subspecializations: ['Coronary Angiography', 'Heart Failure'],
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    specialization: 'General Physician',
    qualification: 'MBBS, MD (Internal Medicine)',
    experience: 12,
    hospital: 'Healing Touch Medical Center',
    rating: 4.6,
    reviews: 278,
    verified: true,
    availability: 'Available in 30 mins',
    consultationFee: 300,
    subspecializations: ['Diabetes Management', 'Hypertension'],
  },
  {
    id: 3,
    name: 'Dr. Anil Patel',
    specialization: 'Neurologist',
    qualification: 'MBBS, DM (Neurology)',
    experience: 18,
    hospital: 'City Emergency Hospital',
    rating: 4.7,
    reviews: 215,
    verified: true,
    availability: 'Available Tomorrow',
    consultationFee: 600,
    subspecializations: ['Stroke Management', 'Headache Disorders'],
  },
  {
    id: 4,
    name: 'Dr. Meera Singh',
    specialization: 'Emergency Medicine',
    qualification: 'MBBS, MD (Emergency Medicine)',
    experience: 20,
    hospital: 'Healing Touch Medical Center',
    rating: 4.9,
    reviews: 412,
    verified: true,
    availability: 'Available Now',
    consultationFee: 400,
    subspecializations: ['Trauma Management', 'Triage'],
  },
];

export default HospitalDoctorRecommendation;
