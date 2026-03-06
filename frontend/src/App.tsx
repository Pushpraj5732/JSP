import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { UserRole } from './context/AuthContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/common/layout/Navbar';
import Footer from './components/common/layout/Footer';
import PatientLayout from './components/common/layout/PatientLayout';
import HospitalLayout from './components/common/layout/HospitalLayout';
import AdminLayout from './components/common/layout/AdminLayout';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import PatientDashboard from './pages/PatientDashboard';
import PatientProfile from './pages/PatientProfile';
import PatientIDCard from './pages/PatientIDCard';
import BookAppointment from './pages/BookAppointment';
import EmrViewer from './pages/EmrViewer';
import HospitalDashboard from './pages/HospitalDashboard';
import PatientQueue from './pages/PatientQueue';
import EmrEditor from './pages/EmrEditor';
import QRScanner from './pages/QRScanner';
import AdminOverview from './pages/admin/AdminOverview';
import AdminUserManagement from './pages/admin/AdminUserManagement';
import AdminAuditLog from './pages/admin/AdminAuditLog';
import AdminConfiguration from './pages/admin/AdminConfiguration';
import Chatbot, { ChatbotPage } from './components/Chatbot';

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole: UserRole }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== allowedRole) return <Navigate to="/" replace />;
  return <>{children}</>;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-surface">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />

        {/* Patient Portal */}
        <Route element={<ProtectedRoute allowedRole="patient"><PatientLayout /></ProtectedRoute>}>
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/settings" element={<PatientProfile />} />
          <Route path="/patient/chatbot" element={<ChatbotPage />} />
          <Route path="/patient/records" element={<EmrViewer />} />
          <Route path="/patient/id-card" element={<PatientIDCard />} />
          <Route path="/patient/book" element={<BookAppointment />} />
        </Route>

        {/* Hospital Portal */}
        <Route element={<ProtectedRoute allowedRole="hospital"><HospitalLayout /></ProtectedRoute>}>
          <Route path="/hospital" element={<HospitalDashboard />} />
          <Route path="/hospital/patients" element={<PatientQueue />} />
          <Route path="/hospital/schedule" element={<EmrEditor />} />
          <Route path="/hospital/emr" element={<EmrEditor />} />
          <Route path="/hospital/qr-scanner" element={<QRScanner />} />
        </Route>

        {/* Admin Portal */}
        <Route element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/users" element={<AdminUserManagement />} />
          <Route path="/admin/audit" element={<AdminAuditLog />} />
          <Route path="/admin/config" element={<AdminConfiguration />} />
        </Route>
      </Routes>

      {/* Global Chatbot Widget (on authenticated pages) */}
      {isAuthenticated && <Chatbot />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
