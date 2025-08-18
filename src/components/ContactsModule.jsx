import React, { useState, useEffect } from 'react';

const ContactsModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // list, grid, map

  // Mock contacts data
  const [contacts, setContacts] = useState([
    {
      id: 'CNT-001',
      firstName: 'John',
      lastName: 'Smith',
      fullName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      mobile: '+1 (555) 987-6543',
      company: 'Green Valley Dispensary',
      jobTitle: 'Store Manager',
      type: 'Customer',
      status: 'Active',
      group: 'VIP Customers',
      address: {
        street: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA'
      },
      socialMedia: {
        linkedin: 'https://linkedin.com/in/johnsmith',
        twitter: '@johnsmith',
        instagram: '@johnsmith_gv'
      },
      tags: ['vip', 'bulk-buyer', 'medical'],
      notes: 'Long-time customer, prefers indica strains. Bulk purchaser for dispensary.',
      lastContact: '2024-08-10',
      nextFollowUp: '2024-08-20',
      totalOrders: 45,
      totalSpent: 12450.75,
      averageOrderValue: 276.68,
      customerSince: '2022-03-15',
      preferredProducts: ['OG Kush', 'Blue Dream', 'CBD Tinctures'],
      communicationPreference: 'Email',
      birthday: '1985-06-15',
      createdAt: '2022-03-15 10:30:00',
      updatedAt: '2024-08-10 14:20:00'
    },
    {
      id: 'CNT-002',
      firstName: 'Maria',
      lastName: 'Garcia',
      fullName: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 234-5678',
      mobile: '+1 (555) 876-5432',
      company: 'Cannabis Wellness Center',
      jobTitle: 'Wellness Coordinator',
      type: 'Partner',
      status: 'Active',
      group: 'Business Partners',
      address: {
        street: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      socialMedia: {
        linkedin: 'https://linkedin.com/in/mariagarcia',
        instagram: '@wellness_maria'
      },
      tags: ['partner', 'wellness', 'education'],
      notes: 'Partnership for wellness education programs. Excellent collaboration on patient education.',
      lastContact: '2024-08-12',
      nextFollowUp: '2024-08-25',
      totalOrders: 0,
      totalSpent: 0,
      averageOrderValue: 0,
      customerSince: '2023-01-20',
      preferredProducts: [],
      communicationPreference: 'Phone',
      birthday: '1978-09-22',
      createdAt: '2023-01-20 09:15:00',
      updatedAt: '2024-08-12 11:45:00'
    },
    {
      id: 'CNT-003',
      firstName: 'David',
      lastName: 'Wilson',
      fullName: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 345-6789',
      mobile: '+1 (555) 765-4321',
      company: 'Wilson Consulting',
      jobTitle: 'Cannabis Business Consultant',
      type: 'Vendor',
      status: 'Active',
      group: 'Service Providers',
      address: {
        street: '789 Pine Street',
        city: 'Denver',
        state: 'CO',
        zipCode: '80202',
        country: 'USA'
      },
      socialMedia: {
        linkedin: 'https://linkedin.com/in/davidwilson',
        twitter: '@dwilson_cannabis'
      },
      tags: ['consultant', 'compliance', 'business-development'],
      notes: 'Provides compliance consulting and business development services. Very knowledgeable about regulations.',
      lastContact: '2024-08-08',
      nextFollowUp: '2024-08-22',
      totalOrders: 0,
      totalSpent: 0,
      averageOrderValue: 0,
      customerSince: '2023-05-10',
      preferredProducts: [],
      communicationPreference: 'Email',
      birthday: '1982-12-03',
      createdAt: '2023-05-10 16:20:00',
      updatedAt: '2024-08-08 13:30:00'
    },
    {
      id: 'CNT-004',
      firstName: 'Jennifer',
      lastName: 'Brown',
      fullName: 'Jennifer Brown',
      email: 'jennifer.brown@email.com',
      phone: '+1 (555) 456-7890',
      mobile: '+1 (555) 654-3210',
      company: 'Personal',
      jobTitle: 'Retired Teacher',
      type: 'Customer',
      status: 'Active',
      group: 'Medical Patients',
      address: {
        street: '321 Elm Drive',
        city: 'Portland',
        state: 'OR',
        zipCode: '97201',
        country: 'USA'
      },
      socialMedia: {},
      tags: ['medical', 'senior', 'education'],
      notes: 'Medical patient using cannabis for chronic pain management. Prefers low-THC, high-CBD products.',
      lastContact: '2024-08-14',
      nextFollowUp: '2024-08-28',
      totalOrders: 23,
      totalSpent: 2340.50,
      averageOrderValue: 101.76,
      customerSince: '2023-08-15',
      preferredProducts: ['CBD Oil', 'CBD Gummies', 'Topical Creams'],
      communicationPreference: 'Phone',
      birthday: '1955-04-18',
      createdAt: '2023-08-15 12:45:00',
      updatedAt: '2024-08-14 10:15:00'
    },
    {
      id: 'CNT-005',
      firstName: 'Robert',
      lastName: 'Taylor',
      fullName: 'Robert Taylor',
      email: 'robert.taylor@email.com',
      phone: '+1 (555) 567-8901',
      mobile: '+1 (555) 543-2109',
      company: 'Taylor Farms',
      jobTitle: 'Farm Owner',
      type: 'Supplier',
      status: 'Inactive',
      group: 'Suppliers',
      address: {
        street: '654 Country Road',
        city: 'Humboldt',
        state: 'CA',
        zipCode: '95503',
        country: 'USA'
      },
      socialMedia: {
        instagram: '@taylor_farms_ca'
      },
      tags: ['supplier', 'organic', 'outdoor-grown'],
      notes: 'Organic cannabis supplier. Currently inactive due to licensing issues.',
      lastContact: '2024-07-20',
      nextFollowUp: '2024-09-01',
      totalOrders: 0,
      totalSpent: 0,
      averageOrderValue: 0,
      customerSince: '2022-11-08',
      preferredProducts: [],
      communicationPreference: 'Email',
      birthday: '1970-11-25',
      createdAt: '2022-11-08 14:10:00',
      updatedAt: '2024-07-20 16:45:00'
    }
  ]);

  const [groups] = useState([
    { id: 'vip-customers', name: 'VIP Customers', count: 45, color: 'bg-purple-100 text-purple-700' },
    { id: 'business-partners', name: 'Business Partners', count: 12, color: 'bg-blue-100 text-blue-700' },
    { id: 'service-providers', name: 'Service Providers', count: 8, color: 'bg-green-100 text-green-700' },
    { id: 'medical-patients', name: 'Medical Patients', count: 156, color: 'bg-red-100 text-red-700' },
    { id: 'suppliers', name: 'Suppliers', count: 23, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'prospects', name: 'Prospects', count: 67, color: 'bg-gray-100 text-gray-700' }
  ]);

  const [analytics] = useState({
    totalContacts: 311,
    activeContacts: 287,
    inactiveContacts: 24,
    newThisMonth: 18,
    totalCustomers: 201,
    totalPartners: 12,
    totalVendors: 31,
    totalSuppliers: 23,
    avgOrderValue: 189.45,
    totalRevenue: 456780.25,
    topSpenders: [
      { name: 'John Smith', spent: 12450.75, orders: 45 },
      { name: 'Green Valley Dispensary', spent: 8920.30, orders: 32 },
      { name: 'Wellness Center', spent: 6780.50, orders: 28 }
    ],
    recentActivity: [
      { type: 'New Contact', contact: 'Sarah Wilson', timestamp: '2024-08-14 15:30:00' },
      { type: 'Order Placed', contact: 'John Smith', timestamp: '2024-08-14 14:20:00' },
      { type: 'Follow-up Scheduled', contact: 'Maria Garcia', timestamp: '2024-08-14 11:45:00' }
    ]
  });

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || contact.type.toLowerCase() === selectedType;
    const matchesStatus = selectedStatus === 'all' || contact.status.toLowerCase() === selectedStatus;
    const matchesGroup = selectedGroup === 'all' || contact.group.toLowerCase().replace(' ', '-') === selectedGroup;
    
    return matchesSearch && matchesType && matchesStatus && matchesGroup;
  });

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'customer': return 'bg-blue-100 text-blue-700';
      case 'partner': return 'bg-green-100 text-green-700';
      case 'vendor': return 'bg-purple-100 text-purple-700';
      case 'supplier': return 'bg-yellow-100 text-yellow-700';
      case 'prospect': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
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
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Contacts</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalContacts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Contacts</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeContacts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.newThisMonth}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Types Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Types</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Customers</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{analytics.totalCustomers}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Vendors</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '10%'}}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{analytics.totalVendors}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Suppliers</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '7%'}}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{analytics.totalSuppliers}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Partners</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '4%'}}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{analytics.totalPartners}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Spenders</h3>
          <div className="space-y-3">
            {analytics.topSpenders.map((spender, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-700">{spender.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{spender.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${spender.spent.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">{spender.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Groups Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Groups</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {groups.map((group) => (
            <div key={group.id} className="text-center">
              <div className={`inline-flex px-3 py-2 rounded-full text-sm font-medium ${group.color} mb-2`}>
                {group.name}
              </div>
              <p className="text-lg font-bold text-gray-900">{group.count}</p>
              <p className="text-xs text-gray-600">contacts</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {analytics.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">📝</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.contact}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(activity.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="customer">Customer</option>
              <option value="partner">Partner</option>
              <option value="vendor">Vendor</option>
              <option value="supplier">Supplier</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="all">All Groups</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowCreateModal(true)}
            >
              New Contact
            </button>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium text-blue-700">
                    {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{contact.fullName}</h3>
                  <p className="text-gray-600 mb-2">{contact.jobTitle} at {contact.company}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📧</span>
                        <a href={`mailto:${contact.email}`} className="hover:text-blue-600">{contact.email}</a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📞</span>
                        <a href={`tel:${contact.phone}`} className="hover:text-blue-600">{contact.phone}</a>
                      </div>
                      {contact.mobile && (
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">📱</span>
                          <a href={`tel:${contact.mobile}`} className="hover:text-blue-600">{contact.mobile}</a>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📍</span>
                        <span>{contact.address.city}, {contact.address.state}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📅</span>
                        <span>Last contact: {contact.lastContact}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">🔔</span>
                        <span>Next follow-up: {contact.nextFollowUp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Stats */}
                  {contact.type === 'Customer' && contact.totalOrders > 0 && (
                    <div className="grid grid-cols-3 gap-4 mb-3 p-3 bg-blue-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-lg font-bold text-blue-900">{contact.totalOrders}</p>
                        <p className="text-xs text-blue-700">Orders</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-blue-900">${contact.totalSpent.toLocaleString()}</p>
                        <p className="text-xs text-blue-700">Total Spent</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-blue-900">${contact.averageOrderValue.toFixed(2)}</p>
                        <p className="text-xs text-blue-700">Avg Order</p>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {contact.tags.map((tag, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Notes */}
                  {contact.notes && (
                    <div className="p-3 bg-gray-50 rounded-lg mb-3">
                      <p className="text-sm text-gray-700">{contact.notes}</p>
                    </div>
                  )}

                  {/* Preferred Products */}
                  {contact.preferredProducts.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-900 mb-1">Preferred Products:</p>
                      <div className="flex flex-wrap gap-1">
                        {contact.preferredProducts.map((product, index) => (
                          <span key={index} className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <div className="flex space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(contact.type)}`}>
                    {contact.type}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  ID: {contact.id}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>👥 {contact.group}</span>
                <span>💬 {contact.communicationPreference}</span>
                <span>🎂 {contact.birthday}</span>
                <span>📅 Customer since: {contact.customerSince}</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  View
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                  Contact
                </button>
                <button className="px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGroups = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Contact Groups</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            New Group
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{group.name}</h4>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${group.color}`}>
                  {group.count} contacts
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active</span>
                  <span className="font-medium text-gray-900">
                    {Math.floor(group.count * 0.9)} / {group.count}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{width: '90%'}}
                  ></div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Contacts
                </button>
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Edit Group
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Reports & Analytics</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Contact Growth</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">This Month</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">+18</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Month</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">+14</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">3 Months Ago</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">+11</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Communication Preferences</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">202</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Phone</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '30%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">93</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SMS</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '5%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">16</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="mt-2 text-gray-600">Manage your customer relationships and business contacts</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'contacts', name: 'Contacts', icon: '👥' },
              { id: 'groups', name: 'Groups', icon: '📁' },
              { id: 'reports', name: 'Reports', icon: '📈' }
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
        {activeTab === 'contacts' && renderContacts()}
        {activeTab === 'groups' && renderGroups()}
        {activeTab === 'reports' && renderReports()}
      </div>

      {/* Create Contact Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Add New Contact</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter first name..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter last name..."
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email address..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter phone number..."
                      />
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Company Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter company name..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter job title..."
                      />
                    </div>
                  </div>
                </div>

                {/* Classification */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Classification</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="customer">Customer</option>
                        <option value="partner">Partner</option>
                        <option value="vendor">Vendor</option>
                        <option value="supplier">Supplier</option>
                        <option value="prospect">Prospect</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        {groups.map((group) => (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Address</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter street address..."
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter city..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter state..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter ZIP code..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Additional Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter tags separated by commas..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter any additional notes..."
                      />
                    </div>
                  </div>
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
                    Add Contact
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

export default ContactsModule;

