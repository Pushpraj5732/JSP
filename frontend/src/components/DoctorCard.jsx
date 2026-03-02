import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Chip,
  Avatar,
  Rating,
} from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const DoctorCard = ({ doctor, index }) => {
  const initials = doctor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

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
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #0288D1 0%, #2E7D32 100%)',
            color: '#ffffff',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
              backgroundColor: 'rgba(255,255,255,0.2)',
              fontSize: '1.5rem',
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {doctor.name}
              </Typography>
              {doctor.verified && (
                <VerifiedIcon sx={{ fontSize: '18px', color: '#FFC107' }} />
              )}
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 600,
              }}
            >
              {doctor.specialization}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ flex: 1 }}>
          {/* Qualification */}
          {doctor.qualification && (
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <SchoolIcon sx={{ color: '#2E7D32', fontSize: '20px', flexShrink: 0 }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                  Education
                </Typography>
                <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                  {doctor.qualification}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Experience */}
          {doctor.experience && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#999' }}>
                {doctor.experience} years experience
              </Typography>
            </Box>
          )}

          {/* Rating */}
          {doctor.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={doctor.rating} readOnly size="small" />
              <Typography variant="caption" sx={{ color: '#999' }}>
                {doctor.rating} ({doctor.reviews || 0} reviews)
              </Typography>
            </Box>
          )}

          {/* Hospital */}
          {doctor.hospital && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#999' }}>
                Hospital
              </Typography>
              <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                {doctor.hospital}
              </Typography>
            </Box>
          )}

          {/* Availability */}
          {doctor.availability && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <AccessTimeIcon sx={{ color: '#ED6C02', fontSize: '18px', flexShrink: 0, mt: 0.3 }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#999' }}>
                  Availability
                </Typography>
                <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                  {doctor.availability}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Fees */}
          {doctor.consultationFee && (
            <Box sx={{ mt: 2, p: 1.5, backgroundColor: 'rgba(46, 125, 50, 0.05)', borderRadius: '6px' }}>
              <Typography variant="caption" sx={{ color: '#999' }}>
                Consultation Fee
              </Typography>
              <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 700 }}>
                ₹{doctor.consultationFee}
              </Typography>
            </Box>
          )}

          {/* Specializations */}
          {doctor.subspecializations && doctor.subspecializations.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 1 }}>
                Expertises:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {doctor.subspecializations.slice(0, 3).map((spec, idx) => (
                  <Chip
                    key={idx}
                    label={spec}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: '#0288D1',
                      color: '#0288D1',
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
              backgroundColor: '#0288D1',
              '&:hover': {
                backgroundColor: '#01579b',
              },
            }}
          >
            Consult Now
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default DoctorCard;
