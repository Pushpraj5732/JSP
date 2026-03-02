import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import PatientDashboard from './pages/PatientDashboard';
import BookAppointment from './pages/BookAppointment';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EmrViewer from './pages/EmrViewer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Public Routes with Navbar & Footer */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/login" element={<><Navbar /><Auth isLogin={true} /><Footer /></>} />
          <Route path="/register" element={<><Navbar /><Auth isLogin={false} /><Footer /></>} />

          {/* Dashboard Routes (Has Sidebar instead of Navbar) */}
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/book" element={<BookAppointment />} />

          <Route path="/doctor" element={<DoctorDashboard />} />

          <Route path="/admin" element={<AdminDashboard />} />

          {/* Standalone EMR Route */}
          <Route path="/emr" element={<EmrViewer />} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
