import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Edit3, Save, X } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    dateOfBirth: '1990-05-15',
    department: user?.department || 'Engineering',
    position: user?.position || 'Software Developer',
    joinDate: '2022-03-15',
    manager: 'Sarah Johnson',
    employeeId: 'EMP001',
    emergencyContact: 'Jane Doe - (555) 987-6543'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // In a real app, this would update the user data via API
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: user?.name || 'John Doe',
      email: user?.email || 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      dateOfBirth: '1990-05-15',
      department: user?.department || 'Engineering',
      position: user?.position || 'Software Developer',
      joinDate: '2022-03-15',
      manager: 'Sarah Johnson',
      employeeId: 'EMP001',
      emergencyContact: 'Jane Doe - (555) 987-6543'
    });
    setIsEditing(false);
  };

  const ProfileField = ({ icon: Icon, label, value, name, type = 'text', editable = true }) => (
    <div className="mb-6">
  <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
        <Icon size={16} />
        {label}
      </label>
      {isEditing && editable ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
          {type === 'date' ? new Date(value).toLocaleDateString() : value}
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-semibold mb-1">
            {user?.role === 'hr' ? 'My Profile' : 'Employee Profile'}
          </h2>
          <p className="text-gray-600 m-0">
            {isEditing ? 'Edit your personal information' : 'View and manage your profile information'}
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors duration-150" onClick={handleCancel}>
                <X size={16} />
                Cancel
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-150" onClick={handleSave}>
                <Save size={16} />
                Save Changes
              </button>
            </>
          ) : (
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-150" onClick={() => setIsEditing(true)}>
              <Edit3 size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10">
        {/* Profile Picture Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-center">
            <div className="w-30 h-30 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-8">
              {user?.avatar || 'JD'}
            </div>
            <h3 className="text-lg font-semibold mb-1">{formData.name}</h3>
            <p className="text-gray-600 mb-2">{formData.position}</p>
            <p className="text-sm text-gray-600 mb-6">Employee ID: {formData.employeeId}</p>
            <div className="p-4 bg-green-50 rounded-lg mb-4">
              <p className="text-sm text-green-600 m-0">
                <strong>Department</strong><br />
                {formData.department}
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 m-0">
                <strong>Joined</strong><br />
                {new Date(formData.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
            <p className="text-gray-500 text-sm">Your personal and contact details</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProfileField
              icon={User}
              label="Full Name"
              value={formData.name}
              name="name"
            />
            <ProfileField
              icon={Mail}
              label="Email Address"
              value={formData.email}
              name="email"
              type="email"
              editable={false}
            />
            <ProfileField
              icon={Phone}
              label="Phone Number"
              value={formData.phone}
              name="phone"
              type="tel"
            />
            <ProfileField
              icon={Calendar}
              label="Date of Birth"
              value={formData.dateOfBirth}
              name="dateOfBirth"
              type="date"
            />
            <div className="md:col-span-2">
              <ProfileField
                icon={MapPin}
                label="Address"
                value={formData.address}
                name="address"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Work Information */}
      <div className="bg-white rounded-xl shadow p-6 mt-10">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Work Information</h3>
          <p className="text-gray-500 text-sm">Job details and organizational information</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProfileField
            icon={Briefcase}
            label="Position"
            value={formData.position}
            name="position"
            editable={false}
          />
          <ProfileField
            icon={User}
            label="Department"
            value={formData.department}
            name="department"
            editable={false}
          />
          <ProfileField
            icon={User}
            label="Reporting Manager"
            value={formData.manager}
            name="manager"
            editable={false}
          />
          <ProfileField
            icon={Calendar}
            label="Join Date"
            value={formData.joinDate}
            name="joinDate"
            type="date"
            editable={false}
          />
          <div className="md:col-span-2">
            <ProfileField
              icon={Phone}
              label="Emergency Contact"
              value={formData.emergencyContact}
              name="emergencyContact"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;