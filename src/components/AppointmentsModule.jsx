import React, { useState, useEffect } from 'react';

const AppointmentsModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 'APT-001',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      customerPhone: '+1 (555) 123-4567',
      service: 'Cannabis Consultation',
      serviceType: 'Consultation',
      date: '2024-08-15',
      time: '10:00',
      duration: 60,
      status: 'Confirmed',
      priority: 'Medium',
      notes: 'First-time customer interested in medical cannabis options.',
      assignedTo: 'Dr. Sarah Johnson',
      location: 'Consultation Room A',
      reminderSent: true,
      createdAt: '2024-08-10 14:30:00',
      confirmationCode: 'CNF-001-2024'
    },
    {
      id: 'APT-002',
      customerName: 'Maria Garcia',
      customerEmail: 'maria.garcia@email.com',
      customerPhone: '+1 (555) 234-5678',
      service: 'Product Pickup',
      serviceType: 'Pickup',
      date: '2024-08-15',
      time: '14:30',
      duration: 15,
      status: 'Confirmed',
      priority: 'Low',
      notes: 'Pickup for online order #ORD-2024-156',
      assignedTo: 'Mike Chen',
      location: 'Pickup Counter',
      reminderSent: true,
      createdAt: '2024-08-12 09:15:00',
      confirmationCode: 'CNF-002-2024'
    },
    {
      id: 'APT-003',
      customerName: 'David Wilson',
      customerEmail: 'david.wilson@email.com',
      customerPhone: '+1 (555) 345-6789',
      service: 'Delivery Consultation',
      serviceType: 'Consultation',
      date: '2024-08-16',
      time: '11:00',
      duration: 45,
      status: 'Pending',
      priority: 'High',
      notes: 'Customer needs help with delivery scheduling and product selection.',
      assignedTo: 'Lisa Wang',
      location: 'Virtual Meeting',
      reminderSent: false,
      createdAt: '2024-08-13 16:45:00',
      confirmationCode: 'CNF-003-2024'
    },
    {
      id: 'APT-004',
      customerName: 'Jennifer Brown',
      customerEmail: 'jennifer.brown@email.com',
      customerPhone: '+1 (555) 456-7890',
      service: 'Product Education',
      serviceType: 'Education',
      date: '2024-08-16',
      time: '15:00',
      duration: 90,
      status: 'Confirmed',
      priority: 'Medium',
      notes: 'Educational session about different cannabis strains and effects.',
      assignedTo: 'Alex Rodriguez',
      location: 'Education Center',
      reminderSent: true,
      createdAt: '2024-08-11 11:20:00',
      confirmationCode: 'CNF-004-2024'
    },
    {
      id: 'APT-005',
      customerName: 'Robert Taylor',
      customerEmail: 'robert.taylor@email.com',
      customerPhone: '+1 (555) 567-8901',
      service: 'Compliance Review',
      serviceType: 'Compliance',
      date: '2024-08-17',
      time: '09:30',
      duration: 30,
      status: 'Cancelled',
      priority: 'Low',
      notes: 'Customer cancelled due to scheduling conflict.',
      assignedTo: 'Tom Wilson',
      location: 'Office',
      reminderSent: false,
      createdAt: '2024-08-09 13:10:00',
      confirmationCode: 'CNF-005-2024'
    }
  ]);

  const [services] = useState([
    { id: 'consultation', name: 'Cannabis Consultation', duration: 60, price: 75 },
    { id: 'pickup', name: 'Product Pickup', duration: 15, price: 0 },
    { id: 'education', name: 'Product Education', duration: 90, price: 50 },
    { id: 'compliance', name: 'Compliance Review', duration: 30, price: 100 },
    { id: 'delivery-consultation', name: 'Delivery Consultation', duration: 45, price: 25 }
  ]);

  const [timeSlots] = useState([
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]);

  const [analytics] = useState({
    totalAppointments: 234,
    upcomingAppointments: 18,
    completedAppointments: 198,
    cancelledAppointments: 18,
    noShowRate: 8.5,
    avgDuration: 52,
    revenue: 18450,
    bookingRate: 92.3,
    customerSatisfaction: 4.7,
    topServices: [
      { name: 'Cannabis Consultation', count: 89, revenue: 6675 },
      { name: 'Product Education', count: 67, revenue: 3350 },
      { name: 'Product Pickup', count: 156, revenue: 0 }
    ]
  });

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.confirmationCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || appointment.status.toLowerCase() === selectedStatus;
    const matchesService = selectedService === 'all' || appointment.serviceType.toLowerCase() === selectedService;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'no-show': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.upcomingAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.completedAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Booking Rate</span>
              <span className="text-sm font-medium text-gray-900">{analytics.bookingRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">No-Show Rate</span>
              <span className="text-sm font-medium text-gray-900">{analytics.noShowRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Duration</span>
              <span className="text-sm font-medium text-gray-900">{analytics.avgDuration} min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Customer Satisfaction</span>
              <span className="text-sm font-medium text-gray-900">{analytics.customerSatisfaction}/5.0</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Services</h3>
          <div className="space-y-3">
            {analytics.topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{service.name}</p>
                  <p className="text-xs text-gray-600">{service.count} appointments</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${service.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
        <div className="space-y-3">
          {appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-700">{appointment.customerName.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appointment.customerName}</p>
                  <p className="text-sm text-gray-600">{appointment.service} • {appointment.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search appointments..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="all">All Services</option>
              <option value="consultation">Consultation</option>
              <option value="pickup">Pickup</option>
              <option value="education">Education</option>
              <option value="compliance">Compliance</option>
            </select>
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowCreateModal(true)}
            >
              New Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-blue-700">{appointment.customerName.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{appointment.customerName}</h3>
                  <p className="text-sm text-gray-600 mb-2">{appointment.service}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>📅 {appointment.date}</span>
                    <span>🕐 {appointment.time}</span>
                    <span>⏱️ {appointment.duration} min</span>
                    <span>📍 {appointment.location}</span>
                    <span>👨‍⚕️ {appointment.assignedTo}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="flex space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(appointment.priority)}`}>
                    {appointment.priority}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {appointment.confirmationCode}
                </div>
              </div>
            </div>

            {appointment.notes && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{appointment.notes}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>📧 {appointment.customerEmail}</span>
                <span>📞 {appointment.customerPhone}</span>
                {appointment.reminderSent && <span>🔔 Reminder sent</span>}
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  View
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                  Confirm
                </button>
                <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Schedule Overview</h3>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Book Appointment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Time Slots */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Available Times</h4>
            <div className="space-y-2">
              {timeSlots.map((time) => {
                const isBooked = appointments.some(apt => apt.date === selectedDate && apt.time === time);
                return (
                  <button
                    key={time}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      isBooked 
                        ? 'bg-red-50 border-red-200 text-red-600 cursor-not-allowed' 
                        : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                    }`}
                    disabled={isBooked}
                  >
                    {time} {isBooked && '(Booked)'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Appointments for Selected Date */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Appointments for {new Date(selectedDate).toLocaleDateString()}
            </h4>
            <div className="space-y-3">
              {appointments
                .filter(apt => apt.date === selectedDate)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-700">{appointment.customerName.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.customerName}</p>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{appointment.time}</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              {appointments.filter(apt => apt.date === selectedDate).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No appointments scheduled for this date
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Available Services</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Service
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h4>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="text-sm font-medium text-gray-900">{service.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price</span>
                  <span className="text-sm font-medium text-gray-900">
                    {service.price === 0 ? 'Free' : `$${service.price}`}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Book Now
                </button>
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="mt-2 text-gray-600">Manage customer appointments and bookings</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'appointments', name: 'Appointments', icon: '📅' },
              { id: 'schedule', name: 'Schedule', icon: '🗓️' },
              { id: 'services', name: 'Services', icon: '🛎️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
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
        {activeTab === 'appointments' && renderAppointments()}
        {activeTab === 'schedule' && renderSchedule()}
        {activeTab === 'services' && renderServices()}
      </div>

      {/* Create Appointment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Book New Appointment</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter customer name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number..."
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="sarah">Dr. Sarah Johnson</option>
                    <option value="mike">Mike Chen</option>
                    <option value="lisa">Lisa Wang</option>
                    <option value="alex">Alex Rodriguez</option>
                    <option value="tom">Tom Wilson</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter any additional notes..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="consultation-a">Consultation Room A</option>
                      <option value="consultation-b">Consultation Room B</option>
                      <option value="pickup">Pickup Counter</option>
                      <option value="education">Education Center</option>
                      <option value="virtual">Virtual Meeting</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Send confirmation email</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Send reminder</span>
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsModule;

