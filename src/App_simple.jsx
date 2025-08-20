import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function SimpleApp() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-gray-900">DankDash</h1>
              <nav className="space-x-4">
                <a href="/admin" className="text-blue-600 hover:text-blue-800">Admin</a>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome to DankDash
                </h2>
                <p className="text-xl text-gray-600">
                  Premium Cannabis Delivery Platform
                </p>
              </div>
            } />
            <Route path="/admin" element={
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Admin Dashboard
                </h2>
                <p className="text-xl text-gray-600">
                  Admin interface is loading...
                </p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default SimpleApp;

