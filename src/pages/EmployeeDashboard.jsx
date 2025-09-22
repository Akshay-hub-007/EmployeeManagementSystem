import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { Clock, DollarSign, Calendar, Award, User, FileText } from 'lucide-react';
import { useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAuth } from '../context/AuthContext';

import { useState } from 'react';

const EmployeeDashboard = () => {
  const { user } = useAuth()
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  // Fetch attendance records
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
  const res = await axios.get(`${BACKEND_URL}/attendance/getAttendenceById`, { withCredentials: true });
        const data = res.data;
        console.log(data)
        // Transform API data for table
        const formatted = data.map((item) => ({
          date: new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          status: item.status,
          checkIn: item.checkInTime
            ? new Date(item.checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "-",
          checkOut: item.checkOutTime
            ? new Date(item.checkOutTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "-",
          hours: item.workHours ? item.workHours.toFixed(1) : "0",
        }));

        setAttendanceRecords(formatted);

        // Today's record
        const today = new Date().toISOString().split("T")[0];
        const todayRecord = data.find((item) => item.date === today);
        if (todayRecord) {
          setTodayAttendance({
            status: todayRecord.status,
            checkIn: todayRecord.checkInTime
              ? new Date(todayRecord.checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "-",
            checkOut: todayRecord.checkOutTime
              ? new Date(todayRecord.checkOutTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "-",
            hours: todayRecord.workHours ? todayRecord.workHours.toFixed(1) : "0",
          });
        }
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };
    fetchAttendance();
  }, []);

  // Fetch leave requests for user
  useEffect(() => {
    if (!user?.id) return;
    const getDetails = async () => {
      try {
  const res = await axios.get(`${BACKEND_URL}/leave/getleaves/${user.id}`, { withCredentials: true });
        setLeaveRequests(
          res.data.map((req) => ({
            ...req,
            days:
              req.startDate && req.endDate
                ? Math.ceil(
                  (new Date(req.endDate) - new Date(req.startDate)) /
                  (1000 * 60 * 60 * 24)
                ) + 1
                : 1,
            appliedDate: req.createdAt || req.appliedAt,
            approvedBy: req.approvedBy || null,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch leave requests", err);
      }
    };
    getDetails();
  }, [user?.id]);
  // Calculate working hours for current month
  // Use original data for accurate date parsing
  const [rawAttendance, setRawAttendance] = useState([]);
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
  const res = await axios.get(`${BACKEND_URL}/attendance/getAttendenceById`, { withCredentials: true });
        const data = res.data;
        setRawAttendance(data);
        // ...existing code...
        const formatted = data.map((item) => ({
          date: new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          status: item.status,
          checkIn: item.checkInTime
            ? new Date(item.checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "-",
          checkOut: item.checkOutTime
            ? new Date(item.checkOutTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "-",
          hours: item.workHours ? item.workHours.toFixed(1) : "0",
        }));
        setAttendanceRecords(formatted);
        // ...existing code...
        const today = new Date().toISOString().split("T")[0];
        const todayRecord = data.find((item) => item.date === today);
        if (todayRecord) {
          setTodayAttendance({
            status: todayRecord.status,
            checkIn: todayRecord.checkInTime
              ? new Date(todayRecord.checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "-",
            checkOut: todayRecord.checkOutTime
              ? new Date(todayRecord.checkOutTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "-",
            hours: todayRecord.workHours ? todayRecord.workHours.toFixed(1) : "0",
          });
        }
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };
    fetchAttendance();
  }, []);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const hoursThisMonth = rawAttendance
    .filter((item) => {
      const d = new Date(item.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, item) => sum + (item.workHours ? Number(item.workHours) : 0), 0)
    .toFixed(1);

  // Calculate leave days used and available
  const totalLeave = 30; // Example: total annual leave
  const usedLeave = leaveRequests.filter((req) => req.status === 'Approved').reduce((sum, req) => sum + (req.days || 0), 0);
  const availableLeave = totalLeave - usedLeave;

  const stats = [
    {
      icon: Clock,
      label: 'Hours This Month',
      value: hoursThisMonth,
      change: '',
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
      value: `${availableLeave} days`,
      change: `${usedLeave} days used this year`,
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
    { name: 'Used', value: usedLeave, color: '#3b82f6' }, // blue-500
    { name: 'Available', value: availableLeave, color: '#22c55e' } // green-500
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
      date: 'Oct 12',
      title: 'Holiday - Dasara (Dussehra)',
      type: 'holiday'
    },
    {
      date: 'Oct 31',
      title: 'Holiday - Diwali',
      type: 'holiday'
    },
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
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.color === 'primary' ? 'bg-blue-50 text-blue-600' :
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
                <div className="w-3 h-3 rounded-sm" style={{background:'#3b82f6'}}></div>
                <span className="text-sm">Used ({usedLeave})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{background:'#22c55e'}}></div>
                <span className="text-sm">Available ({availableLeave})</span>
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
        {/* Attendance Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Attendance Records</h3>
            <p className="text-gray-500 text-sm">Daily attendance and working hours</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Check In</th>
                  <th className="px-3 py-2 text-left">Check Out</th>
                  <th className="px-3 py-2 text-left">Work Hours</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-4">No records found.</td></tr>
                ) : (
                  attendanceRecords.map((rec, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-3 py-2">{rec.date}</td>
                      <td className="px-3 py-2">{rec.status}</td>
                      <td className="px-3 py-2">{rec.checkIn}</td>
                      <td className="px-3 py-2">{rec.checkOut}</td>
                      <td className="px-3 py-2">{rec.hours}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
                  <div className={`min-w-12 p-2 rounded-lg text-center text-xs font-semibold mr-4 ${event.type === 'holiday' ? 'bg-green-50 text-green-600' :
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