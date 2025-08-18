import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const CustomerLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check if user exists in localStorage (from registration)
      const customers = JSON.parse(localStorage.getItem('dankdash_customers') || '[]');
      const partners = JSON.parse(localStorage.getItem('dankdash_partners') || '[]');
      
      // Find customer by email and password
      const customer = customers.find(c => 
        c.email === credentials.email && 
        c.password === credentials.password
      );
      
      if (customer) {
        // Customer login
        const userData = {
          id: customer.id,
          email: customer.email,
          first_name: customer.first_name,
          last_name: customer.last_name,
          role: 'customer',
          type: 'customer'
        };
        
        localStorage.setItem('dankdash_user', JSON.stringify(userData));
        localStorage.setItem('dankdash_token', `customer_${customer.id}`);
        
        navigate('/'); // Go back to main page as logged in customer
        window.location.reload();
        return;
      }
      
      // Find partner by email (simplified password check for demo)
      const partner = partners.find(p => p.email === credentials.email);
      
      if (partner) {
        // Partner login (simplified - in real app would check password)
        const userData = {
          id: partner.id,
          email: partner.email,
          first_name: partner.first_name,
          last_name: partner.last_name,
          role: 'partner',
          type: 'partner',
          partner_type: partner.partner_type
        };
        
        localStorage.setItem('dankdash_user', JSON.stringify(userData));
        localStorage.setItem('dankdash_token', `partner_${partner.id}`);
        
        navigate('/'); // Go back to main page as logged in partner
        window.location.reload();
        return;
      }
      
      // Demo accounts for testing
      if (credentials.email === 'customer@demo.com' && credentials.password === 'demo123') {
        const userData = {
          id: 999,
          email: 'customer@demo.com',
          first_name: 'Demo',
          last_name: 'Customer',
          role: 'customer',
          type: 'customer'
        };
        
        localStorage.setItem('dankdash_user', JSON.stringify(userData));
        localStorage.setItem('dankdash_token', 'demo_customer_999');
        
        navigate('/');
        window.location.reload();
        return;
      }
      
      if (credentials.email === 'partner@demo.com' && credentials.password === 'demo123') {
        const userData = {
          id: 998,
          email: 'partner@demo.com',
          first_name: 'Demo',
          last_name: 'Partner',
          role: 'partner',
          type: 'partner',
          partner_type: 'dispensary'
        };
        
        localStorage.setItem('dankdash_user', JSON.stringify(userData));
        localStorage.setItem('dankdash_token', 'demo_partner_998');
        
        navigate('/');
        window.location.reload();
        return;
      }
      
      setError('Invalid email or password. Please check your credentials or sign up for an account.');
      
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your DankDash customer or partner account
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



          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={() => {
                setCredentials({ email: 'customer@demo.com', password: 'demo123' });
              }}
              className="text-green-600 hover:text-green-500 text-sm font-medium block w-full"
            >
              Try Demo Customer Account
            </button>
            <button
              type="button"
              onClick={() => {
                setCredentials({ email: 'partner@demo.com', password: 'demo123' });
              }}
              className="text-green-600 hover:text-green-500 text-sm font-medium block w-full"
            >
              Try Demo Partner Account
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign up here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;

