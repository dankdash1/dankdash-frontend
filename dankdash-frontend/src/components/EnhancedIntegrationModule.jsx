import React, { useState, useEffect } from 'react';

const EnhancedIntegrationModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [loading, setLoading] = useState(false);

  // Enhanced integration data with full functionality
  const [integrations, setIntegrations] = useState([
    {
      id: 'INT-001',
      name: 'Stripe Payment Gateway',
      description: 'Payment processing integration for secure cannabis transactions',
      type: 'Payment',
      status: 'Active',
      environment: 'Production',
      provider: 'Stripe',
      version: 'v2023-10-16',
      endpoint: 'https://api.stripe.com/v1',
      authentication: 'API Key',
      lastSync: '2024-08-14T10:30:00Z',
      syncFrequency: 'Real-time',
      dataFlow: 'Bidirectional',
      healthStatus: 'Healthy',
      uptime: 99.9,
      avgResponseTime: 145,
      totalRequests: 45670,
      errorRate: 0.2,
      configuration: {
        webhookUrl: 'https://api.dankdash.com/webhooks/stripe',
        supportedMethods: ['card', 'ach', 'apple_pay', 'google_pay'],
        currencies: ['USD'],
        features: ['subscriptions', 'refunds', 'disputes']
      },
      monitoring: {
        alertsEnabled: true,
        thresholds: {
          responseTime: 1000,
          errorRate: 5,
          uptime: 99
        }
      },
      compliance: {
        pciCompliant: true,
        dataRetention: 90,
        encryption: 'AES-256'
      },
      createdAt: '2024-01-15',
      updatedAt: '2024-08-14'
    },
    {
      id: 'INT-002',
      name: 'Metrc Cannabis Tracking',
      description: 'State-mandated seed-to-sale tracking system integration',
      type: 'Compliance',
      status: 'Active',
      environment: 'Production',
      provider: 'Metrc',
      version: 'v1.0',
      endpoint: 'https://api-ca.metrc.com/v1',
      authentication: 'API Key + User Key',
      lastSync: '2024-08-14T10:00:00Z',
      syncFrequency: 'Every 15 minutes',
      dataFlow: 'Bidirectional',
      healthStatus: 'Healthy',
      uptime: 98.5,
      avgResponseTime: 890,
      totalRequests: 12340,
      errorRate: 1.5,
      configuration: {
        facilityLicense: 'C11-0000123-LIC',
        trackingCategories: ['plants', 'packages', 'transfers', 'sales'],
        reportingFrequency: 'Daily',
        complianceLevel: 'Full'
      },
      monitoring: {
        alertsEnabled: true,
        thresholds: {
          responseTime: 2000,
          errorRate: 10,
          uptime: 95
        }
      },
      compliance: {
        stateRequired: true,
        auditTrail: true,
        dataRetention: 2555
      },
      createdAt: '2024-01-10',
      updatedAt: '2024-08-14'
    },
    {
      id: 'INT-003',
      name: 'Twilio SMS Service',
      description: 'SMS notifications and marketing automation platform',
      type: 'Communication',
      status: 'Active',
      environment: 'Production',
      provider: 'Twilio',
      version: '2010-04-01',
      endpoint: 'https://api.twilio.com/2010-04-01',
      authentication: 'Account SID + Auth Token',
      lastSync: '2024-08-14T09:45:00Z',
      syncFrequency: 'On-demand',
      dataFlow: 'Outbound',
      healthStatus: 'Healthy',
      uptime: 99.7,
      avgResponseTime: 320,
      totalRequests: 8950,
      errorRate: 0.8,
      configuration: {
        phoneNumber: '+1-555-DANK-SMS',
        messagingService: 'MG1234567890abcdef',
        features: ['sms', 'mms', 'delivery_receipts'],
        rateLimits: {
          perSecond: 10,
          perMinute: 100,
          perHour: 1000
        }
      },
      monitoring: {
        alertsEnabled: true,
        thresholds: {
          responseTime: 1500,
          errorRate: 5,
          uptime: 99
        }
      },
      compliance: {
        tcpaCompliant: true,
        optInRequired: true,
        dataRetention: 30
      },
      createdAt: '2024-02-01',
      updatedAt: '2024-08-14'
    },
    {
      id: 'INT-004',
      name: 'QuickBooks Accounting',
      description: 'Financial data synchronization with QuickBooks Online',
      type: 'Accounting',
      status: 'Warning',
      environment: 'Production',
      provider: 'Intuit',
      version: 'v3',
      endpoint: 'https://sandbox-quickbooks.api.intuit.com/v3',
      authentication: 'OAuth 2.0',
      lastSync: '2024-08-14T08:15:00Z',
      syncFrequency: 'Daily at 2 AM',
      dataFlow: 'Bidirectional',
      healthStatus: 'Degraded',
      uptime: 95.2,
      avgResponseTime: 1250,
      totalRequests: 3420,
      errorRate: 4.8,
      configuration: {
        companyId: 'QB123456789',
        syncEntities: ['customers', 'items', 'invoices', 'payments'],
        taxMapping: 'Automatic',
        chartOfAccounts: 'Synced'
      },
      monitoring: {
        alertsEnabled: true,
        thresholds: {
          responseTime: 2000,
          errorRate: 3,
          uptime: 98
        }
      },
      compliance: {
        financialData: true,
        auditTrail: true,
        dataRetention: 2555
      },
      createdAt: '2024-03-01',
      updatedAt: '2024-08-14'
    },
    {
      id: 'INT-005',
      name: 'Mailchimp Email Marketing',
      description: 'Email marketing campaigns and customer communication',
      type: 'Marketing',
      status: 'Inactive',
      environment: 'Production',
      provider: 'Mailchimp',
      version: 'v3.0',
      endpoint: 'https://us1.api.mailchimp.com/3.0',
      authentication: 'API Key',
      lastSync: '2024-08-10T14:30:00Z',
      syncFrequency: 'Manual',
      dataFlow: 'Outbound',
      healthStatus: 'Offline',
      uptime: 0,
      avgResponseTime: 0,
      totalRequests: 1250,
      errorRate: 0,
      configuration: {
        audienceId: 'MC123456',
        campaignTypes: ['regular', 'automation', 'rss'],
        segmentation: 'Advanced',
        tracking: 'Full'
      },
      monitoring: {
        alertsEnabled: false,
        thresholds: {
          responseTime: 1000,
          errorRate: 2,
          uptime: 99
        }
      },
      compliance: {
        canSpamCompliant: true,
        gdprCompliant: true,
        dataRetention: 365
      },
      createdAt: '2024-04-01',
      updatedAt: '2024-08-10'
    }
  ]);

  const [webhooks, setWebhooks] = useState([
    {
      id: 'WH-001',
      integrationId: 'INT-001',
      name: 'Stripe Payment Events',
      url: 'https://api.dankdash.com/webhooks/stripe',
      events: ['payment_intent.succeeded', 'payment_intent.failed', 'customer.subscription.updated'],
      status: 'Active',
      lastTriggered: '2024-08-14T10:25:00Z',
      totalCalls: 1250,
      successRate: 99.2,
      avgResponseTime: 85,
      retryPolicy: 'Exponential backoff',
      security: 'HMAC SHA-256'
    },
    {
      id: 'WH-002',
      integrationId: 'INT-002',
      name: 'Metrc Compliance Updates',
      url: 'https://api.dankdash.com/webhooks/metrc',
      events: ['package.created', 'transfer.completed', 'plant.harvested'],
      status: 'Active',
      lastTriggered: '2024-08-14T09:50:00Z',
      totalCalls: 890,
      successRate: 97.8,
      avgResponseTime: 120,
      retryPolicy: 'Linear backoff',
      security: 'API Key validation'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalIntegrations: 5,
    activeIntegrations: 3,
    warningIntegrations: 1,
    inactiveIntegrations: 1,
    totalRequests: 71630,
    avgResponseTime: 518,
    overallUptime: 98.66,
    errorRate: 1.46,
    dataTransferred: 2.4,
    webhookCalls: 2140,
    complianceScore: 94.5,
    securityScore: 98.2
  });

  // Form states
  const [integrationForm, setIntegrationForm] = useState({
    name: '',
    description: '',
    type: 'API',
    provider: '',
    version: '',
    endpoint: '',
    authentication: 'API Key',
    environment: 'Staging',
    syncFrequency: 'Real-time',
    dataFlow: 'Bidirectional',
    configuration: {
      features: [],
      rateLimits: {
        perSecond: 10,
        perMinute: 100,
        perHour: 1000
      }
    },
    monitoring: {
      alertsEnabled: true,
      thresholds: {
        responseTime: 1000,
        errorRate: 5,
        uptime: 99
      }
    }
  });

  const [testResults, setTestResults] = useState(null);

  // CRUD Operations for Integrations
  const handleCreateIntegration = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newIntegration = {
        id: `INT-${String(integrations.length + 1).padStart(3, '0')}`,
        ...integrationForm,
        status: 'Inactive',
        healthStatus: 'Unknown',
        uptime: 0,
        avgResponseTime: 0,
        totalRequests: 0,
        errorRate: 0,
        lastSync: null,
        compliance: {
          auditTrail: true,
          dataRetention: 90,
          encryption: 'AES-256'
        },
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setIntegrations([...integrations, newIntegration]);
      setShowCreateModal(false);
      setIntegrationForm({
        name: '',
        description: '',
        type: 'API',
        provider: '',
        version: '',
        endpoint: '',
        authentication: 'API Key',
        environment: 'Staging',
        syncFrequency: 'Real-time',
        dataFlow: 'Bidirectional',
        configuration: {
          features: [],
          rateLimits: {
            perSecond: 10,
            perMinute: 100,
            perHour: 1000
          }
        },
        monitoring: {
          alertsEnabled: true,
          thresholds: {
            responseTime: 1000,
            errorRate: 5,
            uptime: 99
          }
        }
      });
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalIntegrations: prev.totalIntegrations + 1,
        inactiveIntegrations: prev.inactiveIntegrations + 1
      }));

    } catch (error) {
      console.error('Error creating integration:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditIntegration = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedIntegrations = integrations.map(integration => 
        integration.id === selectedIntegration.id 
          ? { ...integration, ...integrationForm, updatedAt: new Date().toISOString().split('T')[0] }
          : integration
      );
      
      setIntegrations(updatedIntegrations);
      setShowEditModal(false);
      setSelectedIntegration(null);
      
    } catch (error) {
      console.error('Error updating integration:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIntegration = async () => {
    setLoading(true);
    
    try {
      const updatedIntegrations = integrations.filter(integration => integration.id !== selectedIntegration.id);
      setIntegrations(updatedIntegrations);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalIntegrations: prev.totalIntegrations - 1,
        activeIntegrations: selectedIntegration.status === 'Active' ? prev.activeIntegrations - 1 : prev.activeIntegrations,
        warningIntegrations: selectedIntegration.status === 'Warning' ? prev.warningIntegrations - 1 : prev.warningIntegrations,
        inactiveIntegrations: selectedIntegration.status === 'Inactive' ? prev.inactiveIntegrations - 1 : prev.inactiveIntegrations
      }));
      
      setShowDeleteModal(false);
      setSelectedIntegration(null);
      
    } catch (error) {
      console.error('Error deleting integration:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleIntegrationStatus = (integrationId, newStatus) => {
    const updatedIntegrations = integrations.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: newStatus,
            healthStatus: newStatus === 'Active' ? 'Healthy' : newStatus === 'Inactive' ? 'Offline' : 'Unknown',
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : integration
    );
    
    setIntegrations(updatedIntegrations);
  };

  const handleTestIntegration = async (integration) => {
    setSelectedIntegration(integration);
    setLoading(true);
    setShowTestModal(true);
    
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResults = {
        status: 'Success',
        responseTime: Math.floor(Math.random() * 500) + 100,
        statusCode: 200,
        message: 'Connection successful',
        timestamp: new Date().toISOString(),
        details: {
          endpoint: integration.endpoint,
          authentication: 'Valid',
          dataFlow: 'Bidirectional',
          features: 'All supported features available'
        }
      };
      
      setTestResults(mockResults);
      
    } catch (error) {
      setTestResults({
        status: 'Error',
        message: 'Connection failed',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter functions
  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || integration.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesType = selectedType === 'all' || integration.type.toLowerCase() === selectedType.toLowerCase();
    const matchesEnvironment = selectedEnvironment === 'all' || integration.environment.toLowerCase() === selectedEnvironment.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType && matchesEnvironment;
  });

  const openEditModal = (integration) => {
    setSelectedIntegration(integration);
    setIntegrationForm({
      name: integration.name,
      description: integration.description,
      type: integration.type,
      provider: integration.provider,
      version: integration.version,
      endpoint: integration.endpoint,
      authentication: integration.authentication,
      environment: integration.environment,
      syncFrequency: integration.syncFrequency,
      dataFlow: integration.dataFlow,
      configuration: integration.configuration,
      monitoring: integration.monitoring
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (integration) => {
    setSelectedIntegration(integration);
    setShowDeleteModal(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthColor = (health) => {
    switch (health.toLowerCase()) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'unknown': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'payment': return 'text-blue-600 bg-blue-100';
      case 'compliance': return 'text-purple-600 bg-purple-100';
      case 'communication': return 'text-green-600 bg-green-100';
      case 'accounting': return 'text-yellow-600 bg-yellow-100';
      case 'marketing': return 'text-pink-600 bg-pink-100';
      case 'api': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Integrations</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalIntegrations}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{analytics.activeIntegrations} Active</span>
            <span className="text-gray-500 ml-2">• {analytics.warningIntegrations} Warning</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalRequests.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">Avg: {analytics.avgResponseTime}ms</span>
            <span className="text-gray-500 ml-2">response time</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Uptime</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.overallUptime.toFixed(1)}%</p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-yellow-600 font-medium">{analytics.errorRate.toFixed(1)}%</span>
            <span className="text-gray-500 ml-2">error rate</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security Score</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.securityScore.toFixed(0)}%</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-purple-600 font-medium">{analytics.complianceScore.toFixed(1)}%</span>
            <span className="text-gray-500 ml-2">compliance</span>
          </div>
        </div>
      </div>

      {/* Integration Status Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Integration Status Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Active', 'Warning', 'Inactive', 'Error'].map((status) => {
              const statusIntegrations = integrations.filter(integration => integration.status === status);
              const percentage = integrations.length > 0 ? ((statusIntegrations.length / integrations.length) * 100).toFixed(1) : 0;
              
              return (
                <div key={status} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(status)}`}>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{status}</h4>
                      <p className="text-sm text-gray-500">{statusIntegrations.length} integrations</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Percentage</span>
                      <span className="font-medium text-gray-900">{percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Integration Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Integration Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {integrations
              .sort((a, b) => new Date(b.lastSync || b.updatedAt) - new Date(a.lastSync || a.updatedAt))
              .slice(0, 5)
              .map((integration) => (
                <div key={integration.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{integration.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(integration.status)}`}>
                        {integration.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{integration.provider} • {integration.type}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      {integration.lastSync && (
                        <>
                          <span>Last sync: {new Date(integration.lastSync).toLocaleDateString()}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>Uptime: {integration.uptime.toFixed(1)}%</span>
                      <span>•</span>
                      <span>Avg response: {integration.avgResponseTime}ms</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search integrations..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center space-x-4">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="warning">Warning</option>
            <option value="inactive">Inactive</option>
            <option value="error">Error</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="payment">Payment</option>
            <option value="compliance">Compliance</option>
            <option value="communication">Communication</option>
            <option value="accounting">Accounting</option>
            <option value="marketing">Marketing</option>
            <option value="api">API</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Integration</span>
          </button>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{integration.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{integration.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(integration.status)}`}>
                      {integration.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(integration.type)}`}>
                      {integration.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getHealthColor(integration.healthStatus)}`}>
                      {integration.healthStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  <span>{integration.provider} • {integration.version}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Sync: {integration.syncFrequency}</span>
                </div>
                {integration.lastSync && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Last sync: {new Date(integration.lastSync).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Uptime: {integration.uptime.toFixed(1)}% • Avg: {integration.avgResponseTime}ms</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    {integration.totalRequests.toLocaleString()} requests
                  </span>
                  <span className="flex items-center">
                    <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {integration.errorRate.toFixed(1)}% errors
                  </span>
                  <span>{integration.environment}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {integration.status === 'Inactive' && (
                      <button
                        onClick={() => handleToggleIntegrationStatus(integration.id, 'Active')}
                        className="p-2 text-green-600 hover:text-green-700 transition-colors"
                        title="Activate"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                    {integration.status === 'Active' && (
                      <button
                        onClick={() => handleToggleIntegrationStatus(integration.id, 'Inactive')}
                        className="p-2 text-red-600 hover:text-red-700 transition-colors"
                        title="Deactivate"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 4h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17.294 15m-3.294-5a2 2 0 01-2-2v-.5A2.5 2.5 0 0114.5 5h.5" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => handleTestIntegration(integration)}
                      className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                      title="Test Connection"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => console.log('Sync integration:', integration.id)}
                      className="p-2 text-purple-600 hover:text-purple-700 transition-colors"
                      title="Sync Now"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(integration)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => openDeleteModal(integration)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No integrations found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first integration.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Integration
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderWebhooks = () => (
    <div className="space-y-6">
      {/* Webhooks Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Webhooks</p>
              <p className="text-2xl font-bold text-gray-900">{webhooks.length}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Calls</p>
              <p className="text-2xl font-bold text-gray-900">
                {webhooks.reduce((sum, wh) => sum + wh.totalCalls, 0).toLocaleString()}
              </p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {webhooks.length > 0 ? (webhooks.reduce((sum, wh) => sum + wh.successRate, 0) / webhooks.length).toFixed(1) : 0}%
              </p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Webhooks Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Webhook Endpoints</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Webhook</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Integration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {webhooks.map((webhook) => {
                const integration = integrations.find(i => i.id === webhook.integrationId);
                return (
                  <tr key={webhook.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{webhook.name}</div>
                        <div className="text-sm text-gray-500 break-all">{webhook.url}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{integration?.name}</div>
                      <div className="text-sm text-gray-500">{integration?.provider}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {webhook.events.slice(0, 2).map((event, index) => (
                          <div key={index} className="mb-1">
                            <span className="px-2 py-1 text-xs bg-gray-100 rounded">{event}</span>
                          </div>
                        ))}
                        {webhook.events.length > 2 && (
                          <span className="text-xs text-gray-500">+{webhook.events.length - 2} more</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{webhook.totalCalls.toLocaleString()} calls</div>
                      <div className="text-sm text-gray-500">
                        {webhook.successRate.toFixed(1)}% success • {webhook.avgResponseTime}ms avg
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(webhook.status)}`}>
                        {webhook.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Integration Management</h1>
        <p className="text-gray-600 mt-1">Manage third-party integrations, APIs, and webhooks</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10' },
            { id: 'integrations', name: 'Integrations', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
            { id: 'webhooks', name: 'Webhooks', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'integrations' && renderIntegrations()}
      {activeTab === 'webhooks' && renderWebhooks()}

      {/* Create Integration Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Integration</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateIntegration} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Integration Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={integrationForm.name}
                      onChange={(e) => setIntegrationForm({ ...integrationForm, name: e.target.value })}
                      placeholder="Stripe Payment Gateway"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Integration Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={integrationForm.type}
                      onChange={(e) => setIntegrationForm({ ...integrationForm, type: e.target.value })}
                    >
                      <option value="API">API</option>
                      <option value="Payment">Payment</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Communication">Communication</option>
                      <option value="Accounting">Accounting</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={integrationForm.description}
                    onChange={(e) => setIntegrationForm({ ...integrationForm, description: e.target.value })}
                    placeholder="Describe the integration..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={integrationForm.provider}
                      onChange={(e) => setIntegrationForm({ ...integrationForm, provider: e.target.value })}
                      placeholder="Stripe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={integrationForm.version}
                      onChange={(e) => setIntegrationForm({ ...integrationForm, version: e.target.value })}
                      placeholder="v2023-10-16"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={integrationForm.environment}
                      onChange={(e) => setIntegrationForm({ ...integrationForm, environment: e.target.value })}
                    >
                      <option value="Staging">Staging</option>
                      <option value="Production">Production</option>
                      <option value="Development">Development</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Endpoint</label>
                  <input
                    type="url"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={integrationForm.endpoint}
                    onChange={(e) => setIntegrationForm({ ...integrationForm, endpoint: e.target.value })}
                    placeholder="https://api.stripe.com/v1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Authentication</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={integrationForm.authentication}
                      onChange={(e) => setIntegrationForm({ ...integrationForm, authentication: e.target.value })}
                    >
                      <option value="API Key">API Key</option>
                      <option value="OAuth 2.0">OAuth 2.0</option>
                      <option value="Bearer Token">Bearer Token</option>
                      <option value="Basic Auth">Basic Auth</option>
                      <option value="API Key + User Key">API Key + User Key</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sync Frequency</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={integrationForm.syncFrequency}
                      onChange={(e) => setIntegrationForm({ ...integrationForm, syncFrequency: e.target.value })}
                    >
                      <option value="Real-time">Real-time</option>
                      <option value="Every 5 minutes">Every 5 minutes</option>
                      <option value="Every 15 minutes">Every 15 minutes</option>
                      <option value="Hourly">Hourly</option>
                      <option value="Daily">Daily</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Flow</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={integrationForm.dataFlow}
                      onChange={(e) => setIntegrationForm({ ...integrationForm, dataFlow: e.target.value })}
                    >
                      <option value="Bidirectional">Bidirectional</option>
                      <option value="Inbound">Inbound</option>
                      <option value="Outbound">Outbound</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Integration'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Integration Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Edit Integration</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditIntegration} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Integration Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={integrationForm.name}
                    onChange={(e) => setIntegrationForm({ ...integrationForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={integrationForm.description}
                    onChange={(e) => setIntegrationForm({ ...integrationForm, description: e.target.value })}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Integration'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Integration Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Delete Integration</h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">
                  Are you sure you want to delete <strong>{selectedIntegration?.name}</strong>? This action cannot be undone and will remove all integration data and webhooks.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteIntegration}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete Integration'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Integration Modal */}
      {showTestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Test Integration</h2>
                <button
                  onClick={() => setShowTestModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">{selectedIntegration?.name}</div>
                  <div className="text-sm text-gray-500">{selectedIntegration?.endpoint}</div>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Testing connection...</span>
                </div>
              ) : testResults ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    testResults.status === 'Success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center">
                      <svg className={`h-5 w-5 mr-2 ${
                        testResults.status === 'Success' ? 'text-green-600' : 'text-red-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                          testResults.status === 'Success' 
                            ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        } />
                      </svg>
                      <span className={`font-medium ${
                        testResults.status === 'Success' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {testResults.status}
                      </span>
                    </div>
                    <p className={`mt-1 text-sm ${
                      testResults.status === 'Success' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {testResults.message}
                    </p>
                  </div>

                  {testResults.details && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Test Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Response Time:</span>
                          <span className="font-medium">{testResults.responseTime}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status Code:</span>
                          <span className="font-medium">{testResults.statusCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timestamp:</span>
                          <span className="font-medium">{new Date(testResults.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowTestModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                {!loading && (
                  <button
                    onClick={() => handleTestIntegration(selectedIntegration)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Test Again
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedIntegrationModule;

