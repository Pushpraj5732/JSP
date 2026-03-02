import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import PatientDashboard from '../pages/PatientDashboard';
import DoctorDashboard from '../pages/DoctorDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import Hospitals from '../pages/Hospitals';
import Doctors from '../pages/Doctors';
import Appointments from '../pages/Appointments';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'patient') {
      return <Navigate to="/patient/dashboard" replace />;
    } else if (user.role === 'doctor') {
      return <Navigate to="/doctor/dashboard" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user) {
    if (user.role === 'patient') {
      return <Navigate to="/patient/dashboard" replace />;
    } else if (user.role === 'doctor') {
      return <Navigate to="/doctor/dashboard" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      {/* Patient Routes */}
      <Route 
        path="/patient/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Doctor Routes */}
      <Route 
        path="/doctor/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Shared Routes (accessible by multiple roles) */}
      <Route 
        path="/hospitals" 
        element={
          <ProtectedRoute allowedRoles={['patient', 'admin']}>
            <Hospitals />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/doctors" 
        element={
          <ProtectedRoute allowedRoles={['patient', 'admin']}>
            <Doctors />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/appointments" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Appointments />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/my-appointments" 
        element={
          <ProtectedRoute allowedRoles={['patient', 'doctor']}>
            <Appointments />
          </ProtectedRoute>
        } 
      />

      {/* Default Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
