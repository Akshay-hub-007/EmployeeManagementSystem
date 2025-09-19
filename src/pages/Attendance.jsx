import { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('December 2023');
  const [selectedDate, setSelectedDate] = useState(null);

  const attendanceStats = {
    present: 22,
    absent: 2,
    late: 1,
    totalWorkingDays: 25,
    percentage: 88
  };

  const monthlyData = [
    { month: 'Jul', percentage: 92 },
    { month: 'Aug', percentage: 88 },
    { month: 'Sep', percentage: 95 },
    { month: 'Oct', percentage: 90 },
    { month: 'Nov', percentage: 87 },
    { month: 'Dec', percentage: 88 }
  ];

  const attendanceRecords = [
    { date: '2023-12-01', status: 'Present', checkIn: '09:15', checkOut: '18:30', hours: '8.25' },
    { date: '2023-12-02', status: 'Present', checkIn: '09:00', checkOut: '18:45', hours: '8.75' },
    { date: '2023-12-03', status: 'Present', checkIn: '08:45', checkOut: '18:15', hours: '8.50' },
    { date: '2023-12-04', status: 'Present', checkIn: '09:30', checkOut: '18:30', hours: '8.00' },
    { date: '2023-12-05', status: 'Absent', checkIn: '-', checkOut: '-', hours: '0' },
    { date: '2023-12-06', status: 'Present', checkIn: '09:00', checkOut: '18:00', hours: '8.00' },
    { date: '2023-12-07', status: 'Present', checkIn: '08:55', checkOut: '18:25', hours: '8.50' },
    { date: '2023-12-08', status: 'Present', checkIn: '09:10', checkOut: '18:40', hours: '8.50' },
    { date: '2023-12-09', status: 'Weekend', checkIn: '-', checkOut: '-', hours: '-' },
    { date: '2023-12-10', status: 'Weekend', checkIn: '-', checkOut: '-', hours: '-' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'var(--secondary-500)';
      case 'Absent': return 'var(--error-500)';
      case 'Late': return 'var(--accent-500)';
      case 'Weekend': return 'var(--gray-400)';
      default: return 'var(--gray-400)';
    }
  };

  const getStatusBadge = (status) => {
    const badgeClass = status === 'Present' ? 'badge-success' : 
                       status === 'Absent' ? 'badge-error' :
                       status === 'Late' ? 'badge-warning' : 'badge-secondary';
    return <span className={`badge ${badgeClass}`}>{status}</span>;
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Attendance Tracking</h2>
          <p className="text-gray-600 m-0">Monitor your attendance and working hours</p>
        </div>
        <select 
          className="w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="December 2023">December 2023</option>
          <option value="November 2023">November 2023</option>
          <option value="October 2023">October 2023</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-green-50 text-green-600">
            <CheckCircle size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{attendanceStats.present}</div>
          <div className="text-sm text-gray-600 mb-2">Present Days</div>
          <div className="text-sm font-medium text-green-500">Out of {attendanceStats.totalWorkingDays} working days</div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-yellow-50 text-yellow-600">
            <XCircle size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{attendanceStats.absent}</div>
          <div className="text-sm text-gray-600 mb-2">Absent Days</div>
          <div className="text-sm font-medium text-red-500">{attendanceStats.late} late arrivals</div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-blue-50 text-blue-600">
            <Clock size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">8.2</div>
          <div className="text-sm text-gray-600 mb-2">Avg Hours/Day</div>
          <div className="text-sm font-medium text-green-500">+0.3 from last month</div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-green-50 text-green-600">
            <TrendingUp size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{attendanceStats.percentage}%</div>
          <div className="text-sm text-gray-600 mb-2">Attendance Rate</div>
          <div className="text-sm font-medium text-green-500">Above company average</div>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Monthly Attendance Trend</h3>
          <p className="text-gray-500 text-sm">Attendance percentage over the past 6 months</p>
        </div>
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="percentage" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calendar View */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        {/* Attendance Records */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Daily Attendance Record</h3>
            <p className="text-gray-500 text-sm">Detailed view of check-in and check-out times</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr>
                  <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Date</th>
                  <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Status</th>
                  <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Check In</th>
                  <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Check Out</th>
                  <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Hours</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="font-medium">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    <td>{getStatusBadge(record.status)}</td>
                    <td>
                      {record.checkIn !== '-' ? (
                        <span className={`${record.checkIn > '09:00' ? 'text-yellow-600' : 'text-green-600'} font-medium`}>
                          {record.checkIn}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td>
                      {record.checkOut !== '-' ? (
                        <span className="font-medium">{record.checkOut}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td>
                      {record.hours !== '-' && record.hours !== '0' ? (
                        <span className="font-medium">{record.hours}h</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Summary */}
        <div className="flex flex-col gap-8">
          {/* Today's Status */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Today's Status</h3>
              <p className="text-gray-500 text-sm">Current day information</p>
            </div>
            <div>
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <Clock size={32} className="text-green-600" />
                </div>
                <div className="text-xl font-semibold mb-1">8.5 hours</div>
                <div className="text-sm text-gray-600">Worked today</div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Check In</span>
                  <span className="font-medium">09:15 AM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Expected Check Out</span>
                  <span className="font-medium">06:15 PM</span>
                </div>
              </div>

              <button 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-150"
              >
                Check Out Now
              </button>
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Monthly Summary</h3>
              <p className="text-gray-500 text-sm">{selectedMonth}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center p-2 bg-green-50 rounded-lg">
                <CheckCircle size={20} className="text-green-600 mr-2" />
                <div className="flex-1">
                  <div className="text-sm text-green-600">Present</div>
                  <div className="font-semibold">{attendanceStats.present} days</div>
                </div>
              </div>
              <div className="flex items-center p-2 bg-red-50 rounded-lg">
                <XCircle size={20} className="text-red-500 mr-2" />
                <div className="flex-1">
                  <div className="text-sm text-red-500">Absent</div>
                  <div className="font-semibold">{attendanceStats.absent} days</div>
                </div>
              </div>
              <div className="flex items-center p-2 bg-yellow-50 rounded-lg">
                <Clock size={20} className="text-yellow-600 mr-2" />
                <div className="flex-1">
                  <div className="text-sm text-yellow-600">Late</div>
                  <div className="font-semibold">{attendanceStats.late} days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;