import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Utility function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('active');
  const [stats, setStats] = useState({
    active_deliveries: 0,
    completed_today: 0,
    pending_pickup: 0,
    total_drivers: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'manager' || user.role === 'driver')) {
      fetchDeliveryData();
    }
  }, [user, selectedTab]);

  const fetchDeliveryData = async () => {
    try {
      setLoading(true);
      
      // Fetch deliveries based on selected tab
      const deliveriesResponse = await apiCall(`/deliveries?status=${selectedTab}`);
      setDeliveries(deliveriesResponse.deliveries || []);
      
      // Fetch drivers (admin/manager only)
      if (user.role === 'admin' || user.role === 'manager') {
        const driversResponse = await apiCall('/drivers');
        setDrivers(driversResponse.drivers || []);
        
        // Fetch delivery stats
        const statsResponse = await apiCall('/deliveries/stats');
        setStats(statsResponse.stats || {});
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDeliveryStatus = async (deliveryId, newStatus) => {
    try {
      await apiCall(`/deliveries/${deliveryId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      
      // Refresh data
      fetchDeliveryData();
    } catch (err) {
      alert('Failed to update delivery status: ' + err.message);
    }
  };

  const assignDriver = async (deliveryId, driverId) => {
    try {
      await apiCall(`/deliveries/${deliveryId}/assign`, {
        method: 'PUT',
        body: JSON.stringify({ driver_id: driverId })
      });
      
      // Refresh data
      fetchDeliveryData();
    } catch (err) {
      alert('Failed to assign driver: ' + err.message);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'assigned': 'bg-blue-100 text-blue-800',
      'picked_up': 'bg-purple-100 text-purple-800',
      'in_transit': 'bg-orange-100 text-orange-800',
      'delivered': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!user || !['admin', 'manager', 'driver'].includes(user.role)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the delivery dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading delivery dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Dashboard</h1>
          <p className="text-gray-600">Manage deliveries, drivers, and logistics</p>
        </div>

        {/* Stats Cards (Admin/Manager only) */}
        {(user.role === 'admin' || user.role === 'manager') && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-full">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Deliveries</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.active_deliveries}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Today</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed_today}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Pickup</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending_pickup}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Drivers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_drivers}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'active', label: 'Active Deliveries', count: stats.active_deliveries },
                { id: 'pending', label: 'Pending', count: stats.pending_pickup },
                { id: 'completed', label: 'Completed', count: stats.completed_today },
                { id: 'all', label: 'All Deliveries', count: null }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      selectedTab === tab.id ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Deliveries Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Deliveries
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Driver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ETA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deliveries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-lg font-medium">No deliveries found</p>
                        <p className="text-sm">Deliveries will appear here when orders are ready for delivery.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  deliveries.map((delivery) => (
                    <tr key={delivery.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{delivery.order_number}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${delivery.total_amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {delivery.customer_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {delivery.customer_phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {delivery.delivery_address?.address}
                        </div>
                        <div className="text-sm text-gray-500">
                          {delivery.delivery_address?.city}, {delivery.delivery_address?.state} {delivery.delivery_address?.zipCode}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {delivery.driver ? (
                          <div className="text-sm text-gray-900">
                            {delivery.driver.first_name} {delivery.driver.last_name}
                          </div>
                        ) : (
                          <select
                            onChange={(e) => assignDriver(delivery.id, e.target.value)}
                            className="text-sm border border-gray-300 rounded-md px-2 py-1"
                            defaultValue=""
                          >
                            <option value="">Assign Driver</option>
                            {drivers.map((driver) => (
                              <option key={driver.id} value={driver.id}>
                                {driver.first_name} {driver.last_name}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                          {delivery.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {delivery.estimated_delivery || 'TBD'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {delivery.status === 'pending' && (
                            <button
                              onClick={() => updateDeliveryStatus(delivery.id, 'assigned')}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Assign
                            </button>
                          )}
                          {delivery.status === 'assigned' && (
                            <button
                              onClick={() => updateDeliveryStatus(delivery.id, 'picked_up')}
                              className="text-purple-600 hover:text-purple-900"
                            >
                              Pick Up
                            </button>
                          )}
                          {delivery.status === 'picked_up' && (
                            <button
                              onClick={() => updateDeliveryStatus(delivery.id, 'in_transit')}
                              className="text-orange-600 hover:text-orange-900"
                            >
                              In Transit
                            </button>
                          )}
                          {delivery.status === 'in_transit' && (
                            <button
                              onClick={() => updateDeliveryStatus(delivery.id, 'delivered')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Delivered
                            </button>
                          )}
                          <button className="text-gray-600 hover:text-gray-900">
                            Track
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Route Optimization</h3>
            <p className="text-gray-600 mb-4">Optimize delivery routes for maximum efficiency</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              Optimize Routes
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Driver Management</h3>
            <p className="text-gray-600 mb-4">Manage driver schedules and availability</p>
            <button className="w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
              Manage Drivers
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Analytics</h3>
            <p className="text-gray-600 mb-4">View performance metrics and reports</p>
            <button className="w-full py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDashboard;

