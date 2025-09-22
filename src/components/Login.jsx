import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import BACKEND_URL from "../config/backend";

const Login = () => {
  const { user, login } = useAuth();
  const [role, setRole] = useState('employee');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
  const res = await axios.get(`${BACKEND_URL}/authenticated`, {
          withCredentials: true,
        });

        if (res.status == 200) {
          navigate("/");
        } else {
          navigate("/login")
        }
      } catch (err) {
        console.error(err);
        // if (!user) navigate("/login")
        navigate("/login");
      }
    };
    checkAuth()
  }, [])
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
  const res = await axios.post(`${BACKEND_URL}/sign`, {
        email: formData.email,
        password: formData.password,
      }, { withCredentials: true });
      console.log(res)
      console.log(res.status)
      if (res.status === 200) {

        login(res.data.user)
        console.log("navigating....")
        navigate("/");
      }

    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        {/* <div className="flex mb-8 gap-2">
          <div
            className={`flex-1 cursor-pointer rounded-lg px-4 py-3 border text-center transition-all duration-150 ${role === 'employee' ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-gray-50 text-gray-700 border-gray-300'}`}
            onClick={() => setRole('employee')}
          >
            <div className="font-medium">Employee</div>
            <div className="text-sm opacity-70">Access your dashboard</div>
          </div>
          <div
            className={`flex-1 cursor-pointer rounded-lg px-4 py-3 border text-center transition-all duration-150 ${role === 'hr' ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-gray-50 text-gray-700 border-gray-300'}`}
            onClick={() => setRole('hr')}
          >
            <div className="font-medium">HR Manager</div>
            <div className="text-sm opacity-70">Manage employees</div>
          </div>
        </div> */}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-1 text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-150 mb-4 disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-2">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/register" className="text-blue-600 hover:underline font-medium">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;