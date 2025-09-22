import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import HRDashboard from './pages/HRDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployeeList from './pages/EmployeeList';
import Profile from './pages/Profile';
import Salary from './pages/Salary';
import Attendance from './pages/Attendance';
import LeaveManagement from './pages/LeaveManagement';
import AttendenceList from './pages/AttendenceList';
import LeaveRequest from './pages/LeaveRequest';
import Register from './components/Register';
// import './App.css';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen w-full bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<HRDashboard />} />
              <Route path="hr-dashboard" element={<HRDashboard />} />
              <Route path="employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="employees" element={<EmployeeList />} />
              <Route path="profile" element={<Profile />} />
              <Route path="salary" element={<Salary />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="attendance-list" element={<AttendenceList />} />
              <Route path="leave" element={<LeaveManagement />} />
              <Route path='leave/grant' element={<LeaveRequest />} />

            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 