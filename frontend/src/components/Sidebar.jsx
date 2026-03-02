import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Toolbar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocalHospital as HospitalIcon,
  People as DoctorIcon,
  CalendarToday as AppointmentIcon,
  Logout as LogoutIcon,
  Person as ProfileIcon
} from '@mui/icons-material';

const drawerWidth = 260;

const Sidebar = ({ role, mobileOpen, onDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getMenuItems = () => {
    const commonItems = [
      { text: t('nav.dashboard'), icon: <DashboardIcon />, path: `/${role}/dashboard` },
      { text: t('nav.hospitals'), icon: <HospitalIcon />, path: '/hospitals' },
    ];

    if (role === 'patient') {
      return [
        ...commonItems,
        { text: t('nav.myAppointments'), icon: <AppointmentIcon />, path: '/my-appointments' },
      ];
    } else if (role === 'doctor') {
      return [
        { text: t('nav.dashboard'), icon: <DashboardIcon />, path: `/${role}/dashboard` },
        { text: t('nav.myAppointments'), icon: <AppointmentIcon />, path: '/my-appointments' },
      ];
    } else if (role === 'admin') {
      return [
        { text: t('nav.dashboard'), icon: <DashboardIcon />, path: `/${role}/dashboard` },
        { text: t('nav.hospitals'), icon: <HospitalIcon />, path: '/hospitals' },
        { text: t('nav.doctors'), icon: <DoctorIcon />, path: '/doctors' },
        { text: t('nav.appointments'), icon: <AppointmentIcon />, path: '/appointments' },
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {t('app.name')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t('app.tagline')}
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1, px: 1 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isSelected ? 'white' : 'inherit',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List sx={{ px: 1, pb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: 'error.main',
              '&:hover': {
                backgroundColor: 'error.light',
                color: 'error.dark',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.logout')} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
