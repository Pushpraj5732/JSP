import React from 'react';
import {
  Box,
  Container,
  Button,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import WarningIcon from '@mui/icons-material/Warning';

const pulseAnimation = {
  initial: { scale: 1, boxShadow: '0 0 0 0 rgba(211, 47, 47, 0.7)' },
  animate: {
    scale: [1, 1.05, 1],
    boxShadow: [
      '0 0 0 0 rgba(211, 47, 47, 0.7)',
      '0 0 0 20px rgba(211, 47, 47, 0)',
    ],
  },
};

const EmergencyButton = ({ onEmergencyClick }) => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.05) 0%, rgba(2, 136, 209, 0.05) 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h6"
          sx={{
            color: '#666',
            fontWeight: 600,
            mb: 3,
            fontSize: '0.95rem',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          Need Immediate Help?
        </Typography>

        <motion.div
          initial={pulseAnimation.initial}
          animate={pulseAnimation.animate}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ display: 'inline-block' }}
        >
          <Button
            variant="contained"
            onClick={onEmergencyClick}
            startIcon={<WarningIcon sx={{ fontSize: '24px' }} />}
            sx={{
              backgroundColor: '#D32F2F',
              color: '#ffffff',
              padding: '20px 40px',
              fontSize: '1.25rem',
              fontWeight: 700,
              borderRadius: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              minWidth: '300px',
              boxShadow: '0 8px 32px rgba(211, 47, 47, 0.3)',
              border: '3px solid #D32F2F',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#B71C1C',
                borderColor: '#B71C1C',
                boxShadow: '0 12px 40px rgba(211, 47, 47, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0px)',
              },
            }}
          >
            EMERGENCY — GET HELP NOW
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography
            variant="body2"
            sx={{
              mt: 3,
              color: '#999',
              fontStyle: 'italic',
            }}
          >
            No login required for emergency triage
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default EmergencyButton;
