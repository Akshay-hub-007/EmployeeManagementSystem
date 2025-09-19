import axios from 'axios';
import { Clock, DollarSign, Calendar, Award, User, FileText } from 'lucide-react';
import { useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const EmployeeDashboard = () => {
  const stats = [
    {
      icon: Clock,
      label: 'Hours This Month',
      value: '168.5',
      change: '+5.2 from last month',
      positive: true,
      color: 'primary'
    },
    {
      icon: DollarSign,
      label: 'Current Salary',
      value: '$5,500',
      change: 'Next review: March 2024',
      positive: true,
      color: 'secondary'
    },
    {
      icon: Calendar,
      label: 'Leave Balance',
      value: '18 days',
      change: '12 days used this year',
      positive: true,
      color: 'accent'
    },
    {
      icon: Award,
      label: 'Performance Rating',
      value: '8.7/10',
      change: 'Excellent performance',
      positive: true,
      color: 'secondary'
    }
  ];

  const leaveData = [
    { name: 'Used', value: 12, color: 'var(--primary-500)' },
    { name: 'Available', value: 18, color: 'var(--secondary-500)' }
  ];

  const performanceData = [
    { month: 'Jul', rating: 8.2 },
    { month: 'Aug', rating: 8.5 },
    { month: 'Sep', rating: 8.8 },
    { month: 'Oct', rating: 8.7 },
    { month: 'Nov', rating: 9.1 },
    { month: 'Dec', rating: 8.7 }
  ];

  const recentPayslips = [
    { month: 'December 2023', amount: '$5,500', status: 'Paid' },
    { month: 'November 2023', amount: '$5,500', status: 'Paid' },
    { month: 'October 2023', amount: '$5,500', status: 'Paid' }
  ];

  const upcomingEvents = [
    {
      date: 'Dec 25',
      title: 'Holiday - Christmas Day',
      type: 'holiday'
    },
    {
      date: 'Dec 29',
      title: 'Team Meeting',
      type: 'meeting'
    },
    {
      date: 'Jan 1',
      title: 'New Year Holiday',
      type: 'holiday'
    },
    {
      date: 'Jan 15',
      title: 'Performance Review',
      type: 'review'
    }
  ];
  // useEffect(async()=>{
  //   const res=await axios.post("http://localhost:")
  // })
  return (
  <div className="space-y-6 p-4 md:p-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, John!
        </h2>
        <p className="text-gray-600">
          Here's an overview of your work summary and recent activities.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                stat.color === 'primary' ? 'bg-blue-50 text-blue-600' :
                stat.color === 'secondary' ? 'bg-green-50 text-green-600' :
                'bg-orange-50 text-orange-600'
              }`}>
                <IconComponent size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className={`text-sm font-medium ${stat.positive ? 'text-green-500' : 'text-red-500'}`}> 
                {stat.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Balance */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Leave Balance</h3>
            <p className="text-gray-500 text-sm">Annual leave allocation and usage</p>
          </div>
          <div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leaveData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {leaveData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <span className="text-sm">Used (12)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <span className="text-sm">Available (18)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Performance Trend</h3>
            <p className="text-gray-500 text-sm">Monthly performance ratings</p>
          </div>
          <div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar dataKey="rating" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payslips */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Recent Payslips</h3>
            <p className="text-gray-500 text-sm">Latest salary payments</p>
          </div>
          <div>
            <div className="space-y-4">
              {recentPayslips.map((payslip, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div>
                    <p className="font-medium">{payslip.month}</p>
                    <p className="text-sm text-gray-600">{payslip.amount}</p>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded">
                    {payslip.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-150">
              <FileText size={16} />
              View All Payslips
            </button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Upcoming Events</h3>
            <p className="text-gray-500 text-sm">Important dates and reminders</p>
          </div>
          <div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className={`min-w-12 p-2 rounded-lg text-center text-xs font-semibold mr-4 ${
                    event.type === 'holiday' ? 'bg-green-50 text-green-600' :
                    event.type === 'meeting' ? 'bg-blue-50 text-blue-600' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    {event.date}
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-600 capitalize">
                      {event.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;