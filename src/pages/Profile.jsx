import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Edit3, Save, X } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    department: '',
    position: '',
    joinDate: '',
    manager: '',
    employeeId: '',
    emergencyContact: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.username || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth || '1990-01-01',
        department: user.department || '',
        position: user.position || '',
        joinDate: user.joinedAt || new Date().toISOString().split('T')[0],
        manager: 'Sarah Johnson',
        employeeId: user.id || '',
        emergencyContact: ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.username || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      address: user.address || '',
      dateOfBirth: user.dateOfBirth || '1990-01-01',
      department: user.department || '',
      position: user.position || '',
      joinDate: user.joinedAt || new Date().toISOString().split('T')[0],
      manager: 'Sarah Johnson',
      employeeId: user.id || '',
      emergencyContact: ''
    });
    setIsEditing(false);
  };

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
              <button onClick={handleCancel} className="px-4 py-2 bg-gray-200 rounded-lg flex items-center gap-2">
                <X size={16} /> Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                <Save size={16} /> Save Changes
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
              <Edit3 size={16} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10">
        {/* Profile Picture */}
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="w-30 h-30 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-8">
            {user?.username
              ?.split(' ')
              .map(word => word.charAt(0).toUpperCase())
              .join('')}
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

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="flex items-center gap-2"><User size={16} /> Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`} />
            </div>

            <div>
              <label className="flex items-center gap-2"><Mail size={16} /> Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`} />
            </div>

            <div>
              <label className="flex items-center gap-2"><Phone size={16} /> Phone</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`} />
            </div>

            <div>
              <label className="flex items-center gap-2"><Calendar size={16} /> Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`} />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2"><MapPin size={16} /> Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Work Information */}
      <div className="bg-white rounded-xl shadow p-6 mt-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Work Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="flex items-center gap-2"><Briefcase size={16} /> Position</label>
            <input type="text" name="position" value={formData.position} onChange={handleInputChange} disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`} />
          </div>

          <div>
            <label className="flex items-center gap-2"><User size={16} /> Department</label>
            <input type="text" name="department" value={formData.department} onChange={handleInputChange} disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`} />
          </div>

          <div>
            <label className="flex items-center gap-2"><User size={16} /> Reporting Manager</label>
            <input type="text" name="manager" value={formData.manager} onChange={handleInputChange} disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`} />
          </div>

          <div>
            <label className="flex items-center gap-2"><Calendar size={16} /> Join Date</label>
            <input type="date" name="joinDate" value={formData.joinDate} onChange={handleInputChange} disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`} />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2"><Phone size={16} /> Emergency Contact</label>
            <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
