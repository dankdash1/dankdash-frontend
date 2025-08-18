import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DirectAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set admin session directly in localStorage
    const adminUser = {
      id: 1,
      email: 'admin@dankdash.com',
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin',
      token: 'direct-admin-access-token'
    };

    localStorage.setItem('dankdash_user', JSON.stringify(adminUser));
    localStorage.setItem('dankdash_token', 'direct-admin-access-token');
    
    // Force page reload to update navigation
    window.location.href = '/admin';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Setting up Admin Access...</h2>
        <p className="text-gray-600">You will be redirected to the admin dashboard automatically.</p>
      </div>
    </div>
  );
};

export default DirectAdmin;

