import React, { useState, useEffect } from 'react';

const AppsModule = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  // Mock installed apps data
  const [installedApps, setInstalledApps] = useState([
    {
      id: 'APP-001',
      name: 'Stripe Payment Gateway',
      description: 'Accept credit card payments securely with Stripe integration',
      category: 'Payment',
      version: '2.4.1',
      status: 'Active',
      developer: 'Stripe Inc.',
      installedAt: '2024-07-15',
      lastUpdated: '2024-08-10',
      icon: '💳',
      rating: 4.9,
      reviews: 15420,
      price: 'Free',
      usage: {
        transactions: 1245,
        revenue: 45670.25,
        uptime: 99.8
      },
      permissions: ['payments', 'customer_data', 'webhooks'],
      settings: {
        publicKey: 'pk_live_xxxxxxxxxx',
        webhookUrl: 'https://dankdash.com/webhooks/stripe',
        currency: 'USD'
      },
      features: ['Credit Cards', 'ACH Payments', 'Recurring Billing', 'Fraud Protection'],
      integrations: ['WooCommerce', 'Shopify', 'QuickBooks']
    },
    {
      id: 'APP-002',
      name: 'Metrc Cannabis Tracking',
      description: 'State-mandated cannabis seed-to-sale tracking system',
      category: 'Compliance',
      version: '1.8.3',
      status: 'Active',
      developer: 'Metrc LLC',
      installedAt: '2024-07-01',
      lastUpdated: '2024-08-05',
      icon: '🌿',
      rating: 4.2,
      reviews: 892,
      price: '$299/month',
      usage: {
        packages: 3456,
        transfers: 234,
        uptime: 98.5
      },
      permissions: ['inventory', 'compliance', 'reporting'],
      settings: {
        facilityLicense: 'C11-0000123-LIC',
        apiKey: 'mtrc_xxxxxxxxxx',
        state: 'California'
      },
      features: ['Package Tracking', 'Transfer Manifests', 'Lab Results', 'Compliance Reports'],
      integrations: ['POS Systems', 'Inventory Management', 'Lab Partners']
    },
    {
      id: 'APP-003',
      name: 'Twilio SMS Service',
      description: 'Send SMS notifications and marketing messages to customers',
      category: 'Communication',
      version: '3.1.2',
      status: 'Active',
      developer: 'Twilio Inc.',
      installedAt: '2024-07-20',
      lastUpdated: '2024-08-12',
      icon: '📱',
      rating: 4.7,
      reviews: 8934,
      price: 'Pay-per-use',
      usage: {
        messagesSent: 5678,
        deliveryRate: 98.2,
        uptime: 99.9
      },
      permissions: ['messaging', 'customer_data', 'analytics'],
      settings: {
        accountSid: 'ACxxxxxxxxxx',
        authToken: 'xxxxxxxxxx',
        phoneNumber: '+1234567890'
      },
      features: ['SMS Marketing', 'Order Notifications', 'Two-Factor Auth', 'Delivery Updates'],
      integrations: ['CRM', 'Marketing Automation', 'Customer Support']
    },
    {
      id: 'APP-004',
      name: 'QuickBooks Accounting',
      description: 'Sync financial data with QuickBooks for accounting and reporting',
      category: 'Finance',
      version: '4.2.1',
      status: 'Active',
      developer: 'Intuit Inc.',
      installedAt: '2024-06-15',
      lastUpdated: '2024-08-08',
      icon: '📊',
      rating: 4.6,
      reviews: 12340,
      price: '$50/month',
      usage: {
        transactionsSync: 2345,
        lastSync: '2024-08-14 10:30:00',
        uptime: 99.5
      },
      permissions: ['financial_data', 'transactions', 'reporting'],
      settings: {
        companyId: 'QB123456789',
        accessToken: 'qb_xxxxxxxxxx',
        sandboxMode: false
      },
      features: ['Transaction Sync', 'Invoice Generation', 'Tax Reporting', 'Financial Analytics'],
      integrations: ['POS Systems', 'Banking', 'Payroll', 'Tax Software']
    },
    {
      id: 'APP-005',
      name: 'Mailchimp Email Marketing',
      description: 'Create and send email campaigns to your customer base',
      category: 'Marketing',
      version: '2.7.4',
      status: 'Inactive',
      developer: 'Mailchimp',
      installedAt: '2024-05-10',
      lastUpdated: '2024-07-25',
      icon: '📧',
      rating: 4.5,
      reviews: 6789,
      price: '$20/month',
      usage: {
        subscribers: 3456,
        emailsSent: 15678,
        uptime: 99.2
      },
      permissions: ['email_marketing', 'customer_data', 'analytics'],
      settings: {
        apiKey: 'mc_xxxxxxxxxx',
        listId: 'abc123def456',
        dataCenter: 'us19'
      },
      features: ['Email Campaigns', 'Automation', 'A/B Testing', 'Analytics'],
      integrations: ['CRM', 'E-commerce', 'Social Media', 'Analytics']
    },
    {
      id: 'APP-006',
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior analytics',
      category: 'Analytics',
      version: '1.5.2',
      status: 'Active',
      developer: 'Google LLC',
      installedAt: '2024-07-01',
      lastUpdated: '2024-08-01',
      icon: '📈',
      rating: 4.8,
      reviews: 25670,
      price: 'Free',
      usage: {
        pageViews: 45678,
        sessions: 12345,
        uptime: 99.9
      },
      permissions: ['analytics', 'tracking', 'reporting'],
      settings: {
        trackingId: 'GA-XXXXXXXXX',
        propertyId: '123456789',
        enhanced: true
      },
      features: ['Traffic Analytics', 'Conversion Tracking', 'Audience Insights', 'Real-time Data'],
      integrations: ['Google Ads', 'Search Console', 'Tag Manager', 'Data Studio']
    }
  ]);

  // Mock app store data
  const [appStore, setAppStore] = useState([
    {
      id: 'STORE-001',
      name: 'Shopify Integration',
      description: 'Connect your DankDash inventory with Shopify for multi-channel selling',
      category: 'E-commerce',
      developer: 'Shopify Inc.',
      icon: '🛒',
      rating: 4.7,
      reviews: 3456,
      price: '$29/month',
      features: ['Inventory Sync', 'Order Management', 'Product Catalog', 'Multi-store Support'],
      screenshots: 4,
      isInstalled: false,
      compatibility: '✅ Compatible',
      lastUpdated: '2024-08-10'
    },
    {
      id: 'STORE-002',
      name: 'Slack Notifications',
      description: 'Get real-time notifications in your Slack workspace',
      category: 'Communication',
      developer: 'Slack Technologies',
      icon: '💬',
      rating: 4.6,
      reviews: 2890,
      price: 'Free',
      features: ['Order Alerts', 'Inventory Warnings', 'Team Notifications', 'Custom Channels'],
      screenshots: 3,
      isInstalled: false,
      compatibility: '✅ Compatible',
      lastUpdated: '2024-08-05'
    },
    {
      id: 'STORE-003',
      name: 'Zapier Automation',
      description: 'Connect DankDash with 5000+ apps through Zapier workflows',
      category: 'Automation',
      developer: 'Zapier Inc.',
      icon: '⚡',
      rating: 4.8,
      reviews: 5670,
      price: '$19.99/month',
      features: ['Workflow Automation', '5000+ Integrations', 'Custom Triggers', 'Multi-step Zaps'],
      screenshots: 5,
      isInstalled: false,
      compatibility: '✅ Compatible',
      lastUpdated: '2024-08-12'
    },
    {
      id: 'STORE-004',
      name: 'FedEx Shipping',
      description: 'Integrate FedEx shipping services for delivery management',
      category: 'Shipping',
      developer: 'FedEx Corporation',
      icon: '📦',
      rating: 4.4,
      reviews: 1234,
      price: 'Pay-per-shipment',
      features: ['Rate Calculation', 'Label Printing', 'Tracking', 'Delivery Confirmation'],
      screenshots: 4,
      isInstalled: false,
      compatibility: '✅ Compatible',
      lastUpdated: '2024-08-08'
    },
    {
      id: 'STORE-005',
      name: 'Cannabis Lab Connect',
      description: 'Connect with certified cannabis testing laboratories',
      category: 'Compliance',
      developer: 'LabConnect Inc.',
      icon: '🧪',
      rating: 4.3,
      reviews: 567,
      price: '$99/month',
      features: ['Lab Results', 'COA Management', 'Batch Testing', 'Compliance Reports'],
      screenshots: 6,
      isInstalled: false,
      compatibility: '✅ Compatible',
      lastUpdated: '2024-08-14'
    }
  ]);

  const [categories] = useState([
    { id: 'payment', name: 'Payment', count: 12, icon: '💳' },
    { id: 'compliance', name: 'Compliance', count: 8, icon: '⚖️' },
    { id: 'communication', name: 'Communication', count: 15, icon: '📱' },
    { id: 'finance', name: 'Finance', count: 10, icon: '📊' },
    { id: 'marketing', name: 'Marketing', count: 18, icon: '📧' },
    { id: 'analytics', name: 'Analytics', count: 9, icon: '📈' },
    { id: 'e-commerce', name: 'E-commerce', count: 14, icon: '🛒' },
    { id: 'shipping', name: 'Shipping', count: 7, icon: '📦' },
    { id: 'automation', name: 'Automation', count: 11, icon: '⚡' }
  ]);

  const [analytics] = useState({
    totalApps: 24,
    activeApps: 18,
    inactiveApps: 6,
    totalSpend: 1240.50,
    avgRating: 4.6,
    topCategories: [
      { name: 'Marketing', apps: 6, spend: 340.50 },
      { name: 'Payment', apps: 4, spend: 299.00 },
      { name: 'Compliance', apps: 3, spend: 450.00 }
    ],
    recentActivity: [
      { type: 'App Updated', app: 'Twilio SMS Service', timestamp: '2024-08-14 15:30:00' },
      { type: 'App Installed', app: 'Google Analytics', timestamp: '2024-08-14 14:20:00' },
      { type: 'App Deactivated', app: 'Mailchimp Email Marketing', timestamp: '2024-08-14 11:45:00' }
    ]
  });

  // Filter apps
  const filteredInstalledApps = installedApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.developer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category.toLowerCase() === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || app.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredAppStore = appStore.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.developer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'updating': return 'bg-blue-100 text-blue-700';
      case 'error': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'payment': return 'bg-blue-100 text-blue-700';
      case 'compliance': return 'bg-red-100 text-red-700';
      case 'communication': return 'bg-green-100 text-green-700';
      case 'finance': return 'bg-purple-100 text-purple-700';
      case 'marketing': return 'bg-pink-100 text-pink-700';
      case 'analytics': return 'bg-yellow-100 text-yellow-700';
      case 'e-commerce': return 'bg-orange-100 text-orange-700';
      case 'shipping': return 'bg-indigo-100 text-indigo-700';
      case 'automation': return 'bg-teal-100 text-teal-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Apps</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalApps}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Apps</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeApps}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Spend</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.totalSpend}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.avgRating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* App Categories */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">App Categories</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">{category.icon}</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{category.name}</p>
              <p className="text-xs text-gray-600">{category.count} apps</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Spending Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Spending Categories</h3>
          <div className="space-y-3">
            {analytics.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{category.name}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${(category.spend / 450) * 100}%`}}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">${category.spend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">📱</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.app}</p>
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
    </div>
  );

  const renderInstalledApps = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search installed apps..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="updating">Updating</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </div>

      {/* Installed Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstalledApps.map((app) => (
          <div key={app.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{app.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                    <p className="text-sm text-gray-600">v{app.version}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">{app.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(app.category)}`}>
                  {app.category}
                </span>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-1">⭐</span>
                  <span>{app.rating} ({app.reviews.toLocaleString()})</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{app.price}</span>
              </div>

              {/* Usage Stats */}
              {app.usage && (
                <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg mb-4">
                  {Object.entries(app.usage).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-sm font-bold text-gray-900">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                      </p>
                      <p className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Features */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {app.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                      {feature}
                    </span>
                  ))}
                  {app.features.length > 3 && (
                    <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      +{app.features.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Updated: {app.lastUpdated}
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                    onClick={() => setSelectedApp(app)}
                  >
                    Settings
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    {app.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                    Uninstall
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppStore = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search app store..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* App Store Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppStore.map((app) => (
          <div key={app.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{app.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                    <p className="text-sm text-gray-600">{app.developer}</p>
                  </div>
                </div>
                {app.isInstalled && (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    Installed
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-700 mb-4">{app.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(app.category)}`}>
                  {app.category}
                </span>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-1">⭐</span>
                  <span>{app.rating} ({app.reviews.toLocaleString()})</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{app.price}</span>
              </div>

              {/* Features */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {app.features.map((feature, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  <span className="mr-2">{app.compatibility}</span>
                  <span>• {app.screenshots} screenshots</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                    Details
                  </button>
                  <button 
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => setShowInstallModal(true)}
                    disabled={app.isInstalled}
                  >
                    {app.isInstalled ? 'Installed' : 'Install'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">App Management Settings</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Security & Permissions</h4>
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Require admin approval for new app installations</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Enable automatic security updates</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Allow apps to access customer data</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Notifications</h4>
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Notify when apps are updated</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Send monthly app usage reports</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Alert on app errors or downtime</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Data & Privacy</h4>
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Enable data encryption for app communications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-gray-700">Share anonymous usage data with app developers</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Apps</h1>
          <p className="mt-2 text-gray-600">Manage third-party integrations and applications</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'installed', name: 'Installed Apps', icon: '📱' },
              { id: 'store', name: 'App Store', icon: '🏪' },
              { id: 'settings', name: 'Settings', icon: '⚙️' }
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'installed' && renderInstalledApps()}
        {activeTab === 'store' && renderAppStore()}
        {activeTab === 'settings' && renderSettings()}
      </div>

      {/* Install App Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Install App</h3>
                <button 
                  onClick={() => setShowInstallModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🛒</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Shopify Integration</h4>
                <p className="text-sm text-gray-600">by Shopify Inc.</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Permissions Required:</strong>
                  </p>
                  <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                    <li>• Access to inventory data</li>
                    <li>• Modify product information</li>
                    <li>• Process orders and payments</li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Monthly Cost:</span>
                  <span className="font-medium text-gray-900">$29.00</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowInstallModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Install App
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* App Settings Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{selectedApp.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedApp.name}</h3>
                    <p className="text-sm text-gray-600">Settings & Configuration</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">App Configuration</h4>
                  <div className="space-y-4">
                    {Object.entries(selectedApp.settings).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                          type="text"
                          defaultValue={value}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Permissions</h4>
                  <div className="space-y-2">
                    {selectedApp.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700 capitalize">{permission.replace('_', ' ')}</span>
                        <span className="text-sm text-green-600">✓ Granted</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Integrations</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedApp.integrations.map((integration, index) => (
                      <span key={index} className="inline-flex px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg">
                        {integration}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppsModule;

