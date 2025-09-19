import { useState } from 'react';
import { DollarSign, Download, Eye, Calendar, TrendingUp, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Salary = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  
  const currentSalary = {
    basic: 4500,
    allowances: 800,
    bonus: 200,
    total: 5500,
    tax: 650,
    netSalary: 4850
  };

  const payslips = [
    {
      id: 1,
      month: 'December 2023',
      gross: 5500,
      deductions: 650,
      net: 4850,
      status: 'Paid',
      paidDate: '2023-12-01'
    },
    {
      id: 2,
      month: 'November 2023',
      gross: 5500,
      deductions: 650,
      net: 4850,
      status: 'Paid',
      paidDate: '2023-11-01'
    },
    {
      id: 3,
      month: 'October 2023',
      gross: 5500,
      deductions: 650,
      net: 4850,
      status: 'Paid',
      paidDate: '2023-10-01'
    },
    {
      id: 4,
      month: 'September 2023',
      gross: 5500,
      deductions: 650,
      net: 4850,
      status: 'Paid',
      paidDate: '2023-09-01'
    },
    {
      id: 5,
      month: 'August 2023',
      gross: 5500,
      deductions: 650,
      net: 4850,
      status: 'Paid',
      paidDate: '2023-08-01'
    },
    {
      id: 6,
      month: 'July 2023',
      gross: 5300,
      deductions: 630,
      net: 4670,
      status: 'Paid',
      paidDate: '2023-07-01'
    }
  ];

  const salaryTrend = [
    { month: 'Jul', amount: 4670 },
    { month: 'Aug', amount: 4850 },
    { month: 'Sep', amount: 4850 },
    { month: 'Oct', amount: 4850 },
    { month: 'Nov', amount: 4850 },
    { month: 'Dec', amount: 4850 }
  ];

  const annualSummary = {
    totalEarned: 58200,
    totalTax: 7800,
    totalBonus: 2400,
    averageMonthly: 4850
  };

  const PayslipModal = ({ payslip, onClose }) => {
    if (!payslip) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4 animate-fade-in" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center border-b px-6 py-4">
            <h3 className="text-lg font-semibold">Payslip - {payslip.month}</h3>
            <button className="text-2xl text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
          </div>
          <div className="px-6 py-4">
            <div className="mb-6">
              <h4 className="mb-3 font-semibold">Earnings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span>Basic Salary:</span>
                  <span>${currentSalary.basic}</span>
                </div>
                <div className="flex justify-between">
                  <span>Allowances:</span>
                  <span>${currentSalary.allowances}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bonus:</span>
                  <span>${currentSalary.bonus}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Gross Salary:</span>
                  <span>${payslip.gross}</span>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h4 className="mb-3 font-semibold">Deductions</h4>
              <div className="flex justify-between">
                <span>Tax & Other Deductions:</span>
                <span>${payslip.deductions}</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg font-semibold text-lg">
              <span>Net Salary:</span>
              <span>${payslip.net}</span>
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t px-6 py-4">
            <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium" onClick={onClose}>Close</button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium">
              <Download size={16} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    );
  };

  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Salary & Payslips</h2>
          <p className="text-gray-600 m-0">View your salary details and download payslips</p>
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
          style={{ width: 'auto' }}
        >
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      {/* Current Salary Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Current Salary Breakdown</h3>
            <p className="text-gray-500 text-sm">Monthly salary components</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-600">Basic Salary</span>
              <span className="font-medium">${currentSalary.basic}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-600">Allowances</span>
              <span className="font-medium">${currentSalary.allowances}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-600">Performance Bonus</span>
              <span className="font-medium">${currentSalary.bonus}</span>
            </div>
            <div className="flex justify-between pb-2 border-b-2 border-gray-300">
              <span className="font-semibold">Gross Salary</span>
              <span className="font-semibold text-lg">${currentSalary.total}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-red-500">Deductions</span>
              <span className="text-red-500 font-medium">-${currentSalary.tax}</span>
            </div>
            <div className="flex justify-between p-4 bg-blue-50 rounded-lg mt-2">
              <span className="font-semibold text-blue-700">Net Salary</span>
              <span className="font-bold text-xl text-blue-700">${currentSalary.netSalary}</span>
            </div>
          </div>
        </div>

        {/* Annual Summary */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Annual Summary {selectedYear}</h3>
            <p className="text-gray-500 text-sm">Year-to-date earnings overview</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mx-auto mb-2">
                <DollarSign size={24} className="text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">${annualSummary.totalEarned.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Earned</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-lg mx-auto mb-2">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1">${annualSummary.averageMonthly.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Monthly Average</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-50 rounded-lg mx-auto mb-2">
                <PieChart size={24} className="text-yellow-600" />
              </div>
              <div className="text-2xl font-bold mb-1">${annualSummary.totalTax.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Tax</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-lg mx-auto mb-2">
                <Calendar size={24} className="text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1">${annualSummary.totalBonus.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Bonus</div>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Trend Chart */}
      <div className="bg-white rounded-xl shadow mb-10">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Salary Trend</h3>
          <p className="text-gray-500 text-sm">Monthly net salary over the past 6 months</p>
        </div>
        <div className="px-6 py-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salaryTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payslips Table */}
      <div className="bg-white rounded-xl shadow">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Payslip History</h3>
          <p className="text-gray-500 text-sm">Download or view your past payslips</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left font-semibold">Month</th>
                <th className="px-4 py-2 text-left font-semibold">Gross Salary</th>
                <th className="px-4 py-2 text-left font-semibold">Deductions</th>
                <th className="px-4 py-2 text-left font-semibold">Net Salary</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Paid Date</th>
                <th className="px-4 py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payslips.map((payslip) => (
                <tr key={payslip.id} className="border-b last:border-0">
                  <td className="px-4 py-2 font-medium">{payslip.month}</td>
                  <td className="px-4 py-2">${payslip.gross}</td>
                  <td className="px-4 py-2 text-red-500">-${payslip.deductions}</td>
                  <td className="px-4 py-2 font-semibold text-blue-700">${payslip.net}</td>
                  <td className="px-4 py-2">
                    <span className="inline-block px-3 py-1 rounded-full border border-green-300 bg-green-100 text-green-700 text-xs font-semibold">{payslip.status}</span>
                  </td>
                  <td className="px-4 py-2">{new Date(payslip.paidDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold flex items-center gap-1"
                        onClick={() => {
                          setSelectedPayslip(payslip);
                          setShowModal(true);
                        }}
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1">
                        <Download size={14} />
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payslip Modal */}
      {showModal && (
        <PayslipModal
          payslip={selectedPayslip}
          onClose={() => {
            setShowModal(false);
            setSelectedPayslip(null);
          }}
        />
      )}
    </div>
  );
};

export default Salary;