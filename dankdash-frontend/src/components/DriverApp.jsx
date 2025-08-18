import React, { useState, useEffect } from 'react';

const DriverApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [driverStatus, setDriverStatus] = useState('Available');
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  
  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL-001',
      orderId: 'ORD-001',
      customer: 'John Doe',
      address: '123 Main St, San Francisco, CA',
      phone: '(555) 123-4567',
      items: ['Premium OG Kush (2g)', 'Blue Dream Cartridge'],
      total: 97.20,
      status: 'Assigned',
      estimatedTime: '15 mins',
      distance: '2.3 miles',
      priority: 'High'
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-002',
      customer: 'Sarah Johnson',
      address: '456 Oak Ave, San Francisco, CA',
      phone: '(555) 234-5678',
      items: ['Chocolate Edibles'],
      total: 25.00,
      status: 'Pending',
      estimatedTime: '25 mins',
      distance: '4.1 miles',
      priority: 'Medium'
    }
  ]);

  const [driverStats, setDriverStats] = useState({
    todayDeliveries: 8,
    todayEarnings: 240.50,
    avgDeliveryTime: '18 mins',
    customerRating: 4.8,
    onTimeRate: 94.2,
    totalDistance: 45.7
  });

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New delivery assigned: DEL-001', time: '2 mins ago', type: 'delivery' },
    { id: 2, message: 'Customer John Doe is waiting', time: '5 mins ago', type: 'customer' },
    { id: 3, message: 'Route optimized for next delivery', time: '10 mins ago', type: 'system' }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Assigned': case 'Available': return 'bg-green-100 text-green-800';
      case 'In Transit': case 'Busy': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-purple-100 text-purple-800';
      case 'Pending': case 'Offline': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (newStatus) => {
    setDriverStatus(newStatus);
    // In real app, this would update the backend
  };

  const handleStartDelivery = (deliveryId) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === deliveryId 
        ? { ...delivery, status: 'In Transit' }
        : delivery
    ));
    // Send notification to customer
    sendCustomerNotification(deliveryId, 'Driver is on the way');
  };

  const handleArrivalNotification = (deliveryId) => {
    const delivery = deliveries.find(d => d.id === deliveryId);
    if (delivery) {
      sendCustomerNotification(deliveryId, `Your driver has arrived at ${delivery.address}`);
      // Also notify dispatch/admin
      sendDispatchNotification(deliveryId, 'Driver has arrived at delivery location');
    }
  };

  const handleCompleteDelivery = (deliveryId) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === deliveryId 
        ? { ...delivery, status: 'Delivered' }
        : delivery
    ));
    sendCustomerNotification(deliveryId, 'Delivery completed successfully');
  };

  const sendCustomerNotification = (deliveryId, message) => {
    // In real app, this would send SMS/push notification to customer
    console.log(`Sending to customer: ${message}`);
    setNotifications(prev => [{
      id: Date.now(),
      message: `Sent to customer: ${message}`,
      time: 'Just now',
      type: 'sent'
    }, ...prev]);
  };

  const sendDispatchNotification = (deliveryId, message) => {
    // In real app, this would notify dispatch/admin
    console.log(`Sending to dispatch: ${message}`);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Driver Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Driver Status</h3>
          <select
            value={driverStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="Break">On Break</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <div className="flex items-center">
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(driverStatus)}`}>
            {driverStatus}
          </span>
          <span className="ml-4 text-sm text-gray-500">
            Location: San Francisco, CA ({currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)})
          </span>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">🚚</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today's Deliveries</p>
              <p className="text-2xl font-semibold text-gray-900">{driverStats.todayDeliveries}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-semibold">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today's Earnings</p>
              <p className="text-2xl font-semibold text-gray-900">${driverStats.todayEarnings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 font-semibold">⭐</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Customer Rating</p>
              <p className="text-2xl font-semibold text-gray-900">{driverStats.customerRating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{driverStats.avgDeliveryTime}</div>
            <div className="text-sm text-gray-500">Avg Delivery Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{driverStats.onTimeRate}%</div>
            <div className="text-sm text-gray-500">On-Time Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{driverStats.totalDistance} mi</div>
            <div className="text-sm text-gray-500">Total Distance</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeliveries = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Active Deliveries</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Refresh Routes
        </button>
      </div>

      <div className="space-y-4">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{delivery.customer}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                    {delivery.status}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(delivery.priority)}`}>
                    {delivery.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">📍 {delivery.address}</p>
                <p className="text-sm text-gray-600 mb-1">📞 {delivery.phone}</p>
                <p className="text-sm text-gray-600">🕒 {delivery.estimatedTime} • {delivery.distance}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">${delivery.total}</p>
                <p className="text-sm text-gray-500">{delivery.orderId}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
              <ul className="text-sm text-gray-600">
                {delivery.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-2">
              {delivery.status === 'Assigned' && (
                <button 
                  onClick={() => handleStartDelivery(delivery.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start Delivery
                </button>
              )}
              {delivery.status === 'In Transit' && (
                <>
                  <button 
                    onClick={() => handleArrivalNotification(delivery.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Notify Arrival
                  </button>
                  <button 
                    onClick={() => handleCompleteDelivery(delivery.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Complete Delivery
                  </button>
                </>
              )}
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Call Customer
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Get Directions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
      
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                notification.type === 'delivery' ? 'bg-blue-100 text-blue-800' :
                notification.type === 'customer' ? 'bg-green-100 text-green-800' :
                notification.type === 'sent' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {notification.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Driver App</h1>
          <p className="text-gray-600 mt-2">Manage deliveries, track performance, and communicate with customers</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'deliveries', name: 'Deliveries', icon: '🚚' },
              { id: 'notifications', name: 'Notifications', icon: '🔔' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'deliveries' && renderDeliveries()}
        {activeTab === 'notifications' && renderNotifications()}
      </div>
    </div>
  );
};

export default DriverApp;

