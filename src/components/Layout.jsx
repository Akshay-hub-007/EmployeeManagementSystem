import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import TopBar from './TopBar';
import axios from 'axios';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8086/authenticated", {
          withCredentials: true,
        });

        if (res.status !== 200) {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        navigate("/login"); // 👈 redirect on error
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    // Only close sidebar on route change for mobile screens
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
      case '/hr-dashboard':
        return 'HR Dashboard';
      case '/employee-dashboard':
        return 'Employee Dashboard';
      case '/employees':
        return 'Employee List';
      case '/profile':
        return 'Profile';
      case '/salary':
        return 'Salary & Payslips';
      case '/attendance':
        return 'Attendance';
      case '/leave':
        return 'Leave Management';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <Navigation isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={`flex-1 min-w-0 min-h-screen transition-all duration-300 ${sidebarOpen ? 'md:ml-[220px]' : 'md:ml-0'} bg-gray-50`}>

        <TopBar
          title={getPageTitle()}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;