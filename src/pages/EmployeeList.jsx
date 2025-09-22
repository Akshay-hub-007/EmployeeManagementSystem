import { useEffect, useState } from 'react';
import { Search, Plus, Filter, Edit, Eye } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const departments = ['all', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];

  // Fetch employees from API
  useEffect(() => {
    const getEmployees = async () => {
      try {
  const res = await axios.get(`${BACKEND_URL}/employees`, { withCredentials: true });
        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    };
    getEmployees();
  }, []);

  // Filter employees based on search and department
  const filteredEmployees = employees.filter(employee => {
    const name = employee.employee || '';
    const position = employee.position || '';
    const email = employee.email || '';

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const ActionButton = ({ icon: Icon, label, onClick, color = 'primary' }) => (
    <button
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium ${color === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
      onClick={onClick}
      title={label}
    >
      <Icon size={14} />
      {label}
    </button>
  );

  // Toggle user role
  const handleToggleRole = async (id) => {
    try {
  await axios.put(`${BACKEND_URL}/toggleRole/${id}`, {}, { withCredentials: true });
  // Refresh employees after role change
  const res = await axios.get(`${BACKEND_URL}/employees`, { withCredentials: true });
  setEmployees(res.data);
    } catch (err) {
      alert("Failed to update user role");
      console.error(err);
    }
  };

  // Employee modal
  const EmployeeModal = ({ employee, onClose }) => {
    if (!employee) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white rounded-xl w-96 p-6 relative" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Employee Details</h3>
            <button className="text-gray-500 text-2xl font-bold" onClick={onClose}>×</button>
          </div>
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">
              {employee.employee?.split(' ').map(n => n[0]).join('') || 'E'}
            </div>
            <h4 className="font-semibold">{employee.employee}</h4>
            <p className="text-gray-500">{employee.position}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <strong>Department:</strong>
              <p>{employee.department}</p>
            </div>
            <div>
              <strong>Email:</strong>
              <p>{employee.email || 'N/A'}</p>
            </div>
            <div>
              <strong>Salary:</strong>
              <p>{employee.salary ? `$${employee.salary}` : 'N/A'}</p>
            </div>
            <div>
              <strong>Status:</strong>
              {employee.status ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {employee.status}
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Absent</span>
              )}
            </div>
            <div className="col-span-2">
              <strong>Join Date:</strong>
              <p>{employee.joinDate ? new Date(employee.joinDate).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={onClose}>Close</button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1">
              <Edit size={16} /> Edit
            </button>
          </div>
        </div>
      </div>
    );
  };
  console.log(filteredEmployees)
  return (
    <div className="animate-fade-in p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Employee Management</h2>
          <p className="text-gray-600 m-0">Manage and view all employee information</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-150">
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-6 items-center">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDepartment}
            onChange={e => setSelectedDepartment(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors duration-150">
            <Filter size={16} /> More Filters
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Employee</th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Department</th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Position</th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200 text-right">Salary</th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Status</th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Join Date</th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                        {emp.employee?.split(' ').map(n => n[0]).join('') || 'E'}
                      </div>
                      <div>
                        <div className="font-medium">{emp.employee}</div>
                        <div className="text-sm text-gray-500">{emp.email || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{emp.department}</td>
                  <td className="px-4 py-3">{emp.position}</td>
                  <td className="px-4 py-3 text-right">{emp.salary ? `$${emp.salary}` : 'N/A'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${emp.status === 'Present'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {emp.status === 'Present' ? 'Present' : 'Absent'}
                    </span>

                  </td>
                  <td className="px-4 py-3">{emp.joinDate ? new Date(emp.joinDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <ActionButton
                        icon={Eye}
                        label="View"
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setShowModal(true);
                        }}
                        color="secondary"
                      />
                      <ActionButton
                        icon={Edit}
                        label="Edit"
                        onClick={() => console.log('Edit', emp.id)}
                      />
                      {emp.role === 'ADMIN' ? (
                        <button
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600"
                          onClick={() => handleToggleRole(emp.id)}
                          title="Make Employee"
                        >
                          Make Employee
                        </button>
                      ) : (
                        <button
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700"
                          onClick={() => handleToggleRole(emp.id)}
                          title="Make Admin"
                        >
                          Make Admin
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Modal */}
      {showModal && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => {
            setShowModal(false);
            setSelectedEmployee(null);
          }}
        />
      )}
    </div>
  );
};

export default EmployeeList;
