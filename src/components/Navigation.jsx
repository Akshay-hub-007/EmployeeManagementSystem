import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Users, 
  User, 
  DollarSign, 
  Calendar, 
  FileText, 
  BarChart3,
  LogOut 
} from 'lucide-react';

const Navigation = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const hrMenuItems = [
    { path: '/hr-dashboard', label: 'HR Dashboard', icon: Home },
    { path: '/employees', label: 'Employee List', icon: Users },
    { path: '/leave', label: 'Leave Requests', icon: FileText },
    { path: '/attendance', label: 'Attendance', icon: Calendar },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const employeeMenuItems = [
    { path: '/employee-dashboard', label: 'Dashboard', icon: Home },
    { path: '/profile', label: 'My Profile', icon: User },
    { path: '/salary', label: 'Salary & Payslips', icon: DollarSign },
    { path: '/attendance', label: 'My Attendance', icon: Calendar },
    { path: '/leave', label: 'Leave Management', icon: FileText }
  ];
  console.log(user?.role)
  const menuItems = user?.role === 'EMPLOYEE' ? hrMenuItems : employeeMenuItems;

  return (
    <div
      className={`
        fixed left-0 top-0 z-50 h-screen bg-white border-r border-gray-200 shadow w-[220px] min-w-[180px] transition-all duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
         flex flex-col
      `}
    >
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="text-2xl font-bold text-blue-700 tracking-tight">EMS Portal</div>
        <div className="text-xs text-gray-500 mt-1">Employee Management System</div>
      </div>

      <nav className="flex-1 flex flex-col space-y-1 px-2 py-4 ">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 mt-5 mb-5 px-5 py-2 rounded-lg text-gray-700 font-medium transition-colors duration-150
                hover:bg-blue-100 hover:text-blue-700 pl-2
                ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
              onClick={() => {
                if (window.innerWidth < 768 && onClose) onClose();
              }}
            >
              <IconComponent size={20} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}

        <button
          className="flex items-center gap-3 px-5 py-2 rounded-lg text-gray-700 font-medium transition-colors duration-150 hover:bg-red-100 hover:text-red-600 mt-8 cursor-pointer pl-2"
          onClick={logout}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
};

export default Navigation;