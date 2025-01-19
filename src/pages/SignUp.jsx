import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importing the useNavigate hook

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',  // Adding state for confirm password
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();  // Initialize the navigate function

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email || !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';  // Adding confirm password check
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Add your signup logic here
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-400 to-cyan-500 p-4">
      <div className="w-full max-w-4xl flex bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex-1 p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-2">Join us to manage your healthcare needs</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
              />
              {errors.username && (
                <div className="text-red-500 text-sm mt-1">{errors.username}</div>
              )}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
              />
              {errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Create Account
            </button>

            <div className="text-center text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
                onClick={() => navigate('/login')}  // Redirecting to Login page
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        <div className="hidden lg:block flex-1 relative bg-emerald-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-white space-y-4">
              <h3 className="text-3xl font-bold">Join Our Healthcare Platform</h3>
              <p className="text-lg opacity-90">
                Create an account to access all our pharmacy services
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
