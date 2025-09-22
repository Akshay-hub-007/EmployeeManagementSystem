import { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ---------------- Modal Component ----------------
const LeaveApplicationModal = ({ setShowModal, formData, setFormData, handleSubmit, calculateDays }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Apply for Leave</h3>
          <button
            className="text-2xl text-gray-400 hover:text-gray-600"
            onClick={() => setShowModal(false)}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 space-y-4">
            <div>
              <label className="block font-medium mb-1">Leave Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Annual">Annual Leave</option>
                <option value="Sick">Sick Leave</option>
                <option value="Personal">Personal Leave</option>
                <option value="Emergency">Emergency Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {formData.startDate && formData.endDate && (
              <div className="p-2 bg-blue-50 rounded-lg mb-2 text-blue-700 text-sm">
                Duration: {calculateDays(formData.startDate, formData.endDate)} day(s)
              </div>
            )}

            <div>
              <label className="block font-medium mb-1">Reason</label>
              <textarea
                name="reason"
                value={formData.reason || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Please provide a reason for your leave request..."
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Emergency Contact (Optional)</label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name and phone number"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t px-6 py-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ---------------- Main Component ----------------
const LeaveManagement = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [formData, setFormData] = useState({
    type: 'Annual',
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
  });
  const [leaveRequests, setLeaveRequests] = useState([]);

  const leaveBalance = {
    annual: { used: 8, total: 25 },
    sick: { used: 2, total: 10 },
    personal: { used: 1, total: 5 },
    emergency: { used: 0, total: 3 },
  };

  // Fetch leave requests for the employee
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

  const getStatusBadge = (status) => {
    const badgeClass =
      status === 'Approved'
        ? 'bg-green-100 text-green-700 border-green-300'
        : status === 'Pending'
        ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
        : 'bg-red-100 text-red-700 border-red-300';
    return (
      <span
        className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${badgeClass}`}
      >
        {status}
      </span>
    );
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  await axios.post(`${BACKEND_URL}/leave/apply`, formData, {
      withCredentials: true,
    });
    setShowModal(false);
    setFormData({
      type: 'Annual',
      startDate: '',
      endDate: '',
      reason: '',
      emergencyContact: '',
    });
    // Refresh leave requests after applying
    if (user?.id) {
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
    }
  };

  const filteredRequests = leaveRequests.filter(
    (req) =>
      selectedStatus === 'all' ||
      req.status?.toLowerCase() === selectedStatus
  );

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-semibold mb-1">
            {user?.role === 'hr' ? 'Leave Management' : 'My Leave Requests'}
          </h2>
          <p className="text-gray-600 m-0">
            {user?.role === 'hr'
              ? 'Manage employee leave requests and approvals'
              : 'Apply for leave and track your requests'}
          </p>
        </div>
        {user?.role !== 'hr' && (
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-150"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} />
            Apply for Leave
          </button>
        )}
      </div>

      {/* Leave Balance */}
      {user?.role !== 'hr' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {Object.entries(leaveBalance).map(([type, balance]) => (
            <div key={type} className="bg-white rounded-xl shadow p-6">
              <div className="text-center">
                <div className="text-lg font-semibold mb-1 capitalize">
                  {type} Leave
                </div>
                <div className="text-3xl font-bold mb-2">
                  {balance.total - balance.used}
                </div>
                <div className="text-sm text-gray-600 mb-4">Available days</div>
                <div className="flex justify-between border-t pt-2 text-sm">
                  <span>Used: {balance.used}</span>
                  <span>Total: {balance.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow mb-6">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <Filter size={20} className="text-gray-600" />
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-xl shadow">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">
            {user?.role === 'hr' ? 'Team Leave Requests' : 'Leave Request History'}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left font-semibold">Leave Type</th>
                <th className="px-4 py-2 text-left font-semibold">Start Date</th>
                <th className="px-4 py-2 text-left font-semibold">End Date</th>
                <th className="px-4 py-2 text-left font-semibold">Days</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Applied On</th>
                <th className="px-4 py-2 text-left font-semibold">Approved By</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b last:border-0">
                  <td className="px-4 py-2">{request.type}</td>
                  <td className="px-4 py-2">
                    {new Date(request.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(request.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 font-medium">{request.days}</td>
                  <td className="px-4 py-2">{getStatusBadge(request.status)}</td>
                  <td className="px-4 py-2">
                    {request.appliedDate
                      ? new Date(request.appliedDate).toLocaleDateString()
                      : '-'}
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-sm text-gray-600">
                      {request.approvedBy || '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <LeaveApplicationModal
          setShowModal={setShowModal}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          calculateDays={calculateDays}
        />
      )}
    </div>
  );
};

export default LeaveManagement;