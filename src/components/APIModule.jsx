import React, { useState, useEffect } from 'react';

const APIModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedVersion, setSelectedVersion] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');

  // Mock API data
  const [apis, setApis] = useState([
    {
      id: 'API-001',
      name: 'DankDash Core API',
      description: 'Main API for DankDash platform operations including user management, orders, and products',
      version: 'v2.1.0',
      status: 'Active',
      baseUrl: 'https://api.dankdash.com/v2',
      documentation: 'https://docs.dankdash.com/api/v2',
      category: 'Core',
      authentication: 'JWT Bearer Token',
      rateLimit: {
        requests: 1000,
        period: 'hour',
        burst: 100
      },
      endpoints: [
        {
          path: '/auth/login',
          method: 'POST',
          description: 'User authentication endpoint',
          parameters: ['email', 'password'],
          responses: ['200', '401', '422'],
          usage: 15420,
          avgResponseTime: 145,
          errorRate: 0.8
        },
        {
          path: '/products',
          method: 'GET',
          description: 'Retrieve product catalog',
          parameters: ['category', 'limit', 'offset'],
          responses: ['200', '400', '500'],
          usage: 89450,
          avgResponseTime: 89,
          errorRate: 0.3
        },
        {
          path: '/orders',
          method: 'POST',
          description: 'Create new order',
          parameters: ['products', 'delivery_address', 'payment_method'],
          responses: ['201', '400', '422'],
          usage: 23670,
          avgResponseTime: 234,
          errorRate: 1.2
        },
        {
          path: '/users/profile',
          method: 'GET',
          description: 'Get user profile information',
          parameters: ['user_id'],
          responses: ['200', '401', '404'],
          usage: 45890,
          avgResponseTime: 67,
          errorRate: 0.5
        }
      ],
      metrics: {
        totalRequests: 2450670,
        successRate: 98.7,
        avgResponseTime: 125,
        uptime: 99.9,
        errorRate: 1.3,
        peakRPS: 450,
        dataTransfer: 15.6
      },
      security: {
        httpsOnly: true,
        corsEnabled: true,
        rateLimiting: true,
        ipWhitelisting: false,
        apiKeyRequired: true,
        oauthSupported: true
      },
      monitoring: {
        healthCheck: 'https://api.dankdash.com/health',
        lastCheck: '2024-08-14T10:30:00Z',
        status: 'Healthy',
        alerts: 0,
        incidents: 2
      },
      team: {
        owner: 'Backend Team',
        maintainer: 'Sarah Johnson',
        contact: 'api@dankdash.com'
      },
      created: '2023-01-15',
      lastUpdated: '2024-08-10'
    },
    {
      id: 'API-002',
      name: 'Payment Processing API',
      description: 'Secure payment processing for cannabis transactions with compliance features',
      version: 'v1.5.2',
      status: 'Active',
      baseUrl: 'https://payments.dankdash.com/v1',
      documentation: 'https://docs.dankdash.com/payments/v1',
      category: 'Payment',
      authentication: 'API Key + HMAC',
      rateLimit: {
        requests: 500,
        period: 'hour',
        burst: 50
      },
      endpoints: [
        {
          path: '/charges',
          method: 'POST',
          description: 'Process payment charge',
          parameters: ['amount', 'currency', 'payment_method', 'customer_id'],
          responses: ['200', '400', '402', '500'],
          usage: 12450,
          avgResponseTime: 890,
          errorRate: 2.1
        },
        {
          path: '/refunds',
          method: 'POST',
          description: 'Process payment refund',
          parameters: ['charge_id', 'amount', 'reason'],
          responses: ['200', '400', '404'],
          usage: 890,
          avgResponseTime: 1200,
          errorRate: 1.8
        },
        {
          path: '/customers',
          method: 'GET',
          description: 'Retrieve customer payment info',
          parameters: ['customer_id'],
          responses: ['200', '401', '404'],
          usage: 8920,
          avgResponseTime: 156,
          errorRate: 0.9
        }
      ],
      metrics: {
        totalRequests: 456780,
        successRate: 97.8,
        avgResponseTime: 567,
        uptime: 99.95,
        errorRate: 2.2,
        peakRPS: 89,
        dataTransfer: 8.9
      },
      security: {
        httpsOnly: true,
        corsEnabled: false,
        rateLimiting: true,
        ipWhitelisting: true,
        apiKeyRequired: true,
        oauthSupported: false
      },
      monitoring: {
        healthCheck: 'https://payments.dankdash.com/health',
        lastCheck: '2024-08-14T10:29:00Z',
        status: 'Healthy',
        alerts: 1,
        incidents: 0
      },
      team: {
        owner: 'Payment Team',
        maintainer: 'Mike Chen',
        contact: 'payments@dankdash.com'
      },
      created: '2023-03-20',
      lastUpdated: '2024-08-05'
    },
    {
      id: 'API-003',
      name: 'Inventory Management API',
      description: 'Real-time inventory tracking and management for cannabis products',
      version: 'v3.0.1',
      status: 'Active',
      baseUrl: 'https://inventory.dankdash.com/v3',
      documentation: 'https://docs.dankdash.com/inventory/v3',
      category: 'Inventory',
      authentication: 'OAuth 2.0',
      rateLimit: {
        requests: 2000,
        period: 'hour',
        burst: 200
      },
      endpoints: [
        {
          path: '/products/stock',
          method: 'GET',
          description: 'Get current stock levels',
          parameters: ['product_id', 'location'],
          responses: ['200', '404'],
          usage: 67890,
          avgResponseTime: 45,
          errorRate: 0.2
        },
        {
          path: '/products/stock',
          method: 'PUT',
          description: 'Update stock levels',
          parameters: ['product_id', 'quantity', 'location', 'reason'],
          responses: ['200', '400', '422'],
          usage: 23450,
          avgResponseTime: 123,
          errorRate: 0.8
        },
        {
          path: '/batches',
          method: 'GET',
          description: 'Retrieve batch information',
          parameters: ['batch_id', 'product_id'],
          responses: ['200', '404'],
          usage: 12340,
          avgResponseTime: 78,
          errorRate: 0.4
        }
      ],
      metrics: {
        totalRequests: 1234560,
        successRate: 99.2,
        avgResponseTime: 67,
        uptime: 99.8,
        errorRate: 0.8,
        peakRPS: 234,
        dataTransfer: 12.3
      },
      security: {
        httpsOnly: true,
        corsEnabled: true,
        rateLimiting: true,
        ipWhitelisting: false,
        apiKeyRequired: false,
        oauthSupported: true
      },
      monitoring: {
        healthCheck: 'https://inventory.dankdash.com/health',
        lastCheck: '2024-08-14T10:31:00Z',
        status: 'Healthy',
        alerts: 0,
        incidents: 1
      },
      team: {
        owner: 'Inventory Team',
        maintainer: 'Alex Kim',
        contact: 'inventory@dankdash.com'
      },
      created: '2023-06-10',
      lastUpdated: '2024-08-12'
    },
    {
      id: 'API-004',
      name: 'Compliance Tracking API',
      description: 'Cannabis compliance and regulatory tracking for state reporting requirements',
      version: 'v1.2.0',
      status: 'Beta',
      baseUrl: 'https://compliance.dankdash.com/v1',
      documentation: 'https://docs.dankdash.com/compliance/v1',
      category: 'Compliance',
      authentication: 'API Key + Certificate',
      rateLimit: {
        requests: 100,
        period: 'hour',
        burst: 10
      },
      endpoints: [
        {
          path: '/reports/state',
          method: 'POST',
          description: 'Submit state compliance report',
          parameters: ['report_type', 'period', 'data'],
          responses: ['201', '400', '422'],
          usage: 450,
          avgResponseTime: 2340,
          errorRate: 3.2
        },
        {
          path: '/tracking/seed-to-sale',
          method: 'GET',
          description: 'Get seed-to-sale tracking data',
          parameters: ['batch_id', 'start_date', 'end_date'],
          responses: ['200', '404'],
          usage: 1230,
          avgResponseTime: 567,
          errorRate: 1.8
        }
      ],
      metrics: {
        totalRequests: 23450,
        successRate: 96.8,
        avgResponseTime: 1234,
        uptime: 98.5,
        errorRate: 3.2,
        peakRPS: 12,
        dataTransfer: 2.1
      },
      security: {
        httpsOnly: true,
        corsEnabled: false,
        rateLimiting: true,
        ipWhitelisting: true,
        apiKeyRequired: true,
        oauthSupported: false
      },
      monitoring: {
        healthCheck: 'https://compliance.dankdash.com/health',
        lastCheck: '2024-08-14T10:28:00Z',
        status: 'Warning',
        alerts: 2,
        incidents: 0
      },
      team: {
        owner: 'Compliance Team',
        maintainer: 'Lisa Rodriguez',
        contact: 'compliance@dankdash.com'
      },
      created: '2024-02-01',
      lastUpdated: '2024-08-08'
    },
    {
      id: 'API-005',
      name: 'Analytics & Reporting API',
      description: 'Business intelligence and analytics data for reporting and insights',
      version: 'v2.0.0',
      status: 'Deprecated',
      baseUrl: 'https://analytics.dankdash.com/v2',
      documentation: 'https://docs.dankdash.com/analytics/v2',
      category: 'Analytics',
      authentication: 'JWT Bearer Token',
      rateLimit: {
        requests: 200,
        period: 'hour',
        burst: 20
      },
      endpoints: [
        {
          path: '/reports/sales',
          method: 'GET',
          description: 'Get sales analytics data',
          parameters: ['start_date', 'end_date', 'granularity'],
          responses: ['200', '400'],
          usage: 2340,
          avgResponseTime: 890,
          errorRate: 1.5
        },
        {
          path: '/metrics/kpi',
          method: 'GET',
          description: 'Get key performance indicators',
          parameters: ['metric_type', 'period'],
          responses: ['200', '404'],
          usage: 1560,
          avgResponseTime: 456,
          errorRate: 0.9
        }
      ],
      metrics: {
        totalRequests: 89450,
        successRate: 98.1,
        avgResponseTime: 678,
        uptime: 99.2,
        errorRate: 1.9,
        peakRPS: 45,
        dataTransfer: 5.6
      },
      security: {
        httpsOnly: true,
        corsEnabled: true,
        rateLimiting: true,
        ipWhitelisting: false,
        apiKeyRequired: true,
        oauthSupported: true
      },
      monitoring: {
        healthCheck: 'https://analytics.dankdash.com/health',
        lastCheck: '2024-08-14T10:25:00Z',
        status: 'Deprecated',
        alerts: 0,
        incidents: 0
      },
      team: {
        owner: 'Analytics Team',
        maintainer: 'Emma Wilson',
        contact: 'analytics@dankdash.com'
      },
      created: '2022-11-15',
      lastUpdated: '2024-07-01'
    }
  ]);

  const [apiKeys, setApiKeys] = useState([
    {
      id: 'KEY-001',
      name: 'Production Mobile App',
      key: 'dk_live_1234567890abcdef',
      type: 'Production',
      status: 'Active',
      permissions: ['read:products', 'write:orders', 'read:users'],
      rateLimit: 1000,
      lastUsed: '2024-08-14T09:45:00Z',
      created: '2024-01-15',
      expiresAt: '2025-01-15',
      usage: {
        requests: 45670,
        period: 'last_30_days'
      },
      owner: 'Mobile Team',
      environment: 'production'
    },
    {
      id: 'KEY-002',
      name: 'Web Dashboard',
      key: 'dk_live_abcdef1234567890',
      type: 'Production',
      status: 'Active',
      permissions: ['read:*', 'write:*'],
      rateLimit: 2000,
      lastUsed: '2024-08-14T10:30:00Z',
      created: '2024-02-01',
      expiresAt: '2025-02-01',
      usage: {
        requests: 123450,
        period: 'last_30_days'
      },
      owner: 'Frontend Team',
      environment: 'production'
    },
    {
      id: 'KEY-003',
      name: 'Third-party Integration',
      key: 'dk_live_fedcba0987654321',
      type: 'Partner',
      status: 'Active',
      permissions: ['read:products', 'read:inventory'],
      rateLimit: 500,
      lastUsed: '2024-08-13T16:20:00Z',
      created: '2024-03-10',
      expiresAt: '2024-12-31',
      usage: {
        requests: 8920,
        period: 'last_30_days'
      },
      owner: 'Partner: GreenTech Solutions',
      environment: 'production'
    },
    {
      id: 'KEY-004',
      name: 'Development Testing',
      key: 'dk_test_1111222233334444',
      type: 'Development',
      status: 'Active',
      permissions: ['read:*', 'write:*'],
      rateLimit: 100,
      lastUsed: '2024-08-14T08:15:00Z',
      created: '2024-07-01',
      expiresAt: '2024-12-31',
      usage: {
        requests: 2340,
        period: 'last_30_days'
      },
      owner: 'Development Team',
      environment: 'development'
    },
    {
      id: 'KEY-005',
      name: 'Legacy System',
      key: 'dk_live_5555666677778888',
      type: 'Legacy',
      status: 'Revoked',
      permissions: ['read:products'],
      rateLimit: 50,
      lastUsed: '2024-07-20T14:30:00Z',
      created: '2023-05-15',
      expiresAt: '2024-05-15',
      usage: {
        requests: 0,
        period: 'last_30_days'
      },
      owner: 'Legacy Team',
      environment: 'production'
    }
  ]);

  const [webhooks, setWebhooks] = useState([
    {
      id: 'WH-001',
      name: 'Order Status Updates',
      url: 'https://partner.example.com/webhooks/orders',
      events: ['order.created', 'order.updated', 'order.completed'],
      status: 'Active',
      secret: 'whsec_1234567890abcdef',
      retryPolicy: {
        maxRetries: 3,
        backoffMultiplier: 2,
        initialDelay: 1000
      },
      lastDelivery: '2024-08-14T10:25:00Z',
      successRate: 98.5,
      totalDeliveries: 12450,
      failedDeliveries: 187,
      avgResponseTime: 234,
      created: '2024-01-20',
      owner: 'Partner Integration'
    },
    {
      id: 'WH-002',
      name: 'Inventory Alerts',
      url: 'https://inventory.dankdash.com/webhooks/stock',
      events: ['inventory.low_stock', 'inventory.out_of_stock'],
      status: 'Active',
      secret: 'whsec_abcdef1234567890',
      retryPolicy: {
        maxRetries: 5,
        backoffMultiplier: 1.5,
        initialDelay: 500
      },
      lastDelivery: '2024-08-14T09:45:00Z',
      successRate: 99.2,
      totalDeliveries: 3450,
      failedDeliveries: 28,
      avgResponseTime: 156,
      created: '2024-03-15',
      owner: 'Inventory Team'
    },
    {
      id: 'WH-003',
      name: 'Payment Notifications',
      url: 'https://accounting.dankdash.com/webhooks/payments',
      events: ['payment.succeeded', 'payment.failed', 'refund.created'],
      status: 'Paused',
      secret: 'whsec_fedcba0987654321',
      retryPolicy: {
        maxRetries: 3,
        backoffMultiplier: 2,
        initialDelay: 1000
      },
      lastDelivery: '2024-08-12T14:20:00Z',
      successRate: 96.8,
      totalDeliveries: 8920,
      failedDeliveries: 285,
      avgResponseTime: 345,
      created: '2024-02-10',
      owner: 'Accounting Team'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalAPIs: 15,
    activeAPIs: 12,
    betaAPIs: 2,
    deprecatedAPIs: 1,
    totalRequests: 4567890,
    successRate: 98.4,
    avgResponseTime: 234,
    totalAPIKeys: 45,
    activeKeys: 38,
    revokedKeys: 7,
    totalWebhooks: 23,
    activeWebhooks: 19,
    webhookSuccessRate: 97.8,
    dataTransfer: 156.7,
    peakRPS: 890,
    uptime: 99.7
  });

  // Filter functions
  const filteredAPIs = apis.filter(api => {
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || api.status.toLowerCase() === selectedStatus;
    const matchesVersion = selectedVersion === 'all' || api.version.includes(selectedVersion);
    return matchesSearch && matchesStatus && matchesVersion;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Beta': return 'bg-yellow-100 text-yellow-800';
      case 'Deprecated': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-orange-100 text-orange-800';
      case 'Paused': return 'bg-gray-100 text-gray-800';
      case 'Revoked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Core': return 'bg-blue-100 text-blue-800';
      case 'Payment': return 'bg-green-100 text-green-800';
      case 'Inventory': return 'bg-purple-100 text-purple-800';
      case 'Compliance': return 'bg-orange-100 text-orange-800';
      case 'Analytics': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v13z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total APIs</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalAPIs}</p>
              <p className="text-sm text-blue-600">{analytics.activeAPIs} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{(analytics.totalRequests / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-green-600">{analytics.successRate}% success</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">API Keys</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalAPIKeys}</p>
              <p className="text-sm text-purple-600">{analytics.activeKeys} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.avgResponseTime}ms</p>
              <p className="text-sm text-yellow-600">{analytics.uptime}% uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* API Status Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">API Status Overview</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {apis.slice(0, 5).map((api) => (
              <div key={api.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🔌</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{api.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(api.status)}`}>
                        {api.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(api.category)}`}>
                        {api.category}
                      </span>
                      <span className="text-xs text-gray-500">{api.version}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{(api.metrics.totalRequests / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-gray-500">Requests</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{api.metrics.successRate}%</p>
                      <p className="text-xs text-gray-500">Success</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{api.metrics.avgResponseTime}ms</p>
                      <p className="text-xs text-gray-500">Response</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-yellow-600">{api.metrics.uptime}%</p>
                      <p className="text-xs text-gray-500">Uptime</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent API Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent API Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {apis.flatMap(api => 
              api.endpoints.slice(0, 2).map(endpoint => ({
                ...endpoint,
                apiName: api.name,
                apiId: api.id
              }))
            ).slice(0, 8).map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">📡</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{endpoint.path}</span>
                    </div>
                    <p className="text-sm text-gray-600">{endpoint.apiName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{endpoint.usage.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Requests</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{endpoint.avgResponseTime}ms</p>
                      <p className="text-xs text-gray-500">Avg Time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-red-600">{endpoint.errorRate}%</p>
                      <p className="text-xs text-gray-500">Error Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Peak RPS</span>
                <span className="text-sm font-medium text-gray-900">{analytics.peakRPS}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Data Transfer (GB)</span>
                <span className="text-sm font-medium text-gray-900">{analytics.dataTransfer}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="text-sm font-medium text-green-600">{analytics.successRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm font-medium text-green-600">{analytics.uptime}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Webhook Status</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Webhooks</span>
                <span className="text-sm font-medium text-gray-900">{analytics.totalWebhooks}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Webhooks</span>
                <span className="text-sm font-medium text-green-600">{analytics.activeWebhooks}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="text-sm font-medium text-green-600">{analytics.webhookSuccessRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Failed Deliveries</span>
                <span className="text-sm font-medium text-red-600">{webhooks.reduce((sum, wh) => sum + wh.failedDeliveries, 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAPIs = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search APIs..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="beta">Beta</option>
              <option value="deprecated">Deprecated</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
            >
              <option value="all">All Versions</option>
              <option value="v1">v1.x</option>
              <option value="v2">v2.x</option>
              <option value="v3">v3.x</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create API
            </button>
          </div>
        </div>
      </div>

      {/* APIs List */}
      <div className="space-y-4">
        {filteredAPIs.map((api) => (
          <div key={api.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🔌</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{api.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(api.status)}`}>
                      {api.status}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(api.category)}`}>
                      {api.category}
                    </span>
                    <span className="text-xs text-gray-500">{api.version}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Manage
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Docs
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{api.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Base URL:</p>
                <p className="text-sm text-gray-600 break-all">{api.baseUrl}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Authentication:</p>
                <p className="text-sm text-gray-600">{api.authentication}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Rate Limit:</p>
                <p className="text-sm text-gray-600">{api.rateLimit.requests}/{api.rateLimit.period}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Maintainer:</p>
                <p className="text-sm text-gray-600">{api.team.maintainer}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{(api.metrics.totalRequests / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500">Total Requests</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{api.metrics.successRate}%</p>
                <p className="text-xs text-gray-500">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{api.metrics.avgResponseTime}ms</p>
                <p className="text-xs text-gray-500">Avg Response</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-600">{api.metrics.uptime}%</p>
                <p className="text-xs text-gray-500">Uptime</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Top Endpoints:</p>
              <div className="space-y-2">
                {api.endpoints.slice(0, 3).map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <span className="text-sm text-gray-900">{endpoint.path}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span>{endpoint.usage.toLocaleString()} requests</span>
                      <span>{endpoint.avgResponseTime}ms</span>
                      <span className="text-red-600">{endpoint.errorRate}% errors</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Security Features:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(api.security).filter(([key, value]) => value).map(([key, value]) => (
                  <span key={key} className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Created: {formatDate(api.created)}</span>
              <span>Last Updated: {formatDate(api.lastUpdated)}</span>
              <span>Health: {api.monitoring.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderKeys = () => (
    <div className="space-y-6">
      {/* API Keys List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Key
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🔑</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{key.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(key.status)}`}>
                        {key.status}
                      </span>
                      <span className="text-xs text-gray-500">{key.type}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{key.environment}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {key.key.substring(0, 20)}...
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{key.usage.requests.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Requests (30d)</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{key.rateLimit}</p>
                      <p className="text-xs text-gray-500">Rate Limit</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{key.permissions.length}</p>
                      <p className="text-xs text-gray-500">Permissions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{formatDate(key.expiresAt)}</p>
                      <p className="text-xs text-gray-500">Expires</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Permissions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Key Permissions Overview</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Key Name</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Permissions</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Usage</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id} className="border-b">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{key.name}</p>
                        <p className="text-sm text-gray-600">{key.owner}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{key.type}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {key.permissions.slice(0, 2).map((permission, index) => (
                          <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            {permission}
                          </span>
                        ))}
                        {key.permissions.length > 2 && (
                          <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            +{key.permissions.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{key.usage.requests.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(key.status)}`}>
                        {key.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWebhooks = () => (
    <div className="space-y-6">
      {/* Webhooks List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Webhooks</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Webhook
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🪝</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{webhook.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(webhook.status)}`}>
                        {webhook.status}
                      </span>
                      <span className="text-xs text-gray-500">{webhook.events.length} events</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 break-all">{webhook.url}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{webhook.totalDeliveries.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Total Deliveries</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{webhook.successRate}%</p>
                      <p className="text-xs text-gray-500">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-red-600">{webhook.failedDeliveries}</p>
                      <p className="text-xs text-gray-500">Failed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{webhook.avgResponseTime}ms</p>
                      <p className="text-xs text-gray-500">Avg Response</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                        Test
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Webhook Events */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Webhook Events</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{webhook.name}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(webhook.status)}`}>
                    {webhook.status}
                  </span>
                </div>
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Events:</p>
                  <div className="flex flex-wrap gap-2">
                    {webhook.events.map((event, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Owner:</span>
                    <span className="ml-2 text-gray-600">{webhook.owner}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Last Delivery:</span>
                    <span className="ml-2 text-gray-600">{formatDateTime(webhook.lastDelivery)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Max Retries:</span>
                    <span className="ml-2 text-gray-600">{webhook.retryPolicy.maxRetries}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Created:</span>
                    <span className="ml-2 text-gray-600">{formatDate(webhook.created)}</span>
                  </div>
                </div>
              </div>
            ))}
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
          <h1 className="text-3xl font-bold text-gray-900">API Management</h1>
          <p className="mt-2 text-gray-600">Manage APIs, authentication keys, webhooks, and monitor performance</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'apis', name: 'APIs', icon: '🔌' },
              { id: 'keys', name: 'API Keys', icon: '🔑' },
              { id: 'webhooks', name: 'Webhooks', icon: '🪝' }
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
        {activeTab === 'apis' && renderAPIs()}
        {activeTab === 'keys' && renderKeys()}
        {activeTab === 'webhooks' && renderWebhooks()}
      </div>
    </div>
  );
};

export default APIModule;

