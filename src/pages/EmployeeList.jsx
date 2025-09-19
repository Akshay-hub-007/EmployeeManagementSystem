import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      position: 'Software Developer',
      salary: '$5,500',
      status: 'Active',
      joinDate: '2022-03-15',
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      salary: '$6,200',
      status: 'Active',
      joinDate: '2021-08-22',
      avatar: 'SW'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      department: 'Sales',
      position: 'Sales Representative',
      salary: '$4,800',
      status: 'Active',
      joinDate: '2023-01-10',
      avatar: 'MJ'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      department: 'HR',
      position: 'HR Specialist',
      salary: '$5,000',
      status: 'Active',
      joinDate: '2022-11-05',
      avatar: 'ED'
    },
    {
      id: 5,
      name: 'Alex Chen',
      email: 'alex.chen@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      salary: '$7,200',
      status: 'On Leave',
      joinDate: '2020-06-18',
      avatar: 'AC'
    }
  ];

  const departments = ['all', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const ActionButton = ({ icon: Icon, label, onClick, color = 'primary' }) => (
    <button 
      className={`btn btn-${color} btn-sm`}
      onClick={onClick}
      title={label}
    >
      <Icon size={14} />
      {label}
    </button>
  );

  const EmployeeModal = ({ employee, onClose }) => {
    if (!employee) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Employee Details</h3>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="modal-content">
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'var(--primary-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: '0 auto var(--spacing-md)'
              }}>
                {employee.avatar}
              </div>
              <h4 style={{ margin: 0, marginBottom: '4px' }}>{employee.name}</h4>
              <p style={{ margin: 0, color: 'var(--gray-600)' }}>{employee.position}</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
              <div>
                <strong>Department:</strong>
                <p>{employee.department}</p>
              </div>
              <div>
                <strong>Email:</strong>
                <p>{employee.email}</p>
              </div>
              <div>
                <strong>Salary:</strong>
                <p>{employee.salary}</p>
              </div>
              <div>
                <strong>Status:</strong>
                <span className={`badge badge-${employee.status === 'Active' ? 'success' : 'warning'}`}>
                  {employee.status}
                </span>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <strong>Join Date:</strong>
                <p>{new Date(employee.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary">
              <Edit size={16} />
              Edit Employee
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Employee Management</h2>
          <p className="text-gray-600 m-0">Manage and view all employee information</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-150">
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-6 items-center">
          <div className="relative">
            <Search 
              size={20} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors duration-150">
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Employee</th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Department</th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Position</th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Salary</th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Status</th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Join Date</th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                        {employee.avatar}
                      </div>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-gray-600">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${employee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td>{new Date(employee.joinDate).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      <ActionButton
                        icon={Eye}
                        label="View"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setShowModal(true);
                        }}
                        color="secondary"
                      />
                      <ActionButton
                        icon={Edit}
                        label="Edit"
                        onClick={() => console.log('Edit', employee.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Details Modal */}
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