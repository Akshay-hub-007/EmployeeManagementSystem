import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TopBar = ({ title, onMenuToggle }) => {
  const { user } = useAuth();

  return (
    <div className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition" onClick={onMenuToggle}>
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center gap-6">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium text-sm">{user?.name}</div>
            <div className="text-xs text-gray-500">{user?.position}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-bold overflow-hidden">
            {user?.avatar}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;