import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
} from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const HospitalCard = ({ hospital, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          },
        }}
      >
        {/* Header with Badge */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #2E7D32 0%, #0288D1 100%)',
            color: '#ffffff',
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {hospital.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip
              label={hospital.type || 'Hospital'}
              size="small"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontWeight: 600,
              }}
            />
            {hospital.isEmergency && (
              <Chip
                label="Emergency 24/7"
                size="small"
                sx={{
                  backgroundColor: '#D32F2F',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
        </Box>

        <CardContent sx={{ flex: 1 }}>
          {/* Location */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <LocationOnIcon sx={{ color: '#2E7D32', fontSize: '20px', flexShrink: 0, mt: 0.3 }} />
            <Box>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {hospital.address}
              </Typography>
              {hospital.distance && (
                <Typography variant="caption" sx={{ color: '#999' }}>
                  {hospital.distance} away
                </Typography>
              )}
            </Box>
          </Box>

          {/* Contact */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <PhoneIcon sx={{ color: '#0288D1', fontSize: '20px', flexShrink: 0 }} />
            <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
              {hospital.phone || 'Contact for details'}
            </Typography>
          </Box>

          {/* Availability */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <AccessTimeIcon sx={{ color: '#ED6C02', fontSize: '20px', flexShrink: 0 }} />
            <Box>
              <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                {hospital.availability || '24/7'}
              </Typography>
            </Box>
          </Box>

          {/* Rating */}
          {hospital.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={hospital.rating} readOnly size="small" />
              <Typography variant="caption" sx={{ color: '#999' }}>
                {hospital.rating} ({hospital.reviews || 0} reviews)
              </Typography>
            </Box>
          )}

          {/* Departments */}
          {hospital.departments && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 1 }}>
                Key Departments:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {hospital.departments.slice(0, 3).map((dept, idx) => (
                  <Chip
                    key={idx}
                    label={dept}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: '#2E7D32',
                      color: '#2E7D32',
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </CardContent>

        <CardActions sx={{ pt: 0 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#2E7D32',
              '&:hover': {
                backgroundColor: '#1b5e20',
              },
            }}
          >
            Book Appointment
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default HospitalCard;
