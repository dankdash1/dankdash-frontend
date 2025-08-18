import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple hardcoded check for immediate access
    if (credentials.email === 'admin@dankdash.com' && credentials.password === 'admin123') {
      // Set admin session
      localStorage.setItem('dankdash_user', JSON.stringify({
        id: 1,
        email: 'admin@dankdash.com',
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin',
        token: 'admin-direct-access-token'
      }));
      
      // Redirect to admin dashboard
      navigate('/admin');
      window.location.reload(); // Force refresh to update navigation
      return;
    }

    // Try API login as backup
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('dankdash_user', JSON.stringify(data.user));
        localStorage.setItem('dankdash_token', data.token);
        navigate('/admin');
        window.location.reload();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to DankDash Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your business management dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Admin Login Credentials:</h3>
            <p className="text-sm text-blue-700">Email: admin@dankdash.com</p>
            <p className="text-sm text-blue-700">Password: admin123</p>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in to Admin Dashboard'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setCredentials({ email: 'admin@dankdash.com', password: 'admin123' });
              }}
              className="text-green-600 hover:text-green-500 text-sm font-medium"
            >
              Auto-fill admin credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleLogin;

