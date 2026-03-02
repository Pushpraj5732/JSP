import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #2E7D32 0%, #0288D1 100%)',
        boxShadow: '0 4px 12px rgba(46, 125, 50, 0.15)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1.5 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', flex: 1 }}
          >
            <FavoriteBorderIcon
              sx={{
                mr: 1.5,
                fontSize: '28px',
                color: '#ffffff',
              }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.5px',
                  m: 0,
                }}
              >
                AYUSH
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.3px',
                }}
              >
                Emergency & Triage System
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 500,
                fontSize: '0.85rem',
              }}
            >
              AI-Powered Health Triage
            </Typography>
          </motion.div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
