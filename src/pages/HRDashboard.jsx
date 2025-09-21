import { Users, UserCheck, UserX, TrendingUp, Calendar, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAuth } from '../context/AuthContext';

const HRDashboard = () => {

    const {user,login}=useAuth()
    
  const stats = [
    {
      icon: Users,
      label: 'Total Employees',
      value: '147',
      change: '+12 this month',
      positive: true,
      color: 'primary'
    },
    {
      icon: UserCheck,
      label: 'Present Today',
      value: '134',
      change: '91.2% attendance',
      positive: true,
      color: 'secondary'
    },
    {
      icon: FileText,
      label: 'Leave Requests',
      value: '8',
      change: '3 pending',
      positive: false,
      color: 'accent'
    },
    {
      icon: TrendingUp,
      label: 'Avg Performance',
      value: '8.4/10',
      change: '+0.3 from last month',
      positive: true,
      color: 'secondary'
    }
  ];

  const departmentData = [
    { name: 'Engineering', employees: 45, present: 42 },
    { name: 'Marketing', employees: 28, present: 25 },
    { name: 'Sales', employees: 32, present: 30 },
    { name: 'HR', employees: 12, present: 11 },
    { name: 'Finance', employees: 18, present: 17 },
    { name: 'Operations', employees: 12, present: 9 }
  ];

  const attendanceData = [
    { day: 'Mon', percentage: 95 },
    { day: 'Tue', percentage: 92 },
    { day: 'Wed', percentage: 88 },
    { day: 'Thu', percentage: 94 },
    { day: 'Fri', percentage: 89 },
    { day: 'Sat', percentage: 76 },
    { day: 'Sun', percentage: 45 }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'leave',
      message: 'John Doe submitted leave request for Dec 25-27',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'join',
      message: 'Sarah Wilson joined Engineering department',
      time: '5 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'performance',
      message: 'Q4 performance reviews completed for Marketing',
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'leave',
      message: 'Mike Johnson approved leave request',
      time: '2 days ago',
      status: 'approved'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                stat.color === 'primary' ? 'bg-blue-50 text-blue-600' :
                stat.color === 'secondary' ? 'bg-green-50 text-green-600' :
                'bg-yellow-50 text-yellow-600'
              }`}>
                <IconComponent size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className={`text-sm font-medium ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr] gap-8 mb-10">
        {/* Department Attendance */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Department Attendance</h3>
            <p className="text-gray-500 text-sm">Present vs Total employees by department</p>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="employees" fill="#d1d5db" name="Total" />
                <Bar dataKey="present" fill="#3b82f6" name="Present" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Attendance Trend */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Weekly Trend</h3>
            <p className="text-gray-500 text-sm">Attendance percentage by day</p>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#10b981" 
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activities</h3>
          <p className="text-gray-500 text-sm">Latest updates and notifications</p>
        </div>
        <div className="flex flex-col gap-6">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div 
                className={`w-2 h-2 rounded-full mr-6 ${
                  activity.status === 'pending' ? 'bg-yellow-500' :
                  activity.status === 'approved' ? 'bg-green-500' :
                  'bg-blue-500'
                }`}
              />
              <div className="flex-1">
                <p className="mb-1">{activity.message}</p>
                <p className="text-sm text-gray-600 m-0">{activity.time}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${activity.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;