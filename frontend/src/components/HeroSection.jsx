import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        py: { xs: 6, md: 8 },
        textAlign: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: '#1a1a1a',
              mb: 2,
              background: 'linear-gradient(135deg, #2E7D32 0%, #0288D1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AYUSH AI Emergency & Health Triage System
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#666',
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6,
              maxWidth: '600px',
              mx: 'auto',
              letterSpacing: '0.3px',
            }}
          >
            Instant AI-powered triage and specialist referral at your fingertips
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginTop: '2rem' }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {['Fast Diagnosis', 'Expert Referral', 'Emergency Ready'].map((item, index) => (
              <Box
                key={index}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(46, 125, 50, 0.1)',
                  color: '#2E7D32',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  border: '1px solid rgba(46, 125, 50, 0.2)',
                }}
              >
                ✓ {item}
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;
