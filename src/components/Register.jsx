import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from "../config/backend";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    phone_number: '',
    username: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
  const res = await axios.post(`${BACKEND_URL}/register`, {
        email: form.email,
        password: form.password,
        phone_number: form.phone_number,
        username: form.username,
      });
      setMessage(res.data);
      navigate("/login")  
    } catch (err) {
      setMessage('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number</label>
          <input type="text" name="phone_number" value={form.phone_number} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="text-center mt-2">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/login" className="text-blue-600 hover:underline font-medium">Login</a>
        </div>
        {message && <div className="mt-4 text-center text-sm text-gray-700">{message}</div>}
      </form>
    </div>
  );
};

export default Register;
