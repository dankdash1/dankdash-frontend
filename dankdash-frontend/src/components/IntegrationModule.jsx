import React, { useState, useEffect } from 'react';

const IntegrationModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');

  // Mock integration data
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
      }
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
        dataRetention: 2555 // 7 years
      }
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
      lastSync: '2024-08-14T10:25:00Z',
      syncFrequency: 'Real-time',
      dataFlow: 'Outbound',
      healthStatus: 'Healthy',
      uptime: 99.95,
      avgResponseTime: 234,
      totalRequests: 8920,
      errorRate: 0.05,
      configuration: {
        phoneNumber: '+1-555-DANK-420',
        messagingService: 'MG1234567890abcdef',
        features: ['sms', 'mms', 'delivery_receipts'],
        rateLimits: '100 messages/second'
      },
      monitoring: {
        alertsEnabled: true,
        thresholds: {
          responseTime: 500,
          errorRate: 2,
          uptime: 99.5
        }
      },
      compliance: {
        tcpaCompliant: true,
        optInRequired: true,
        messageRetention: 30
      }
    },
    {
      id: 'INT-004',
      name: 'SendGrid Email Service',
      description: 'Transactional and marketing email delivery platform',
      type: 'Communication',
      status: 'Active',
      environment: 'Production',
      provider: 'SendGrid',
      version: 'v3',
      endpoint: 'https://api.sendgrid.com/v3',
      authentication: 'API Key',
      lastSync: '2024-08-14T10:20:00Z',
      syncFrequency: 'Real-time',
      dataFlow: 'Outbound',
      healthStatus: 'Healthy',
      uptime: 99.8,
      avgResponseTime: 156,
      totalRequests: 23450,
      errorRate: 0.3,
      configuration: {
        senderEmail: 'noreply@dankdash.com',
        domainAuthentication: 'dankdash.com',
        features: ['templates', 'analytics', 'suppressions'],
        dailyLimit: 100000
      },
      monitoring: {
        alertsEnabled: true,
        thresholds: {
          responseTime: 1000,
          errorRate: 3,
          uptime: 99
        }
      },
      compliance: {
        canSpamCompliant: true,
        gdprCompliant: true,
        unsubscribeTracking: true
      }
    },
    {
      id: 'INT-005',
      name: 'Google Analytics 4',
      description: 'Web analytics and user behavior tracking platform',
      type: 'Analytics',
      status: 'Active',
      environment: 'Production',
      provider: 'Google',
      version: 'GA4',
      endpoint: 'https://www.google-analytics.com/mp/collect',
      authentication: 'Measurement ID',
      lastSync: '2024-08-14T10:35:00Z',
      syncFrequency: 'Real-time',
      dataFlow: 'Outbound',
      healthStatus: 'Healthy',
      uptime: 99.99,
      avgResponseTime: 45,
      totalRequests: 156780,
      errorRate: 0.01,
      configuration: {
        measurementId: 'G-XXXXXXXXXX',
        trackingEvents: ['page_view', 'purchase', 'add_to_cart', 'login'],
        customDimensions: 5,
        conversionGoals: 3
      },
      monitoring: {
        alertsEnabled: false,
        thresholds: {
          responseTime: 200,
          errorRate: 1,
          uptime: 99.9
        }
      },
      compliance: {
        gdprCompliant: true,
        cookieConsent: true,
        dataRetention: 26
      }
    },
    {
      id: 'INT-006',
      name: 'QuickBooks Online',
      description: 'Accounting and financial management system integration',
      type: 'Accounting',
      status: 'Warning',
      environment: 'Production',
      provider: 'Intuit',
      version: 'v3',
      endpoint: 'https://sandbox-quickbooks.api.intuit.com/v3',
      authentication: 'OAuth 2.0',
      lastSync: '2024-08-14T08:00:00Z',
      syncFrequency: 'Daily',
      dataFlow: 'Bidirectional',
      healthStatus: 'Degraded',
      uptime: 97.2,
      avgResponseTime: 1234,
      totalRequests: 5670,
      errorRate: 2.8,
      configuration: {
        companyId: 'QB123456789',
        syncEntities: ['customers', 'items', 'invoices', 'payments'],
        taxMapping: 'Automatic',
        chartOfAccounts: 'Cannabis Specific'
      },
      monitoring: {
        alertsEnabled: true,
        thresholds: {
          responseTime: 2000,
          errorRate: 5,
          uptime: 98
        }
      },
      compliance: {
        financialReporting: true,
        auditTrail: true,
        dataBackup: 'Daily'
      }
    },
    {
      id: 'INT-007',
      name: 'Shopify E-commerce',
      description: 'E-commerce platform integration for online cannabis sales',
      type: 'E-commerce',
      status: 'Development',
      environment: 'Staging',
      provider: 'Shopify',
      version: '2023-07',
      endpoint: 'https://dankdash-dev.myshopify.com/admin/api/2023-07',
      authentication: 'Private App Token',
      lastSync: '2024-08-14T09:00:00Z',
      syncFrequency: 'Every 5 minutes',
      dataFlow: 'Bidirectional',
      healthStatus: 'Testing',
      uptime: 95.0,
      avgResponseTime: 345,
      totalRequests: 2340,
      errorRate: 5.0,
      configuration: {
        storeName: 'dankdash-dev',
        syncEntities: ['products', 'orders', 'customers', 'inventory'],
        ageVerification: 'Required',
        complianceChecks: 'Enabled'
      },
      monitoring: {
        alertsEnabled: false,
        thresholds: {
          responseTime: 1000,
          errorRate: 10,
          uptime: 90
        }
      },
      compliance: {
        ageVerification: true,
        stateRestrictions: true,
        taxCalculation: 'Automated'
      }
    }
  ]);

  const [testSuites, setTestSuites] = useState([
    {
      id: 'TEST-001',
      name: 'API Integration Tests',
      description: 'Comprehensive testing of all API integrations and endpoints',
      type: 'Integration',
      status: 'Passed',
      environment: 'Staging',
      lastRun: '2024-08-14T09:00:00Z',
      duration: 1245,
      totalTests: 156,
      passedTests: 154,
      failedTests: 2,
      skippedTests: 0,
      coverage: 94.2,
      automationLevel: 'Fully Automated',
      schedule: 'Every commit',
      testCategories: [
        {
          name: 'Authentication Tests',
          tests: 25,
          passed: 25,
          failed: 0
        },
        {
          name: 'Payment Processing',
          tests: 35,
          passed: 34,
          failed: 1
        },
        {
          name: 'Compliance Reporting',
          tests: 28,
          passed: 27,
          failed: 1
        },
        {
          name: 'Data Synchronization',
          tests: 42,
          passed: 42,
          failed: 0
        },
        {
          name: 'Error Handling',
          tests: 26,
          passed: 26,
          failed: 0
        }
      ],
      failedTestDetails: [
        {
          name: 'Payment Gateway Timeout Test',
          category: 'Payment Processing',
          error: 'Request timeout after 30 seconds',
          severity: 'Medium'
        },
        {
          name: 'Metrc Batch Upload Test',
          category: 'Compliance Reporting',
          error: 'Invalid batch format response',
          severity: 'Low'
        }
      ]
    },
    {
      id: 'TEST-002',
      name: 'End-to-End User Flows',
      description: 'Complete user journey testing from registration to order completion',
      type: 'E2E',
      status: 'Passed',
      environment: 'Staging',
      lastRun: '2024-08-14T08:30:00Z',
      duration: 2340,
      totalTests: 45,
      passedTests: 45,
      failedTests: 0,
      skippedTests: 0,
      coverage: 100,
      automationLevel: 'Fully Automated',
      schedule: 'Daily',
      testCategories: [
        {
          name: 'User Registration',
          tests: 8,
          passed: 8,
          failed: 0
        },
        {
          name: 'Product Browsing',
          tests: 12,
          passed: 12,
          failed: 0
        },
        {
          name: 'Shopping Cart',
          tests: 10,
          passed: 10,
          failed: 0
        },
        {
          name: 'Checkout Process',
          tests: 15,
          passed: 15,
          failed: 0
        }
      ],
      failedTestDetails: []
    },
    {
      id: 'TEST-003',
      name: 'Performance Load Tests',
      description: 'System performance testing under various load conditions',
      type: 'Performance',
      status: 'Warning',
      environment: 'Staging',
      lastRun: '2024-08-14T07:00:00Z',
      duration: 3600,
      totalTests: 12,
      passedTests: 10,
      failedTests: 2,
      skippedTests: 0,
      coverage: 83.3,
      automationLevel: 'Fully Automated',
      schedule: 'Weekly',
      testCategories: [
        {
          name: 'API Load Tests',
          tests: 6,
          passed: 5,
          failed: 1
        },
        {
          name: 'Database Performance',
          tests: 3,
          passed: 3,
          failed: 0
        },
        {
          name: 'Frontend Performance',
          tests: 3,
          passed: 2,
          failed: 1
        }
      ],
      failedTestDetails: [
        {
          name: 'High Concurrency API Test',
          category: 'API Load Tests',
          error: 'Response time exceeded 2s threshold at 500 concurrent users',
          severity: 'High'
        },
        {
          name: 'Page Load Performance',
          category: 'Frontend Performance',
          error: 'First Contentful Paint exceeded 3s on mobile',
          severity: 'Medium'
        }
      ]
    },
    {
      id: 'TEST-004',
      name: 'Security Penetration Tests',
      description: 'Security vulnerability assessment and penetration testing',
      type: 'Security',
      status: 'Failed',
      environment: 'Staging',
      lastRun: '2024-08-14T06:00:00Z',
      duration: 7200,
      totalTests: 89,
      passedTests: 85,
      failedTests: 4,
      skippedTests: 0,
      coverage: 95.5,
      automationLevel: 'Semi-Automated',
      schedule: 'Monthly',
      testCategories: [
        {
          name: 'Authentication Security',
          tests: 25,
          passed: 24,
          failed: 1
        },
        {
          name: 'Input Validation',
          tests: 30,
          passed: 28,
          failed: 2
        },
        {
          name: 'Access Control',
          tests: 20,
          passed: 19,
          failed: 1
        },
        {
          name: 'Data Protection',
          tests: 14,
          passed: 14,
          failed: 0
        }
      ],
      failedTestDetails: [
        {
          name: 'SQL Injection Test',
          category: 'Input Validation',
          error: 'Potential SQL injection vulnerability in search function',
          severity: 'Critical'
        },
        {
          name: 'XSS Prevention Test',
          category: 'Input Validation',
          error: 'Cross-site scripting vulnerability in comment field',
          severity: 'High'
        },
        {
          name: 'Session Management Test',
          category: 'Authentication Security',
          error: 'Session timeout not properly enforced',
          severity: 'Medium'
        },
        {
          name: 'Privilege Escalation Test',
          category: 'Access Control',
          error: 'User can access admin functions with modified requests',
          severity: 'High'
        }
      ]
    }
  ]);

  const [deployments, setDeployments] = useState([
    {
      id: 'DEP-001',
      version: 'v2.4.1',
      environment: 'Production',
      status: 'Success',
      deployedAt: '2024-08-14T02:00:00Z',
      deployedBy: 'CI/CD Pipeline',
      duration: 890,
      rollbackAvailable: true,
      features: [
        'Enhanced payment processing',
        'Improved mobile responsiveness',
        'New compliance reporting features',
        'Performance optimizations'
      ],
      changes: {
        added: 15,
        modified: 23,
        removed: 3,
        migrations: 2
      },
      healthChecks: {
        api: 'Healthy',
        database: 'Healthy',
        cache: 'Healthy',
        integrations: 'Healthy'
      },
      metrics: {
        responseTime: 145,
        errorRate: 0.2,
        throughput: 450,
        uptime: 100
      }
    },
    {
      id: 'DEP-002',
      version: 'v2.4.0',
      environment: 'Staging',
      status: 'Success',
      deployedAt: '2024-08-13T16:00:00Z',
      deployedBy: 'sarah.johnson@dankdash.com',
      duration: 1245,
      rollbackAvailable: true,
      features: [
        'New admin dashboard modules',
        'Enhanced security features',
        'Updated API documentation',
        'Bug fixes and improvements'
      ],
      changes: {
        added: 45,
        modified: 67,
        removed: 8,
        migrations: 5
      },
      healthChecks: {
        api: 'Healthy',
        database: 'Healthy',
        cache: 'Warning',
        integrations: 'Healthy'
      },
      metrics: {
        responseTime: 234,
        errorRate: 0.8,
        throughput: 320,
        uptime: 99.5
      }
    },
    {
      id: 'DEP-003',
      version: 'v2.3.9',
      environment: 'Development',
      status: 'Failed',
      deployedAt: '2024-08-13T14:30:00Z',
      deployedBy: 'mike.chen@dankdash.com',
      duration: 456,
      rollbackAvailable: false,
      features: [
        'Experimental AI features',
        'New chatbot improvements',
        'Database schema updates'
      ],
      changes: {
        added: 12,
        modified: 18,
        removed: 2,
        migrations: 3
      },
      healthChecks: {
        api: 'Failed',
        database: 'Warning',
        cache: 'Healthy',
        integrations: 'Failed'
      },
      metrics: {
        responseTime: 0,
        errorRate: 100,
        throughput: 0,
        uptime: 0
      },
      failureReason: 'Database migration failed due to constraint violation'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalIntegrations: 25,
    activeIntegrations: 22,
    healthyIntegrations: 20,
    warningIntegrations: 2,
    failedIntegrations: 0,
    avgResponseTime: 345,
    totalRequests: 256780,
    errorRate: 1.2,
    uptime: 99.1,
    testSuites: 15,
    passedTests: 89.5,
    automationCoverage: 92.3,
    deploymentSuccess: 94.7,
    lastDeployment: '2024-08-14T02:00:00Z',
    deploymentsThisMonth: 12
  });

  // Filter functions
  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || integration.status.toLowerCase() === selectedStatus;
    const matchesType = selectedType === 'all' || integration.type.toLowerCase() === selectedType;
    const matchesEnvironment = selectedEnvironment === 'all' || integration.environment.toLowerCase() === selectedEnvironment;
    return matchesSearch && matchesStatus && matchesType && matchesEnvironment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Development': return 'bg-blue-100 text-blue-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Passed': return 'bg-green-100 text-green-800';
      case 'Success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'Healthy': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Degraded': return 'bg-orange-100 text-orange-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Testing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Payment': return 'bg-green-100 text-green-800';
      case 'Compliance': return 'bg-orange-100 text-orange-800';
      case 'Communication': return 'bg-blue-100 text-blue-800';
      case 'Analytics': return 'bg-purple-100 text-purple-800';
      case 'Accounting': return 'bg-yellow-100 text-yellow-800';
      case 'E-commerce': return 'bg-pink-100 text-pink-800';
      case 'Integration': return 'bg-blue-100 text-blue-800';
      case 'E2E': return 'bg-green-100 text-green-800';
      case 'Performance': return 'bg-yellow-100 text-yellow-800';
      case 'Security': return 'bg-red-100 text-red-800';
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

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${seconds % 60}s`;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Integrations</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeIntegrations}</p>
              <p className="text-sm text-blue-600">{analytics.healthyIntegrations} healthy</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Test Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.passedTests}%</p>
              <p className="text-sm text-green-600">{analytics.automationCoverage}% automated</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Deployment Success</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.deploymentSuccess}%</p>
              <p className="text-sm text-purple-600">{analytics.deploymentsThisMonth} this month</p>
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

      {/* Integration Health Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Integration Health Overview</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {integrations.slice(0, 5).map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🔗</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{integration.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(integration.status)}`}>
                        {integration.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getHealthColor(integration.healthStatus)}`}>
                        {integration.healthStatus}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(integration.type)}`}>
                        {integration.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{integration.uptime}%</p>
                      <p className="text-xs text-gray-500">Uptime</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{integration.avgResponseTime}ms</p>
                      <p className="text-xs text-gray-500">Response</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-red-600">{integration.errorRate}%</p>
                      <p className="text-xs text-gray-500">Error Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{(integration.totalRequests / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-gray-500">Requests</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Test Results */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Test Results</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {testSuites.slice(0, 4).map((suite) => (
              <div key={suite.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🧪</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{suite.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(suite.status)}`}>
                        {suite.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(suite.type)}`}>
                        {suite.type}
                      </span>
                      <span className="text-xs text-gray-500">{suite.environment}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{suite.passedTests}</p>
                      <p className="text-xs text-gray-500">Passed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-red-600">{suite.failedTests}</p>
                      <p className="text-xs text-gray-500">Failed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{suite.coverage}%</p>
                      <p className="text-xs text-gray-500">Coverage</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{formatDuration(suite.duration)}</p>
                      <p className="text-xs text-gray-500">Duration</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Deployments */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Deployments</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {deployments.slice(0, 3).map((deployment) => (
              <div key={deployment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{deployment.version}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deployment.status)}`}>
                        {deployment.status}
                      </span>
                      <span className="text-xs text-gray-500">{deployment.environment}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{formatDateTime(deployment.deployedAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{deployment.changes.added + deployment.changes.modified}</p>
                      <p className="text-xs text-gray-500">Changes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{formatDuration(deployment.duration)}</p>
                      <p className="text-xs text-gray-500">Duration</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{deployment.deployedBy.split('@')[0]}</p>
                      <p className="text-xs text-gray-500">Deployed By</p>
                    </div>
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
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search integrations..."
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
              <option value="warning">Warning</option>
              <option value="failed">Failed</option>
              <option value="development">Development</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="payment">Payment</option>
              <option value="compliance">Compliance</option>
              <option value="communication">Communication</option>
              <option value="analytics">Analytics</option>
              <option value="accounting">Accounting</option>
              <option value="e-commerce">E-commerce</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedEnvironment}
              onChange={(e) => setSelectedEnvironment(e.target.value)}
            >
              <option value="all">All Environments</option>
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Integration
            </button>
          </div>
        </div>
      </div>

      {/* Integrations List */}
      <div className="space-y-4">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🔗</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(integration.status)}`}>
                      {integration.status}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getHealthColor(integration.healthStatus)}`}>
                      {integration.healthStatus}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(integration.type)}`}>
                      {integration.type}
                    </span>
                    <span className="text-xs text-gray-500">{integration.environment}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Configure
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Test
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{integration.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Provider:</p>
                <p className="text-sm text-gray-600">{integration.provider}</p>
                <p className="text-sm text-gray-600">{integration.version}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Authentication:</p>
                <p className="text-sm text-gray-600">{integration.authentication}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Data Flow:</p>
                <p className="text-sm text-gray-600">{integration.dataFlow}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Sync Frequency:</p>
                <p className="text-sm text-gray-600">{integration.syncFrequency}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{integration.uptime}%</p>
                <p className="text-xs text-gray-500">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{integration.avgResponseTime}ms</p>
                <p className="text-xs text-gray-500">Avg Response</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{(integration.totalRequests / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500">Total Requests</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-red-600">{integration.errorRate}%</p>
                <p className="text-xs text-gray-500">Error Rate</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Configuration:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {Object.entries(integration.configuration).slice(0, 4).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                    <span className="ml-2 text-gray-600">
                      {Array.isArray(value) ? value.length + ' items' : 
                       typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') :
                       value.toString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Monitoring:</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className={`${integration.monitoring.alertsEnabled ? 'text-green-600' : 'text-red-600'}`}>
                  {integration.monitoring.alertsEnabled ? '✅ Alerts Enabled' : '❌ Alerts Disabled'}
                </span>
                <span>Response Time Threshold: {integration.monitoring.thresholds.responseTime}ms</span>
                <span>Error Rate Threshold: {integration.monitoring.thresholds.errorRate}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Last Sync: {formatDateTime(integration.lastSync)}</span>
              <span>Endpoint: {integration.endpoint.split('/').slice(0, 3).join('/')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTesting = () => (
    <div className="space-y-6">
      {/* Test Suites */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Test Suites</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Run All Tests
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {testSuites.map((suite) => (
              <div key={suite.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🧪</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{suite.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(suite.status)}`}>
                          {suite.status}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(suite.type)}`}>
                          {suite.type}
                        </span>
                        <span className="text-xs text-gray-500">{suite.environment}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{suite.automationLevel}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                      Run Tests
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                      View Report
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{suite.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Last Run:</p>
                    <p className="text-sm text-gray-600">{formatDateTime(suite.lastRun)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Duration:</p>
                    <p className="text-sm text-gray-600">{formatDuration(suite.duration)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Schedule:</p>
                    <p className="text-sm text-gray-600">{suite.schedule}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Coverage:</p>
                    <p className="text-sm text-gray-600">{suite.coverage}%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{suite.totalTests}</p>
                    <p className="text-xs text-gray-500">Total Tests</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{suite.passedTests}</p>
                    <p className="text-xs text-gray-500">Passed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-red-600">{suite.failedTests}</p>
                    <p className="text-xs text-gray-500">Failed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-yellow-600">{suite.skippedTests}</p>
                    <p className="text-xs text-gray-500">Skipped</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Test Categories:</p>
                  <div className="space-y-2">
                    {suite.testCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-900">{category.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-green-600">{category.passed} passed</span>
                          {category.failed > 0 && (
                            <span className="text-sm text-red-600">{category.failed} failed</span>
                          )}
                          <span className="text-sm text-gray-600">({category.tests} total)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {suite.failedTestDetails.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Failed Tests:</p>
                    <div className="space-y-2">
                      {suite.failedTestDetails.map((test, index) => (
                        <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <h6 className="font-medium text-red-900">{test.name}</h6>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              test.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                              test.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                              test.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {test.severity}
                            </span>
                          </div>
                          <p className="text-sm text-red-700">{test.category}: {test.error}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Success Rate: {((suite.passedTests / suite.totalTests) * 100).toFixed(1)}%</span>
                  <span>Environment: {suite.environment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeployments = () => (
    <div className="space-y-6">
      {/* Deployments List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Deployments</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            New Deployment
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {deployments.map((deployment) => (
              <div key={deployment.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{deployment.version}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deployment.status)}`}>
                          {deployment.status}
                        </span>
                        <span className="text-xs text-gray-500">{deployment.environment}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{formatDateTime(deployment.deployedAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {deployment.rollbackAvailable && (
                      <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                        Rollback
                      </button>
                    )}
                    <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                      View Logs
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Deployed By:</p>
                    <p className="text-sm text-gray-600">{deployment.deployedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Duration:</p>
                    <p className="text-sm text-gray-600">{formatDuration(deployment.duration)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Changes:</p>
                    <p className="text-sm text-gray-600">
                      +{deployment.changes.added} -{deployment.changes.removed} ~{deployment.changes.modified}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Migrations:</p>
                    <p className="text-sm text-gray-600">{deployment.changes.migrations} database</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {deployment.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Health Checks:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(deployment.healthChecks).map(([service, status]) => (
                      <div key={service} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize">{service}:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getHealthColor(status)}`}>
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{deployment.metrics.responseTime}ms</p>
                    <p className="text-xs text-gray-500">Response Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-red-600">{deployment.metrics.errorRate}%</p>
                    <p className="text-xs text-gray-500">Error Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{deployment.metrics.throughput}</p>
                    <p className="text-xs text-gray-500">Throughput (RPS)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{deployment.metrics.uptime}%</p>
                    <p className="text-xs text-gray-500">Uptime</p>
                  </div>
                </div>
                
                {deployment.failureReason && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <span className="font-medium">Failure Reason:</span> {deployment.failureReason}
                    </p>
                  </div>
                )}
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
          <h1 className="text-3xl font-bold text-gray-900">Integration & Testing</h1>
          <p className="mt-2 text-gray-600">Manage system integrations, automated testing, and deployment pipelines</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'integrations', name: 'Integrations', icon: '🔗' },
              { id: 'testing', name: 'Testing', icon: '🧪' },
              { id: 'deployments', name: 'Deployments', icon: '🚀' }
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
        {activeTab === 'integrations' && renderIntegrations()}
        {activeTab === 'testing' && renderTesting()}
        {activeTab === 'deployments' && renderDeployments()}
      </div>
    </div>
  );
};

export default IntegrationModule;

