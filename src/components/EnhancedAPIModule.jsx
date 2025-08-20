import React, { useState, useEffect } from 'react';
import { Code, Key, Globe, Shield, Activity, Clock, AlertTriangle, CheckCircle, Copy, Download, RefreshCw, Plus, Search, Filter, Eye, Settings, Trash2, Edit } from 'lucide-react';

const EnhancedAPIModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedVersion, setSelectedVersion] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [apis, setApis] = useState([]);
  const [apiKeys, setApiKeys] = useState([]);
  const [webhooks, setWebhooks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize sample data
  useEffect(() => {
    setApis([
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
            parameters: ['customer_id', 'items', 'delivery_address'],
            responses: ['201', '400', '422'],
            usage: 34560,
            avgResponseTime: 234,
            errorRate: 1.2
          }
        ],
        metrics: {
          totalRequests: 1245670,
          successRate: 98.7,
          avgResponseTime: 156,
          uptime: 99.9
        }
      },
      {
        id: 'API-002',
        name: 'Payment Processing API',
        description: 'Secure payment processing for cannabis transactions with compliance features',
        version: 'v1.3.2',
        status: 'Active',
        baseUrl: 'https://payments.dankdash.com/v1',
        documentation: 'https://docs.dankdash.com/payments/v1',
        category: 'Payments',
        authentication: 'API Key + HMAC',
        rateLimit: {
          requests: 500,
          period: 'hour',
          burst: 50
        },
        endpoints: [
          {
            path: '/charge',
            method: 'POST',
            description: 'Process payment charge',
            parameters: ['amount', 'currency', 'payment_method'],
            responses: ['200', '400', '402', '500'],
            usage: 12340,
            avgResponseTime: 890,
            errorRate: 2.1
          },
          {
            path: '/refund',
            method: 'POST',
            description: 'Process refund',
            parameters: ['charge_id', 'amount', 'reason'],
            responses: ['200', '400', '404'],
            usage: 1230,
            avgResponseTime: 456,
            errorRate: 0.9
          }
        ],
        metrics: {
          totalRequests: 234560,
          successRate: 97.8,
          avgResponseTime: 678,
          uptime: 99.8
        }
      },
      {
        id: 'API-003',
        name: 'Inventory Management API',
        description: 'Real-time inventory tracking and management for cannabis products',
        version: 'v1.0.5',
        status: 'Beta',
        baseUrl: 'https://inventory.dankdash.com/v1',
        documentation: 'https://docs.dankdash.com/inventory/v1',
        category: 'Inventory',
        authentication: 'OAuth 2.0',
        rateLimit: {
          requests: 2000,
          period: 'hour',
          burst: 200
        },
        endpoints: [
          {
            path: '/stock',
            method: 'GET',
            description: 'Get current stock levels',
            parameters: ['product_id', 'location'],
            responses: ['200', '404'],
            usage: 45670,
            avgResponseTime: 67,
            errorRate: 0.2
          }
        ],
        metrics: {
          totalRequests: 567890,
          successRate: 99.2,
          avgResponseTime: 89,
          uptime: 99.5
        }
      }
    ]);

    setApiKeys([
      {
        id: 'KEY-001',
        name: 'Production Key - Main App',
        key: 'dk_live_1234567890abcdef',
        status: 'Active',
        permissions: ['read', 'write'],
        lastUsed: '2024-01-15 14:30',
        requests: 125670,
        rateLimit: '1000/hour',
        createdAt: '2024-01-01',
        expiresAt: '2024-12-31'
      },
      {
        id: 'KEY-002',
        name: 'Development Key - Testing',
        key: 'dk_test_abcdef1234567890',
        status: 'Active',
        permissions: ['read'],
        lastUsed: '2024-01-15 12:15',
        requests: 5670,
        rateLimit: '100/hour',
        createdAt: '2024-01-10',
        expiresAt: '2024-06-30'
      },
      {
        id: 'KEY-003',
        name: 'Partner Integration Key',
        key: 'dk_live_fedcba0987654321',
        status: 'Suspended',
        permissions: ['read', 'write', 'admin'],
        lastUsed: '2024-01-10 09:45',
        requests: 89450,
        rateLimit: '2000/hour',
        createdAt: '2023-12-15',
        expiresAt: '2024-12-15'
      }
    ]);

    setWebhooks([
      {
        id: 'WH-001',
        name: 'Order Status Updates',
        url: 'https://partner.example.com/webhooks/orders',
        events: ['order.created', 'order.updated', 'order.completed'],
        status: 'Active',
        lastTriggered: '2024-01-15 14:25',
        successRate: 98.5,
        totalDeliveries: 12450,
        failedDeliveries: 187,
        secret: 'whsec_1234567890abcdef'
      },
      {
        id: 'WH-002',
        name: 'Payment Notifications',
        url: 'https://accounting.example.com/webhooks/payments',
        events: ['payment.succeeded', 'payment.failed', 'refund.created'],
        status: 'Active',
        lastTriggered: '2024-01-15 13:45',
        successRate: 99.2,
        totalDeliveries: 8900,
        failedDeliveries: 71,
        secret: 'whsec_abcdef1234567890'
      },
      {
        id: 'WH-003',
        name: 'Inventory Alerts',
        url: 'https://inventory.example.com/webhooks/stock',
        events: ['stock.low', 'stock.out', 'stock.updated'],
        status: 'Paused',
        lastTriggered: '2024-01-12 16:30',
        successRate: 95.8,
        totalDeliveries: 3450,
        failedDeliveries: 145,
        secret: 'whsec_fedcba0987654321'
      }
    ]);

    setLogs([
      {
        id: 'LOG-001',
        timestamp: '2024-01-15 14:30:25',
        method: 'POST',
        endpoint: '/api/v2/orders',
        status: 201,
        responseTime: 234,
        ip: '192.168.1.100',
        userAgent: 'DankDash Mobile App v2.1.0',
        apiKey: 'dk_live_1234...cdef',
        requestSize: 1024,
        responseSize: 512
      },
      {
        id: 'LOG-002',
        timestamp: '2024-01-15 14:29:45',
        method: 'GET',
        endpoint: '/api/v2/products',
        status: 200,
        responseTime: 89,
        ip: '10.0.0.50',
        userAgent: 'Partner Integration v1.0',
        apiKey: 'dk_live_fedcba...4321',
        requestSize: 256,
        responseSize: 8192
      },
      {
        id: 'LOG-003',
        timestamp: '2024-01-15 14:28:12',
        method: 'POST',
        endpoint: '/api/v1/payments/charge',
        status: 400,
        responseTime: 145,
        ip: '203.0.113.25',
        userAgent: 'Web Browser',
        apiKey: 'dk_live_1234...cdef',
        requestSize: 512,
        responseSize: 256
      }
    ]);
  }, []);

  const handleCreateAPI = async (formData) => {
    setIsLoading(true);
    try {
      const newAPI = {
        id: `API-${String(apis.length + 1).padStart(3, '0')}`,
        name: formData.name || 'New API',
        description: formData.description || 'New API description',
        version: formData.version || 'v1.0.0',
        status: formData.status || 'Active',
        baseUrl: formData.baseUrl || 'https://api.dankdash.com/v1',
        documentation: formData.documentation || '',
        category: formData.category || 'Custom',
        authentication: formData.authentication || 'API Key',
        rateLimit: formData.rateLimit || { requests: 100, period: 'hour', burst: 10 },
        endpoints: [],
        metrics: { totalRequests: 0, successRate: 100, avgResponseTime: 0, uptime: 100 },
        created: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setApis([...apis, newAPI]);
      return { success: true, data: newAPI };
    } catch (error) {
      console.error('Error creating API:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAPIKey = async (formData) => {
    setIsLoading(true);
    try {
      const newKey = {
        id: `KEY-${String(apiKeys.length + 1).padStart(3, '0')}`,
        name: formData.name || 'New API Key',
        key: `dk_${formData.environment || 'live'}_${Math.random().toString(36).substring(2, 18)}`,
        status: 'Active',
        permissions: formData.permissions || ['read'],
        lastUsed: 'Never',
        requests: 0,
        rateLimit: formData.rateLimit || '100/hour',
        createdAt: new Date().toISOString().split('T')[0],
        expiresAt: formData.expiresAt || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        owner: formData.owner || 'System Admin',
        environment: formData.environment || 'production'
      };
      setApiKeys([...apiKeys, newKey]);
      return { success: true, data: newKey };
    } catch (error) {
      console.error('Error creating API key:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateWebhook = async (formData) => {
    setIsLoading(true);
    try {
      const newWebhook = {
        id: `WH-${String(webhooks.length + 1).padStart(3, '0')}`,
        name: formData.name || 'New Webhook',
        url: formData.url || 'https://example.com/webhook',
        events: formData.events || ['order.created'],
        status: 'Active',
        lastTriggered: 'Never',
        successRate: 100,
        totalDeliveries: 0,
        failedDeliveries: 0,
        secret: `whsec_${Math.random().toString(36).substring(2, 18)}`,
        retryPolicy: formData.retryPolicy || {
          maxRetries: 3,
          backoffMultiplier: 2,
          initialDelay: 1000
        },
        created: new Date().toISOString().split('T')[0],
        owner: formData.owner || 'System Admin'
      };
      setWebhooks([...webhooks, newWebhook]);
      return { success: true, data: newWebhook };
    } catch (error) {
      console.error('Error creating webhook:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAPI = async (id) => {
    setIsLoading(true);
    try {
      setApis(apis.filter(api => api.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting API:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAPI = async (id, formData) => {
    setIsLoading(true);
    try {
      setApis(apis.map(api => 
        api.id === id 
          ? { 
              ...api, 
              ...formData, 
              lastUpdated: new Date().toISOString().split('T')[0] 
            }
          : api
      ));
      return { success: true };
    } catch (error) {
      console.error('Error updating API:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAPIKey = async (id) => {
    setIsLoading(true);
    try {
      setApiKeys(apiKeys.filter(key => key.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting API key:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWebhook = async (id) => {
    setIsLoading(true);
    try {
      setWebhooks(webhooks.filter(webhook => webhook.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting webhook:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeAPIKey = async (id) => {
    setIsLoading(true);
    try {
      setApiKeys(apiKeys.map(key => 
        key.id === id ? { ...key, status: 'Revoked' } : key
      ));
      return { success: true };
    } catch (error) {
      console.error('Error revoking API key:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWebhook = async (id) => {
    setIsLoading(true);
    try {
      setWebhooks(webhooks.map(webhook => 
        webhook.id === id 
          ? { ...webhook, status: webhook.status === 'Active' ? 'Paused' : 'Active' }
          : webhook
      ));
      return { success: true };
    } catch (error) {
      console.error('Error toggling webhook:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add toast notification here
      return { success: true };
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return { success: false, error: error.message };
    }
  };

  // Filter functions
  const filteredAPIs = apis.filter(api => {
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || api.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesVersion = selectedVersion === 'all' || api.version === selectedVersion;
    
    return matchesSearch && matchesStatus && matchesVersion;
  });

  const filteredAPIKeys = apiKeys.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || key.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const filteredWebhooks = webhooks.filter(webhook => {
    const matchesSearch = webhook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webhook.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || webhook.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const renderDashboardTab = () => (
    <div className="space-y-6">
      {/* API Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total APIs</h3>
                <p className="text-2xl font-bold text-gray-900">{apis.length}</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {apis.filter(api => api.status === 'Active').length} Active
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <Key className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">API Keys</h3>
                <p className="text-2xl font-bold text-gray-900">{apiKeys.length}</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {apiKeys.filter(key => key.status === 'Active').length} Active
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
                <p className="text-2xl font-bold text-gray-900">2.1M</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-green-600">
            +12.5% from last month
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Avg Response</h3>
                <p className="text-2xl font-bold text-gray-900">156ms</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-green-600">
            -8ms from last week
          </div>
        </div>
      </div>

      {/* API Status Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">API Status Overview</h3>
        <div className="space-y-4">
          {apis.map((api) => (
            <div key={api.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                <div className={`w-3 h-3 rounded-full ${
                  api.status === 'Active' ? 'bg-green-500' :
                  api.status === 'Beta' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}></div>
                <div>
                  <h4 className="font-medium text-gray-900">{api.name}</h4>
                  <p className="text-sm text-gray-600">{api.version} • {api.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div>
                  <span className="font-medium">{api.metrics.successRate}%</span>
                  <span className="ml-1">Success</span>
                </div>
                <div>
                  <span className="font-medium">{api.metrics.avgResponseTime}ms</span>
                  <span className="ml-1">Avg Response</span>
                </div>
                <div>
                  <span className="font-medium">{api.metrics.uptime}%</span>
                  <span className="ml-1">Uptime</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent API Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent API Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Endpoint</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Response Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.slice(0, 5).map((log) => (
                <tr key={log.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600">{log.timestamp.split(' ')[1]}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      log.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                      log.method === 'POST' ? 'bg-green-100 text-green-800' :
                      log.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {log.method}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-mono">{log.endpoint}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      log.status < 300 ? 'bg-green-100 text-green-800' :
                      log.status < 400 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{log.responseTime}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAPIsTab = () => (
    <div className="space-y-6">
      {/* APIs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">API Management</h2>
          <p className="text-gray-600">Manage your APIs, endpoints, and documentation</p>
        </div>
        <button
          onClick={handleCreateAPI}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create API</span>
        </button>
      </div>

      {/* APIs List */}
      <div className="space-y-4">
        {apis.map((api) => (
          <div key={api.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 mb-4 lg:mb-0">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{api.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    api.status === 'Active' ? 'bg-green-100 text-green-800' :
                    api.status === 'Beta' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {api.status}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {api.version}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{api.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Base URL:</span>
                    <div className="font-mono text-gray-900 break-all">{api.baseUrl}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Authentication:</span>
                    <div className="text-gray-900">{api.authentication}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Rate Limit:</span>
                    <div className="text-gray-900">{api.rateLimit.requests}/{api.rateLimit.period}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Endpoints:</span>
                    <div className="text-gray-900">{api.endpoints.length}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteAPI(api.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* API Metrics */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{api.metrics.totalRequests.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Total Requests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{api.metrics.successRate}%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{api.metrics.avgResponseTime}ms</div>
                  <div className="text-sm text-gray-500">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{api.metrics.uptime}%</div>
                  <div className="text-sm text-gray-500">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderKeysTab = () => (
    <div className="space-y-6">
      {/* API Keys Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">API Keys</h2>
          <p className="text-gray-600">Manage API keys and access permissions</p>
        </div>
        <button
          onClick={handleCreateAPIKey}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Key className="h-4 w-4" />
          <span>Create API Key</span>
        </button>
      </div>

      {/* API Keys List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Key</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Permissions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Last Used</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key) => (
                <tr key={key.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{key.name}</div>
                      <div className="text-sm text-gray-500">Created: {key.createdAt}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {key.key.substring(0, 20)}...
                      </code>
                      <button
                        onClick={() => copyToClipboard(key.key)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      key.status === 'Active' ? 'bg-green-100 text-green-800' :
                      key.status === 'Suspended' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {key.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {key.permissions.map((permission) => (
                        <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{key.lastUsed}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRevokeAPIKey(key.id)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <Shield className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAPIKey(key.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderWebhooksTab = () => (
    <div className="space-y-6">
      {/* Webhooks Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Webhooks</h2>
          <p className="text-gray-600">Manage webhook endpoints and event subscriptions</p>
        </div>
        <button
          onClick={handleCreateWebhook}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Activity className="h-4 w-4" />
          <span>Create Webhook</span>
        </button>
      </div>

      {/* Webhooks List */}
      <div className="space-y-4">
        {webhooks.map((webhook) => (
          <div key={webhook.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 mb-4 lg:mb-0">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{webhook.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    webhook.status === 'Active' ? 'bg-green-100 text-green-800' :
                    webhook.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {webhook.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">URL:</span>
                    <div className="font-mono text-gray-900 break-all">{webhook.url}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Events:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {webhook.events.map((event) => (
                        <span key={event} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Triggered:</span>
                    <span className="ml-2 text-gray-900">{webhook.lastTriggered}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleWebhook(webhook.id)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    webhook.status === 'Active' 
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {webhook.status === 'Active' ? 'Pause' : 'Activate'}
                </button>
                <button
                  onClick={() => handleDeleteWebhook(webhook.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Webhook Metrics */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{webhook.totalDeliveries.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Total Deliveries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{webhook.successRate}%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{webhook.failedDeliveries}</div>
                  <div className="text-sm text-gray-500">Failed Deliveries</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLogsTab = () => (
    <div className="space-y-6">
      {/* Logs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">API Logs</h2>
          <p className="text-gray-600">Monitor API requests and responses</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select 
            value={selectedMethod} 
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Methods</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Endpoint</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Response Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">IP Address</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{log.timestamp}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      log.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                      log.method === 'POST' ? 'bg-green-100 text-green-800' :
                      log.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {log.method}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-mono">{log.endpoint}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      log.status < 300 ? 'bg-green-100 text-green-800' :
                      log.status < 400 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{log.responseTime}ms</td>
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{log.ip}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">API Management</h1>
              <p className="text-gray-600">Manage APIs, keys, webhooks, and monitor usage</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export Logs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: Activity },
                { id: 'apis', name: 'APIs', icon: Globe },
                { id: 'keys', name: 'API Keys', icon: Key },
                { id: 'webhooks', name: 'Webhooks', icon: Code },
                { id: 'logs', name: 'Logs', icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboardTab()}
        {activeTab === 'apis' && renderAPIsTab()}
        {activeTab === 'keys' && renderKeysTab()}
        {activeTab === 'webhooks' && renderWebhooksTab()}
        {activeTab === 'logs' && renderLogsTab()}

        {/* API Tips */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">🔧 API Management Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Security Best Practices</h4>
              <ul className="space-y-1">
                <li>• Rotate API keys regularly</li>
                <li>• Use HTTPS for all API endpoints</li>
                <li>• Implement proper rate limiting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Performance Optimization</h4>
              <ul className="space-y-1">
                <li>• Monitor response times and error rates</li>
                <li>• Set up webhook retry mechanisms</li>
                <li>• Use caching for frequently accessed data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAPIModule;

